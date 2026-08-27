import React, { useState } from 'react';
import TrustScoreGauge from './TrustScoreGauge';
import RiskBadge from './RiskBadge';
import VerificationCertificate from './VerificationCertificate';
import './AnalysisResult.css';

const AnalysisResult = ({ result, onReset, onOpenForensicLab }) => {
  const [showCertificate, setShowCertificate] = useState(false);

  if (!result) return null;

  return (
    <div id="results-view" className="results-section container animate-fade-in">
      <div className="results-header">
        <div>
          <div className="section-stamp">Forensic Audit Verdict</div>
          <h2>ANALYSIS RESULT</h2>
        </div>
        <div className="results-actions-top">
          <button className="btn btn-glow" onClick={() => setShowCertificate(true)}>
            📜 EXPORT CERTIFICATE
          </button>
          {onOpenForensicLab && (
            <button className="btn btn-secondary" onClick={onOpenForensicLab}>
              🔬 INSPECT IN FORENSIC LAB
            </button>
          )}
          <button className="btn btn-secondary" onClick={onReset}>
            NEW SCAN
          </button>
        </div>
      </div>

      <div className="results-grid">
        {/* Left Column: Summary & Gauge */}
        <div className="glass-card result-summary">
          <div className="score-container">
            <TrustScoreGauge score={result.trust_score} />
          </div>
          
          <div className="status-container">
            <RiskBadge riskLevel={result.risk_level} />
            <h3 className="status-title">
              {result.is_authentic ? 'LIKELY AUTHENTIC' : 'MANIPULATION DETECTED'}
            </h3>
            <p className="status-summary">{result.summary}</p>
          </div>
        </div>

        {/* Right Column: Detailed Explanation & Forensic Evidence */}
        <div className="glass-card result-details">
          <div className="details-header">
            <h3>FORENSIC SIGNALS & REASONING</h3>
            <span className="content-badge">{result.content_type.toUpperCase()} ANALYSIS</span>
          </div>
          
          <div className="explanation-text">
            <p className="spacer">{result.explanation.split('\n')[0]}</p>
            
            <div className="findings-list">
              {result.details && result.details.length > 0 ? (
                result.details.map((detail, idx) => {
                  const icon = detail.severity === 'critical' ? '⚠️' : 
                               detail.severity === 'high' ? '🔴' : 
                               detail.severity === 'medium' ? '⚡' : '✅';
                  return (
                    <div key={idx} className="finding-item">
                      <span className="finding-icon">{icon}</span>
                      <div className="finding-content">
                        <strong>{detail.category.toUpperCase()}</strong>
                        <span className="finding-detail">{detail.finding} (CONFIDENCE: {Math.round(detail.confidence * 100)}%)</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="finding-item">
                  <span className="finding-icon">✅</span>
                  <div className="finding-content">
                    <strong>CLEAR</strong>
                    <span className="finding-detail">No anomalies or manipulation signatures identified across all tested signals.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="metadata-footer">
            <span>PROCESSED IN {result.processing_time_ms}MS • TRUTHLENS FORENSIC ENGINE</span>
          </div>
        </div>
      </div>

      {/* Cryptographic Certificate Modal */}
      {showCertificate && (
        <VerificationCertificate
          result={result}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

export default AnalysisResult;
