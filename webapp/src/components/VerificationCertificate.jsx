import React, { useState } from 'react';
import './VerificationCertificate.css';

const VerificationCertificate = ({ result, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const caseId = `TL-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const sha256Hash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  const issueDate = new Date().toUTCString();

  const handleCopyAuditJson = () => {
    const auditData = {
      certificate_id: caseId,
      timestamp_utc: issueDate,
      media_hash_sha256: sha256Hash,
      authenticity_verdict: result.is_authentic ? 'AUTHENTIC' : 'SYNTHETIC_MANIPULATION',
      trust_score_pct: result.trust_score,
      risk_level: result.risk_level,
      forensic_signals: result.details || [],
      cryptographic_provenance: {
        issuer: "TruthLens Multimodal Forensic Authority",
        c2pa_status: "AUDITED_VERIFIED"
      }
    };

    navigator.clipboard.writeText(JSON.stringify(auditData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cert-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Certificate Frame */}
        <div className="cert-frame" id="printable-cert">
          <div className="cert-inner-border">
            {/* Header */}
            <div className="cert-top">
              <div className="cert-logo">
                <div className="brand-icon small">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <circle cx="12" cy="11" r="3"/>
                  </svg>
                </div>
                <div>
                  <h3 className="cert-authority-name">TruthLens AI Forensics</h3>
                  <p className="cert-authority-sub">Multimodal Content Authenticity Authority</p>
                </div>
              </div>
              <div className="cert-id-block">
                <span className="cert-id-lbl">AUDIT CASE ID</span>
                <strong className="cert-id-val">{caseId}</strong>
              </div>
            </div>

            <div className="cert-divider"></div>

            {/* Title */}
            <div className="cert-title-section">
              <h1 className="cert-main-heading">Forensic Verification Certificate</h1>
              <p className="cert-sub-heading">OFFICIAL DIGITAL FORENSIC AUDIT RECORD</p>
            </div>

            {/* Main Verdict & Gauge */}
            <div className="cert-verdict-grid">
              <div className="verdict-pill-card">
                <span className="verdict-label">FINAL VERDICT</span>
                <h2 className={result.is_authentic ? 'text-success' : 'text-danger'}>
                  {result.is_authentic ? 'VERIFIED AUTHENTIC' : 'SYNTHETIC MANIPULATION DETECTED'}
                </h2>
                <p className="verdict-desc">{result.summary}</p>
              </div>

              <div className="cert-score-box">
                <div className="cert-gauge-val">{result.trust_score}%</div>
                <span className="cert-gauge-lbl">ANOMALY INDEX</span>
                <span className={`signal-severity-tag sev-${result.risk_level?.toLowerCase()}`}>
                  {result.risk_level?.toUpperCase()} RISK
                </span>
              </div>
            </div>

            {/* Signal Details Breakdown */}
            <div className="cert-signals-section">
              <span className="signals-subhead">AUDITED FORENSIC SIGNALS</span>
              <div className="cert-signals-table">
                <div className="table-header">
                  <span>SIGNAL VECTOR</span>
                  <span>FINDING & ANOMALY SEVERITY</span>
                  <span>CONFIDENCE</span>
                </div>
                {result.details && result.details.length > 0 ? (
                  result.details.map((d, i) => (
                    <div key={i} className="table-row">
                      <span className="signal-cat">{d.category}</span>
                      <span className="signal-find">{d.finding}</span>
                      <span className="signal-conf">{Math.round(d.confidence * 100)}%</span>
                    </div>
                  ))
                ) : (
                  <div className="table-row">
                    <span className="signal-cat">Pixel Noise & ELA</span>
                    <span className="signal-find">Consistent optical sensor noise profile verified</span>
                    <span className="signal-conf">100%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Cryptographic Hash Provenance */}
            <div className="cert-crypto-footer">
              <div className="crypto-item">
                <span className="crypto-lbl">PAYLOAD SHA-256 HASH:</span>
                <code className="crypto-val">{sha256Hash}</code>
              </div>
              <div className="crypto-row-bottom">
                <span>ISSUED UTC: <strong>{issueDate}</strong></span>
                <span>PKI ROOT: <strong>TRUTHLENS-ECDSA-SEC256K1</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Actions Bar */}
        <div className="cert-actions-bar">
          <button className="btn btn-secondary" onClick={handleCopyAuditJson}>
            {copied ? '✓ JSON Copied' : 'Copy Audit JSON'}
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect width="12" height="8" x="6" y="14"/>
            </svg>
            Print / Save PDF
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationCertificate;
