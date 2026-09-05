import React from 'react';
import './Legal.css';

const Privacy = () => {
  return (
    <div className="legal-section container animate-fade-in">
      <div className="legal-card glass-card">
        <div className="section-tag">Governance & Privacy</div>
        <h2>Privacy Policy & Zero Data Retention</h2>
        <span className="legal-date">Last updated: August 2026</span>
        
        <h3>1. Zero Data Retention Principle</h3>
        <p>TruthLens operates under a strict privacy-first architecture. Media files uploaded for analysis (images, audio clips, videos, and text claims) are processed entirely in-memory within volatile runtime instances and are immediately destroyed upon generation of the forensic verdict. We do not store, catalog, or resell uploaded payloads.</p>

        <h3>2. Telemetry and Analytics</h3>
        <p>We collect aggregated, anonymized telemetry metrics (such as model execution latency, processing throughput, and threat category distribution) to monitor infrastructure health and active generative threat campaigns.</p>

        <h3>3. Cryptographic Proof Records</h3>
        <p>Verification certificates generate SHA-256 integrity hashes computed directly on client payloads. These cryptographic signatures prove content state at the time of verification without requiring persistent payload archiving on our servers.</p>

        <h3>4. Contact & Inquiries</h3>
        <p>For data privacy queries or enterprise security audits, contact us at <a href="mailto:ktanayash@gmail.com" style={{color: 'var(--accent-cyan)'}}>ktanayash@gmail.com</a>.</p>
      </div>
    </div>
  );
};

export default Privacy;
