import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
from torchvision import transforms, models
from PIL import Image
from tqdm import tqdm

"""
TRUTHLENS AI - DEEPFAKE TRAINING PIPELINE

This script is a complete deep learning training pipeline designed to be run
on a cloud GPU cluster (e.g., AWS EC2 P4d, GCP A100, or vast.ai).

It is designed to train on massive datasets from the internet, such as:
- FaceForensics++
- Celeb-DF
- DeepfakeTIMIT

Usage:
    python train_deepfake_model.py --data_dir /path/to/dataset --epochs 50 --batch_size 64
"""

class DeepfakeDataset(Dataset):
    def __init__(self, data_dir, transform=None):
        self.data_dir = data_dir
        self.transform = transform
        self.image_paths = []
        self.labels = []
        
        # Expecting directory structure:
        # data_dir/
        #   real/
        #   fake/
        real_dir = os.path.join(data_dir, 'real')
        fake_dir = os.path.join(data_dir, 'fake')
        
        if os.path.exists(real_dir):
            for img_name in os.listdir(real_dir):
                self.image_paths.append(os.path.join(real_dir, img_name))
                self.labels.append(0) # 0 for real
                
        if os.path.exists(fake_dir):
            for img_name in os.listdir(fake_dir):
                self.image_paths.append(os.path.join(fake_dir, img_name))
                self.labels.append(1) # 1 for fake
                
    def __len__(self):
        return len(self.image_paths)
        
    def __getitem__(self, idx):
        img_path = self.image_paths[idx]
        label = self.labels[idx]
        
        try:
            image = Image.open(img_path).convert('RGB')
        except Exception:
            # Fallback for corrupt images in massive datasets
            image = Image.new('RGB', (224, 224))
            
        if self.transform:
            image = self.transform(image)
            
        return image, torch.tensor(label, dtype=torch.float32)

def build_model():
    # Use EfficientNet as the backbone for Deepfake Detection
    model = models.efficientnet_b4(weights=models.EfficientNet_B4_Weights.DEFAULT)
    
    # Freeze early layers
    for param in list(model.parameters())[:-20]:
        param.requires_grad = False
        
    # Replace classifier head for binary classification
    in_features = model.classifier[1].in_features
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.4, inplace=True),
        nn.Linear(in_features, 512),
        nn.ReLU(),
        nn.Dropout(p=0.2),
        nn.Linear(512, 1),
        nn.Sigmoid()
    )
    return model

def train(data_dir, epochs=50, batch_size=32, lr=1e-4):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Training on device: {device}")
    
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.ColorJitter(brightness=0.1, contrast=0.1, saturation=0.1),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    dataset = DeepfakeDataset(data_dir, transform=transform)
    if len(dataset) == 0:
        print(f"Warning: No data found in {data_dir}. Provide a valid dataset to begin training.")
        print("Expected structure: data_dir/real/ and data_dir/fake/")
        return
        
    # Split dataset
    train_size = int(0.8 * len(dataset))
    val_size = len(dataset) - train_size
    train_dataset, val_dataset = torch.utils.data.random_split(dataset, [train_size, val_size])
    
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=4)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, num_workers=4)
    
    model = build_model().to(device)
    criterion = nn.BCELoss()
    optimizer = optim.AdamW(model.classifier.parameters(), lr=lr)
    
    best_val_loss = float('inf')
    
    print(f"Starting training for {epochs} epochs on {len(train_dataset)} images...")
    
    for epoch in range(epochs):
        model.train()
        train_loss = 0.0
        train_correct = 0
        
        for images, labels in tqdm(train_loader, desc=f"Epoch {epoch+1}/{epochs} [Train]"):
            images, labels = images.to(device), labels.to(device).unsqueeze(1)
            
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item() * images.size(0)
            preds = (outputs > 0.5).float()
            train_correct += (preds == labels).sum().item()
            
        train_loss /= len(train_dataset)
        train_acc = train_correct / len(train_dataset)
        
        # Validation
        model.eval()
        val_loss = 0.0
        val_correct = 0
        
        with torch.no_grad():
            for images, labels in tqdm(val_loader, desc=f"Epoch {epoch+1}/{epochs} [Val]"):
                images, labels = images.to(device), labels.to(device).unsqueeze(1)
                outputs = model(images)
                loss = criterion(outputs, labels)
                
                val_loss += loss.item() * images.size(0)
                preds = (outputs > 0.5).float()
                val_correct += (preds == labels).sum().item()
                
        val_loss /= len(val_dataset)
        val_acc = val_correct / len(val_dataset)
        
        print(f"Epoch {epoch+1}: Train Loss: {train_loss:.4f} Acc: {train_acc:.4f} | Val Loss: {val_loss:.4f} Acc: {val_acc:.4f}")
        
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save(model.state_dict(), 'best_deepfake_model.pth')
            print("Saved new best model.")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Train Deepfake Model")
    parser.add_argument('--data_dir', type=str, default='./dataset', help='Path to dataset directory')
    parser.add_argument('--epochs', type=int, default=50, help='Number of epochs')
    parser.add_argument('--batch_size', type=int, default=32, help='Batch size')
    
    args = parser.parse_args()
    train(args.data_dir, epochs=args.epochs, batch_size=args.batch_size)
