import React from 'react';
import './Hero.css';

const Hero = ({ onNavigate }) => {
  return (
    <section className="hero container">
      <div className="hero-content animate-slide-up">
        {/* Badge */}
        <div className="section-stamp">
          Multimodal Content Verification Platform
        </div>

        {/* Title */}
        <h1 className="hero-title">
          AI DEEPFAKE DETECTION ONLINE <span className="text-gradient">FREE</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Instantly verify images, videos, synthetic voice clones, and phishing text in under 5 seconds. Get granular trust scores, ELA heatmaps, and tamper-evident forensic certificates.
        </p>

        {/* Social Proof Counter & Stars */}
        <div className="hero-social-proof">
          <div className="avatar-stack">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80" alt="Auditor 1" className="user-avatar" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80" alt="Auditor 2" className="user-avatar" />
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80" alt="Auditor 3" className="user-avatar" />
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&auto=format&fit=crop&q=80" alt="Auditor 4" className="user-avatar" />
          </div>
          <div className="proof-details">
            <div className="stars-row">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="rating-num">5.0</span>
            </div>
            <span className="proof-text">50,000+ deepfakes & synthetic files detected successfully</span>
          </div>
        </div>

        {/* Hero Actions */}
        <div className="hero-actions">
          <button 
            className="btn btn-glow hero-btn" 
            onClick={() => document.getElementById('upload-zone')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ⚡ TRY FREE DETECTION NOW
          </button>

          {onNavigate && (
            <>
              <button 
                className="btn btn-secondary hero-btn"
                onClick={() => onNavigate('forensic-lab')}
              >
                🔬 OPEN FORENSIC LAB
              </button>
              <button 
                className="btn btn-secondary hero-btn"
                onClick={() => onNavigate('live-voice')}
              >
                🎙️ LIVE MIC SCREENER
              </button>
            </>
          )}
        </div>

        {/* Feature Pills */}
        <div className="hero-pills-row">
          <span className="h-pill">✓ No Sign-up Required</span>
          <span className="h-pill">✓ Sub-5s Instant Response</span>
          <span className="h-pill">✓ Zero Data Retention (Privacy First)</span>
          <span className="h-pill">✓ Multi-Signal Deep Ensemble</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
