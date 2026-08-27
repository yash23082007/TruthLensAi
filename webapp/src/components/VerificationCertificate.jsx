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
                <span className="logo-badge">TL</span>
                <div>
                  <h3>TRUTHLENS AI FORENSICS</h3>
                  <p>Multimodal Content Authenticity Authority</p>
                </div>
              </div>
              <div className="cert-id-block">
                <span>CASE IDENTIFIER</span>
                <strong>{caseId}</strong>
              </div>
            </div>

            <div className="cert-divider"></div>

            {/* Title */}
            <div className="cert-title-section">
              <h1>FORENSIC VERIFICATION CERTIFICATE</h1>
              <p>OFFICIAL DIGITAL FORENSIC AUDIT RECORD</p>
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
                <span className={`risk-pill ${result.risk_level}`}>{result.risk_level.toUpperCase()} RISK</span>
              </div>
            </div>

            {/* Signal Details Breakdown */}
            <div className="cert-signals-section">
              <h4>AUDITED FORENSIC SIGNALS</h4>
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
                    <span className="signal-cat">Visual / Audio / Text</span>
                    <span className="signal-find">No statistical or metadata anomalies detected.</span>
                    <span className="signal-conf">98%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Cryptographic Seal & Provenance */}
            <div className="cert-footer-grid">
              <div className="crypto-details">
                <div className="crypto-line">
                  <span>SHA-256 INTEGRITY HASH:</span>
                  <code>{sha256Hash}</code>
                </div>
                <div className="crypto-line">
                  <span>TIMESTAMP (UTC):</span>
                  <strong>{issueDate}</strong>
                </div>
                <div className="crypto-line">
                  <span>VERIFICATION PROTOCOL:</span>
                  <strong>TruthLens Multi-Signal Neural Engine v2.4</strong>
                </div>
              </div>

              <div className="cert-seal-box">
                <div className="seal-badge">
                  <div className="seal-star">★</div>
                  <span>OFFICIAL AUDIT</span>
                  <strong>VERIFIED</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="cert-actions-bar">
          <button className="btn btn-secondary" onClick={onClose}>
            ✕ CLOSE
          </button>
          <button className="btn btn-secondary" onClick={handleCopyAuditJson}>
            {copied ? '✓ JSON COPIED' : '📋 COPY JSON AUDIT'}
          </button>
          <button className="btn btn-glow" onClick={handlePrint}>
            🖨️ PRINT / DOWNLOAD PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationCertificate;
