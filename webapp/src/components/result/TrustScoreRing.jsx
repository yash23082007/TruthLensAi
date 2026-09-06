import React, { useEffect, useState } from 'react';
import './TrustScoreRing.css';

export default function TrustScoreRing({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate score from 0 to target
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // Map score to color
  const getColor = (val) => {
    if (val >= 80) return '#16845b'; // Success
    if (val >= 50) return '#f59e0b'; // Warning
    return '#b13a3a'; // Danger
  };

  const ringColor = getColor(animatedScore);
  const angle = (animatedScore / 100) * 360;

  return (
    <div 
      className="trust-score-ring"
      style={{
        background: `conic-gradient(${ringColor} ${angle}deg, #e8edf3 0deg)`
      }}
    >
      <div className="score-inner">
        <strong>{animatedScore}</strong>
        <span>Trust Score</span>
      </div>
    </div>
  );
}
