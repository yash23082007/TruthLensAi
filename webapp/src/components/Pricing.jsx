import React, { useState } from 'react';
import './Pricing.css';

const CREDIT_PACKAGES = [
  { credits: 50, price: "$5", savings: "Standard Rate", perScan: "$0.10 / scan", popular: false },
  { credits: 100, price: "$9", savings: "Save 40%", perScan: "$0.09 / scan", popular: false },
  { credits: 400, price: "$19", savings: "Save 50% • Most Popular", perScan: "$0.04 / scan", popular: true },
  { credits: 800, price: "$36", savings: "Save 60% • Pro Best Value", perScan: "$0.03 / scan", popular: false },
];

const Pricing = ({ onTryFree }) => {
  const [selectedPack, setSelectedPack] = useState(CREDIT_PACKAGES[2]);

  return (
    <div className="pricing-section container animate-fade-in">
      <div className="pricing-header">
        <div className="section-stamp">Transparent Verification Plans</div>
        <h1 className="pricing-main-title">SIMPLE, TRANSPARENT PRICING</h1>
        <p className="pricing-main-desc">
          Start 100% free with no account required. Upgrade for high-volume enterprise API access, batch analysis, and cryptographic certification.
        </p>
      </div>

      {/* 3 Tier Main Grid */}
      <div className="pricing-grid-triad">
        {/* Tier 1: Free Community */}
        <div className="glass-card plan-card">
          <div className="plan-badge-top">COMMUNITY</div>
          <h3 className="plan-name">FREE TIER</h3>
          <div className="plan-price">
            <span className="price-val">$0</span>
            <span className="price-term">/ FOREVER</span>
          </div>
          <p className="plan-summary">Perfect for individuals, teachers, and casual fact-checking.</p>
          <ul className="plan-perks">
            <li>✓ 100% Free Instant Online Analysis</li>
            <li>✓ Image, Video, Audio & Text Verification</li>
            <li>✓ Error Level Analysis (ELA) Heatmaps</li>
            <li>✓ No Account or Credit Card Required</li>
            <li>✓ Zero Data Retention (Privacy-by-Design)</li>
          </ul>
          <button className="btn btn-secondary plan-action-btn" onClick={onTryFree}>
            START FREE SCAN
          </button>
        </div>

        {/* Tier 2: Credit Packs */}
        <div className="glass-card plan-card featured">
          <div className="plan-badge-top highlight">POPULAR • NO EXPIRATION</div>
          <h3 className="plan-name">CREDIT PACKAGES</h3>
          <div className="plan-price">
            <span className="price-val">{selectedPack.price}</span>
            <span className="price-term">ONE-TIME</span>
          </div>
          <p className="plan-summary">Lifetime validity. Ideal for researchers and frequent fact-checkers.</p>
          
          {/* Credit Pack Selector Buttons */}
          <div className="credit-chips-selector">
            {CREDIT_PACKAGES.map((pkg, i) => (
              <button
                key={i}
                className={`credit-chip ${selectedPack.credits === pkg.credits ? 'active' : ''}`}
                onClick={() => setSelectedPack(pkg)}
              >
                <strong>{pkg.credits} CREDITS</strong>
                <span>{pkg.price} USD</span>
              </button>
            ))}
          </div>

          <ul className="plan-perks">
            <li>✓ {selectedPack.credits} Deep Forensic Analysis Credits</li>
            <li>✓ High-Resolution Multi-Frame Video Auditing</li>
            <li>✓ Downloadable Cryptographic PDF Certificates</li>
            <li>✓ Credits Never Expire • Lifetime Balance</li>
            <li>✓ Priority Neural Pipeline Queue</li>
          </ul>
          <button className="btn btn-glow plan-action-btn" onClick={() => alert(`Proceeding to secure checkout for ${selectedPack.credits} credits (${selectedPack.price}).`)}>
            BUY {selectedPack.credits} CREDITS ({selectedPack.price})
          </button>
        </div>

        {/* Tier 3: Enterprise & Developer API */}
        <div className="glass-card plan-card">
          <div className="plan-badge-top">ENTERPRISE & API</div>
          <h3 className="plan-name">BUSINESS PRO</h3>
          <div className="plan-price">
            <span className="price-val">$99</span>
            <span className="price-term">/ MONTH</span>
          </div>
          <p className="plan-summary">For newsrooms, finTech platforms, and security operations centers.</p>
          <ul className="plan-perks">
            <li>✓ Unlimited REST API Verification Calls</li>
            <li>✓ Sub-100ms Ultra-Low Latency SLA</li>
            <li>✓ C2PA Cryptographic Signature Verification</li>
            <li>✓ Webhook Automation & Real-Time Alerts</li>
            <li>✓ Dedicated Enterprise Account Manager</li>
            <li>✓ On-Premise / Self-Host Deployment Options</li>
          </ul>
          <a
            className="btn btn-secondary plan-action-btn"
            href="https://github.com/yash23082007/TruthLensAi"
            target="_blank"
            rel="noopener noreferrer"
          >
            CONTACT ENTERPRISE
          </a>
        </div>
      </div>

      {/* Trust & Guarantee Grid */}
      <div className="pricing-trust-banner glass-card">
        <div className="p-trust-col">
          <span className="p-trust-icon">🔒</span>
          <div>
            <h4>Privacy-First Default</h4>
            <p>Your uploaded media is processed in volatile memory and deleted immediately post-scan.</p>
          </div>
        </div>
        <div className="p-trust-col">
          <span className="p-trust-icon">⚡</span>
          <div>
            <h4>Instant Activation</h4>
            <p>Credits and API access are provisioned automatically within seconds of purchase.</p>
          </div>
        </div>
        <div className="p-trust-col">
          <span className="p-trust-icon">🛡️</span>
          <div>
            <h4>Stripe Encrypted Billing</h4>
            <p>Bank-grade 256-bit SSL encryption. We never store your raw payment details.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
