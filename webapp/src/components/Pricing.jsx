import React, { useState } from 'react';
import './Pricing.css';

const CREDIT_PACKAGES = [
  { credits: 50, price: "$5", rate: "$0.10 / scan" },
  { credits: 100, price: "$9", rate: "$0.09 / scan" },
  { credits: 400, price: "$19", rate: "$0.04 / scan", popular: true },
  { credits: 800, price: "$36", rate: "$0.03 / scan" },
];

const Pricing = ({ onTryFree }) => {
  const [selectedPack, setSelectedPack] = useState(CREDIT_PACKAGES[2]);

  return (
    <div className="pricing-section container animate-fade-in">
      <div className="section-header-block centered">
        <div className="section-tag">Plans & Licensing</div>
        <h1 className="section-main-title">Transparent, Scalable Verification Pricing</h1>
        <p className="section-main-desc">
          Free to use for everyday verification. Pay-as-you-go credit packages and REST API access available for newsrooms, developers, and platforms.
        </p>
      </div>

      <div className="pricing-grid-triad">
        {/* Tier 1: Free Community */}
        <div className="glass-card plan-card">
          <div className="plan-badge-top">COMMUNITY TIER</div>
          <h3 className="plan-name">Researcher Free</h3>
          <div className="plan-price">
            <span className="price-val">$0</span>
            <span className="price-term">/ forever</span>
          </div>
          <p className="plan-summary">For casual fact-checking, students, and journalists.</p>
          <ul className="plan-perks">
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Instant online image, video, audio & text scans</span>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Unified Trust Score and anomaly breakdown</span>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Zero data retention (privacy enforced)</span>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>No credit card or registration required</span>
            </li>
          </ul>
          <button className="btn btn-secondary plan-action-btn" onClick={onTryFree}>
            Start Free Scan
          </button>
        </div>

        {/* Tier 2: Pay As You Go */}
        <div className="glass-card plan-card featured">
          <div className="plan-badge-top highlight">PAY AS YOU GO</div>
          <h3 className="plan-name">Forensic Credits</h3>
          <div className="plan-price">
            <span className="price-val">{selectedPack.price}</span>
            <span className="price-term">one-time</span>
          </div>
          <p className="plan-summary">Credits never expire. High-resolution batch processing.</p>
          
          {/* Credit Pack Selector */}
          <div className="credit-chips-selector">
            {CREDIT_PACKAGES.map((pkg, i) => (
              <button
                key={i}
                className={`credit-chip ${selectedPack.credits === pkg.credits ? 'active' : ''}`}
                onClick={() => setSelectedPack(pkg)}
              >
                <strong>{pkg.credits} Credits</strong>
                <span>{pkg.price}</span>
              </button>
            ))}
          </div>

          <ul className="plan-perks">
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>{selectedPack.credits} deep neural forensic scan credits</span>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Exportable Cryptographic PDF & JSON certificates</span>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Priority GPU inference queue processing</span>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Frame-by-frame 4K video deepfake audits</span>
            </li>
          </ul>
          <button 
            className="btn btn-primary plan-action-btn" 
            onClick={() => alert(`Selected ${selectedPack.credits} credits package for ${selectedPack.price}.`)}
          >
            Purchase {selectedPack.credits} Credits ({selectedPack.price})
          </button>
        </div>

        {/* Tier 3: Developer API */}
        <div className="glass-card plan-card">
          <div className="plan-badge-top">DEVELOPER API</div>
          <h3 className="plan-name">Enterprise API</h3>
          <div className="plan-price">
            <span className="price-val">$99</span>
            <span className="price-term">/ month</span>
          </div>
          <p className="plan-summary">High-throughput REST endpoints and automated webhooks.</p>
          <ul className="plan-perks">
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>REST API endpoints (sub-100ms response)</span>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>C2PA hardware cryptographic signature verification</span>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Webhook notifications and automated batch scanning</span>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Self-hosting Docker & on-premise support</span>
            </li>
          </ul>
          <a
            className="btn btn-secondary plan-action-btn"
            href="https://github.com/yash23082007/TruthLensAi"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
