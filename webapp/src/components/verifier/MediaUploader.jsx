import React, { useState, useRef } from 'react';
import { UploadCloud, X, Play } from 'lucide-react';
import './MediaUploader.css';

export default function MediaUploader({ modality, onFileSelected, onTextSubmit, isAnalyzing }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile) => {
    // Validate file type based on modality
    if (modality === 'image' && !selectedFile.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    if (modality === 'video' && !selectedFile.type.startsWith('video/')) {
      alert('Please upload a video file.');
      return;
    }
    if (modality === 'audio' && !selectedFile.type.startsWith('audio/')) {
      alert('Please upload an audio file.');
      return;
    }

    setFile(selectedFile);
    
    // Create preview
    if (modality === 'image' || modality === 'video' || modality === 'audio') {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleRemove = () => {
    setFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSubmit = () => {
    if (modality === 'text') {
      if (text.trim()) onTextSubmit(text);
    } else {
      if (file) onFileSelected(file);
    }
  };

  if (modality === 'text') {
    return (
      <div className="uploader-container text-uploader">
        <div className="text-input-wrapper">
          <textarea 
            placeholder="Paste text, message, article, or claim..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isAnalyzing}
          ></textarea>
          <div className="text-meta">
            <span>{text.length} characters</span>
          </div>
        </div>
        <button 
          className="button primary analyze-button" 
          disabled={!text.trim() || isAnalyzing}
          onClick={handleSubmit}
        >
          {isAnalyzing ? (
            <><span className="spinner"></span> Analyzing...</>
          ) : (
            'Analyze Text'
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="uploader-container media-uploader">
      {!file ? (
        <div 
          className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input 
            ref={inputRef}
            type="file" 
            className="file-input" 
            onChange={handleChange}
            accept={modality === 'image' ? 'image/*' : modality === 'video' ? 'video/*' : 'audio/*'}
          />
          <div className="upload-icon-wrapper">
            <UploadCloud size={32} />
          </div>
          <strong>Drag & drop a {modality} or click to browse files</strong>
          <small>Supported formats: {modality === 'image' ? 'JPEG, PNG, WEBP' : modality === 'video' ? 'MP4, MOV, WEBM' : 'WAV, MP3, M4A'}</small>
        </div>
      ) : (
        <div className="preview-zone">
          <div className="preview-content">
            {modality === 'image' && <img src={preview} alt="Preview" />}
            {modality === 'video' && <video src={preview} controls />}
            {modality === 'audio' && (
              <div className="audio-preview-visual">
                <Play size={48} className="audio-icon" />
                <audio src={preview} controls className="audio-player" />
              </div>
            )}
          </div>
          <div className="preview-meta">
            <span className="filename">{file.name}</span>
            <span className="filesize">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
            <button className="remove-btn" onClick={handleRemove} disabled={isAnalyzing}>
              <X size={14} /> Remove
            </button>
          </div>
        </div>
      )}

      {/* Review Strip */}
      <div className="review-strip">
        <div className="mini-avatars">
          <div className="mini-avatar" style={{backgroundColor: '#e2e8f0'}}></div>
          <div className="mini-avatar" style={{backgroundColor: '#cbd5e1'}}></div>
          <div className="mini-avatar" style={{backgroundColor: '#94a3b8'}}></div>
        </div>
        <span>Designed for clear, explainable verification</span>
      </div>

      <button 
        className="button primary analyze-button" 
        disabled={!file || isAnalyzing}
        onClick={handleSubmit}
      >
        {isAnalyzing ? (
          <><span className="spinner"></span> Analyzing...</>
        ) : (
          `Analyze ${modality.charAt(0).toUpperCase() + modality.slice(1)}`
        )}
      </button>
    </div>
  );
}
