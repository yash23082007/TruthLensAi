import React from 'react';
import './FeatureCards.css';

const FEATURES = [
  {
    title: 'Image forensics',
    desc: 'Error level analysis, frequency spectrum inspection, and EXIF metadata verification.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
        <circle cx="9" cy="9" r="2"/>
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
      </svg>
    )
  },
  {
    title: 'Video analysis',
    desc: 'Frame-by-frame consistency checks, face boundary tracking, and temporal jitter detection.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="m22 8-6 4 6 4V8Z"/>
        <rect width="14" height="12" x="2" y="6" rx="2"/>
      </svg>
    )
  },
  {
    title: 'Voice clone detection',
    desc: 'Spectral analysis of pitch, cadence, and acoustic patterns to identify synthetic speech.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" x2="12" y1="19" y2="22"/>
      </svg>
    )
  },
  {
    title: 'Text & claim verification',
    desc: 'NLP-based analysis to flag phishing, AI-generated text, and factual inconsistencies.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    )
  },
  {
    title: 'Content provenance',
    desc: 'C2PA credential inspection and sensor fingerprint matching for origin verification.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    )
  },
  {
    title: 'API access',
    desc: 'RESTful endpoints for integrating detection capabilities into your own applications.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    )
  }
];

const FeatureCards = () => {
  return (
    <section id="features" className="container features-section">
      <div className="section-header-block centered">
        <h2 className="section-main-title">What it does</h2>
        <p className="section-main-desc">
          Multi-layered analysis across images, video, audio, and text.
        </p>
      </div>

      <div className="features-grid">
        {FEATURES.map((feat, idx) => (
          <div key={idx} className="feature-card">
            <div className="feature-icon-box">
              {feat.icon}
            </div>
            <h3 className="feature-title">{feat.title}</h3>
            <p className="feature-desc">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
