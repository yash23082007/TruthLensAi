import React, { useEffect, useState } from 'react';
import './AnalysisResult.css';

const TrustScoreGauge = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 900;
    const steps = 45;
    const stepTime = duration / steps;
    const increment = (score || 0) / steps;
    let currentScore = 0;

    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(currentScore));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  const authenticityScore = Math.round(Math.max(0, 100 - (animatedScore || 0)));
  const isHealthy = authenticityScore >= 60;
  
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (authenticityScore / 100) * circumference;

  return (
    <div className="score-ring-wrapper">
      <svg className="score-ring" width="140" height="140" viewBox="0 0 140 140">
        <circle 
          className="ring-bg" 
          cx="70" cy="70" r={radius} 
          strokeWidth="9" 
        />
        <circle 
          className={`ring-fill ${isHealthy ? 'stroke-success' : 'stroke-danger'}`} 
          cx="70" cy="70" r={radius} 
          strokeWidth="9" 
          style={{ 
            strokeDasharray: circumference, 
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="score-center-text">
        <span className="score-number">{authenticityScore}%</span>
        <span className="score-label">Authenticity</span>
      </div>
    </div>
  );
};

export default TrustScoreGauge;
