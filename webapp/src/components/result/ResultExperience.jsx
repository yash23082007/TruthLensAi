import React from 'react';
import TrustScoreRing from './TrustScoreRing';
import FindingList from './FindingList';
import { Share2, Download, AlertTriangle } from 'lucide-react';
import './ResultExperience.css';

export default function ResultExperience({ result, modality }) {
  if (!result) return null;

  // Derive top level variables from the backend result
  const score = result.trust_score || 0;
  const riskLevel = result.overall_risk || 'UNKNOWN';
  const findings = result.details || [];
  
  // Format metadata summary based on modality
  const getMetadataString = () => {
    const meta = result.metadata || {};
    if (modality === 'text') return `${meta.char_count || 0} chars | Analyzed in ${meta.processing_time_ms || 0}ms`;
    if (modality === 'image') return `${meta.format || 'IMG'} | ${meta.width || 0}x${meta.height || 0} | ${(meta.file_size / 1024 / 1024).toFixed(2) || 0}MB`;
    if (modality === 'video') return `${meta.format || 'VID'} | ${meta.duration_seconds || 0}s | ${(meta.file_size / 1024 / 1024).toFixed(2) || 0}MB`;
    if (modality === 'audio') return `${meta.format || 'AUD'} | ${meta.duration_seconds || 0}s | ${(meta.file_size / 1024 / 1024).toFixed(2) || 0}MB`;
    return 'Analysis Complete';
  };

  const getRiskColorClass = () => {
    switch (riskLevel.toLowerCase()) {
      case 'low': return 'risk-low';
      case 'medium': return 'risk-medium';
      case 'high': return 'risk-high';
      case 'critical': return 'risk-critical';
      default: return '';
    }
  };

  const getVerdictText = () => {
    switch (riskLevel.toLowerCase()) {
      case 'low': return 'Likely Authentic. No significant anomalies detected.';
      case 'medium': return 'Suspicious. Some structural or signal anomalies detected.';
      case 'high': return 'Highly Suspicious. Multiple strong indicators of manipulation.';
      case 'critical': return 'Definitively Manipulated. Known AI signatures or deepfake patterns found.';
      default: return 'Analysis complete with unknown risk level.';
    }
  };

  return (
    <div className="result-experience">
      <div className="result-top">
        <div className="result-summary">
          <h2>Analysis Complete</h2>
          <p className="verdict-text">{getVerdictText()}</p>
          
          <div className="result-meta-tags">
            <span className={`risk-badge ${getRiskColorClass()}`}>
              {riskLevel} RISK
            </span>
            <span className="meta-info">{getMetadataString()}</span>
            {riskLevel.toLowerCase() === 'critical' && (
              <span className="alert-tag">
                <AlertTriangle size={12} /> AI Generated
              </span>
            )}
          </div>
          
          <div className="result-actions">
            <button className="button secondary">
              <Share2 size={16} /> Share Report
            </button>
            <button className="button secondary">
              <Download size={16} /> Export PDF
            </button>
          </div>
        </div>
        
        <div className="result-score-container">
          <TrustScoreRing score={score} />
        </div>
      </div>
      
      <div className="result-grid">
        <div className="result-column">
          <h3>Detected Signals</h3>
          <p className="column-desc">Heuristic and Deep Learning flags identified during processing.</p>
          <FindingList findings={findings} />
        </div>
        
        <div className="result-column">
          <h3>Verification Context</h3>
          <p className="column-desc">Additional metadata and context about the analyzed file.</p>
          
          <div className="context-card">
            <h4>Deep Learning Analysis</h4>
            <p>Content was processed through specialized HuggingFace transformers targeting <strong>{modality}</strong> manipulation and AI generation.</p>
          </div>
          
          <div className="context-card">
            <h4>Limitations</h4>
            <p>TruthLens provides a probabilistic assessment. Compression artifacts, heavy filtering, or screenshots may degrade analysis accuracy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
