import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-content">
        <h1>
          See Through<br />
          The Lies.
        </h1>
        <p className="hero-description">
          Verify text, images, videos, and audio with one unified content verification system. Understand the signals behind every result.
        </p>
        
        <div className="hero-actions">
          <Link to="/verify/image" className="button primary hero-cta">
            Start Verification <ArrowRight size={16} />
          </Link>
          <div className="hero-proof">
            <div className="proof-avatars">
              <div className="proof-avatar" style={{backgroundColor: '#1769e0'}}></div>
              <div className="proof-avatar" style={{backgroundColor: '#e36d89'}}></div>
              <div className="proof-avatar" style={{backgroundColor: '#16845b'}}></div>
            </div>
            <div className="proof-text">
              <div className="stars">★★★★★</div>
              <small>Multimodal verification</small>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-visual-panel">
        <div className="visual-split">
          <div className="visual-half suspicious">
            <span className="visual-label">Suspicious</span>
            <img src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="%230f172a"/><circle cx="400" cy="400" r="250" fill="%231e293b"/><path d="M200,600 Q400,200 600,600" fill="none" stroke="%233b82f6" stroke-width="20"/></svg>' alt="Suspicious Example" />
            <div className="focus-indicator">
              <div className="focus-ring"></div>
              <div className="focus-dot"></div>
            </div>
          </div>
          <div className="visual-half authentic">
            <span className="visual-label authentic-label">Authentic</span>
            <img src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="%23f8fafc"/><circle cx="400" cy="400" r="250" fill="%23f1f5f9"/><path d="M200,600 Q400,200 600,600" fill="none" stroke="%2394a3b8" stroke-width="20"/></svg>' alt="Authentic Example" />
          </div>
        </div>
      </div>
    </section>
  );
}
