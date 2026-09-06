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
            <img src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=800" alt="Suspicious Example" />
            <div className="focus-indicator">
              <div className="focus-ring"></div>
              <div className="focus-dot"></div>
            </div>
          </div>
          <div className="visual-half authentic">
            <span className="visual-label authentic-label">Authentic</span>
            <img src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=800&grayscale" alt="Authentic Example" />
          </div>
        </div>
      </div>
    </section>
  );
}
