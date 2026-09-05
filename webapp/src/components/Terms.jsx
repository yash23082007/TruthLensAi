import React from 'react';
import './Legal.css';

const Terms = () => {
  return (
    <div className="legal-section container animate-fade-in">
      <div className="legal-card glass-card">
        <div className="section-tag">Terms of Service</div>
        <h2>Platform Terms of Use</h2>
        <span className="legal-date">Last updated: August 2026</span>
        
        <h3>1. Permitted Use</h3>
        <p>TruthLens provides automated content verification, deepfake detection, and cryptographic provenance analysis. Users may utilize the service for investigative journalism, brand protection, educational research, personal verification, and developer API integration.</p>

        <h3>2. Forensic Verdict Disclaimers</h3>
        <p>While our multi-vector ensemble combines state-of-the-art heuristic and neural analysis (achieving high benchmark precision), no digital forensic pipeline is 100% infallible against emerging synthetic zero-day generators. Forensic scores should be used as calibrated probabilistic indicators rather than definitive legal conclusions.</p>

        <h3>3. Acceptable API Usage</h3>
        <p>API users must abide by standard rate limits. Automated scraping or denial-of-service attempts against our inference clusters will result in immediate token revocation.</p>

        <h3>4. Contact & Legal Inquiries</h3>
        <p>For questions regarding terms, licensing, or commercial enterprise agreements, reach out to <a href="mailto:ktanayash@gmail.com" style={{color: 'var(--accent-cyan)'}}>ktanayash@gmail.com</a>.</p>
      </div>
    </div>
  );
};

export default Terms;
