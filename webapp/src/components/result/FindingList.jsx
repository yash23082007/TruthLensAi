import React from 'react';
import { AlertCircle, Info, ShieldAlert, Zap } from 'lucide-react';
import './FindingList.css';

export default function FindingList({ findings }) {
  if (!findings || findings.length === 0) {
    return (
      <div className="no-findings">
        <p>No significant signals or anomalies detected.</p>
      </div>
    );
  }

  const getSeverityIcon = (severity) => {
    switch (severity.toLowerCase()) {
      case 'low': return <Info size={20} className="finding-icon low" />;
      case 'medium': return <AlertCircle size={20} className="finding-icon medium" />;
      case 'high': return <ShieldAlert size={20} className="finding-icon high" />;
      case 'critical': return <Zap size={20} className="finding-icon critical" />;
      default: return <Info size={20} className="finding-icon" />;
    }
  };

  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'sev-low';
      case 'medium': return 'sev-medium';
      case 'high': return 'sev-high';
      case 'critical': return 'sev-critical';
      default: return '';
    }
  };

  return (
    <div className="finding-list">
      {findings.map((finding, index) => (
        <div key={index} className="finding-item">
          {getSeverityIcon(finding.severity)}
          <div className="finding-content">
            <div className="finding-header">
              <strong>{finding.category || 'Analysis'}</strong>
              <span className={`finding-severity ${getSeverityClass(finding.severity)}`}>
                {finding.severity}
              </span>
              <span className="finding-confidence">
                {(finding.confidence * 100).toFixed(0)}% confidence
              </span>
            </div>
            <p>{finding.finding}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
