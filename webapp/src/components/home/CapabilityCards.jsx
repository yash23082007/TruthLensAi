import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Image as ImageIcon, Film, Mic } from 'lucide-react';
import './CapabilityCards.css';

export default function CapabilityCards() {
  return (
    <section className="container capability-section">
      <div className="capability-grid">
        <Link to="/verify/text" className="capability-card">
          <div className="capability-icon">
            <FileText size={24} />
          </div>
          <h3>Text Verification</h3>
          <p>Analyze messages, articles, and claims for AI generation or phishing.</p>
          <div className="capability-arrow">
            Verify Text <ArrowRight size={16} />
          </div>
        </Link>
        
        <Link to="/verify/image" className="capability-card">
          <div className="capability-icon">
            <ImageIcon size={24} />
          </div>
          <h3>Image Verification</h3>
          <p>Detect AI generation, metadata anomalies, and hidden manipulations.</p>
          <div className="capability-arrow">
            Verify Image <ArrowRight size={16} />
          </div>
        </Link>
        
        <Link to="/verify/video" className="capability-card">
          <div className="capability-icon">
            <Film size={24} />
          </div>
          <h3>Video Verification</h3>
          <p>Analyze video frames for deepfakes, face swaps, and splicing.</p>
          <div className="capability-arrow">
            Verify Video <ArrowRight size={16} />
          </div>
        </Link>
        
        <Link to="/verify/audio" className="capability-card">
          <div className="capability-icon">
            <Mic size={24} />
          </div>
          <h3>Audio Verification</h3>
          <p>Detect synthetic voices, voice cloning, and audio manipulation.</p>
          <div className="capability-arrow">
            Verify Audio <ArrowRight size={16} />
          </div>
        </Link>
      </div>
    </section>
  );
}
