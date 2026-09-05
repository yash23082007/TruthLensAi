import React from 'react';
import './Hero.css';

const Hero = ({ onNavigate }) => {
  return (
    <section className="hero-section container">
      <div className="hero-inner animate-fade-in">
        <h1 className="hero-heading">
          Verify any media.<br />
          Detect deepfakes instantly.
        </h1>

        <p className="hero-description">
          Upload an image, video, audio clip, or text to check for AI generation, manipulation, and misinformation.
        </p>

        <div className="hero-cta-group">
          <button 
            className="btn btn-primary btn-large"
            onClick={() => document.getElementById('upload-zone')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" x2="12" y1="3" y2="15"/>
            </svg>
            Start verification
          </button>
          {onNavigate && (
            <button 
              className="btn btn-secondary btn-large"
              onClick={() => onNavigate('forensic-lab')}
            >
              Open sandbox
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
