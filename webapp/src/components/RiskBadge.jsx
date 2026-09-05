import React from 'react';
import './AnalysisResult.css';

const RiskBadge = ({ riskLevel }) => {
  const getRiskStyles = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': 
        return { class: 'risk-low', label: 'Low Risk — Authentic' };
      case 'medium': 
        return { class: 'risk-medium', label: 'Medium Risk — Anomalies' };
      case 'high': 
        return { class: 'risk-high', label: 'High Risk — Synthetic' };
      case 'critical': 
        return { class: 'risk-critical', label: 'Critical — Deepfake' };
      default: 
        return { class: 'risk-unknown', label: 'Unknown' };
    }
  };

  const style = getRiskStyles(riskLevel);

  return (
    <div className={`verdict-pill ${style.class}`}>
      <span className="status-dot pulse"></span>
      <span className="risk-label">{style.label}</span>
    </div>
  );
};

export default RiskBadge;
