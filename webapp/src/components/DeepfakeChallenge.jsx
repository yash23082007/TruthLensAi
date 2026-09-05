import React, { useState } from 'react';
import './DeepfakeChallenge.css';

const CHALLENGE_ROUNDS = [
  {
    id: 1,
    title: 'Photorealistic Portrait Benchmark',
    type: 'image',
    mediaA: {
      url: '/images/sample_news.jpg',
      label: 'Photo A',
      isFake: false
    },
    mediaB: {
      url: '/images/sample_social.jpg',
      label: 'Photo B',
      isFake: true
    },
    forensicHint: 'Examine pupil reflection consistency, hair follicle definition, and skin pore micro-roughness.',
    explanation: 'Photo B is AI-generated (Flux.1 model). Notice the lack of natural skin pores on cheekbones and bilateral specular highlight symmetry in the iris.'
  },
  {
    id: 2,
    title: 'Historical Archive Photograph',
    type: 'image',
    mediaA: {
      url: '/images/sample_parade.jpg',
      label: 'Photo A',
      isFake: true
    },
    mediaB: {
      url: '/images/sample_finance.jpg',
      label: 'Photo B',
      isFake: false
    },
    forensicHint: 'Look for repeated background pixel clusters and compression block boundary anomalies under ELA.',
    explanation: 'Photo A contains cloned background sections. Under Laplacian frequency analysis, pixel clusters repeat with identical byte noise.'
  },
  {
    id: 3,
    title: 'Video Call & Interview Recording',
    type: 'image',
    mediaA: {
      url: '/images/sample_news.jpg',
      label: 'Photo A',
      isFake: false
    },
    mediaB: {
      url: '/images/sample_videocall.jpg',
      label: 'Photo B',
      isFake: true
    },
    forensicHint: 'Audit jawline boundary blending and real-time face filter auto-encoder blur.',
    explanation: 'Photo B exhibits real-time face swap blur along the neck seam where the synthetic face is mapped onto the source subject.'
  }
];

const DeepfakeChallenge = ({ onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedGuess, setSelectedGuess] = useState(null); // 'A' or 'B'
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const round = CHALLENGE_ROUNDS[currentIdx];

  const handleVote = (choice) => {
    if (isAnswered) return;
    setSelectedGuess(choice);
    setIsAnswered(true);

    const isCorrect = (choice === 'A' && round.mediaA.isFake) || (choice === 'B' && round.mediaB.isFake);
    if (isCorrect) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentIdx < CHALLENGE_ROUNDS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedGuess(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedGuess(null);
    setIsAnswered(false);
    setScore(0);
    setShowHint(false);
    setIsCompleted(false);
  };

  return (
    <div className="deepfake-challenge container animate-fade-in">
      <div className="challenge-header">
        <div>
          <div className="section-tag">Interactive Arena</div>
          <h1 className="challenge-title">Spot The Deepfake Challenge</h1>
          <p className="challenge-subtitle">
            Can human visual perception distinguish authentic photography from AI generative synthesis? Test your forensic instincts against certified benchmark sets.
          </p>
        </div>
        {onBack && (
          <button className="btn btn-secondary btn-small" onClick={onBack}>
            ← Back to Overview
          </button>
        )}
      </div>

      {!isCompleted ? (
        <div className="arena-card glass-card">
          {/* Top Info Bar */}
          <div className="arena-top-bar">
            <div className="round-indicator">
              <span className="round-badge">ROUND {currentIdx + 1} OF {CHALLENGE_ROUNDS.length}</span>
              <h3 className="round-title">{round.title}</h3>
            </div>
            <div className="score-pill">
              <span className="score-lbl">SCORE:</span>
              <strong>{score} / {CHALLENGE_ROUNDS.length}</strong>
            </div>
          </div>

          {/* Side by Side Photos */}
          <div className="comparison-arena-grid">
            {/* Photo A */}
            <div className={`media-choice-card ${isAnswered ? (round.mediaA.isFake ? 'is-fake' : 'is-real') : ''}`}>
              <div className="media-img-wrapper">
                <img src={round.mediaA.url} alt="Option A" className="challenge-img" />
                <span className="option-tag">PHOTO A</span>
                {isAnswered && (
                  <div className="verdict-banner">
                    {round.mediaA.isFake ? '🔴 AI GENERATED' : '🟢 AUTHENTIC'}
                  </div>
                )}
              </div>
              <button 
                className={`btn w-full ${selectedGuess === 'A' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleVote('A')}
                disabled={isAnswered}
              >
                {selectedGuess === 'A' ? 'Your Selection' : 'Vote Photo A is Synthetic'}
              </button>
            </div>

            {/* Photo B */}
            <div className={`media-choice-card ${isAnswered ? (round.mediaB.isFake ? 'is-fake' : 'is-real') : ''}`}>
              <div className="media-img-wrapper">
                <img src={round.mediaB.url} alt="Option B" className="challenge-img" />
                <span className="option-tag">PHOTO B</span>
                {isAnswered && (
                  <div className="verdict-banner">
                    {round.mediaB.isFake ? '🔴 AI GENERATED' : '🟢 AUTHENTIC'}
                  </div>
                )}
              </div>
              <button 
                className={`btn w-full ${selectedGuess === 'B' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleVote('B')}
                disabled={isAnswered}
              >
                {selectedGuess === 'B' ? 'Your Selection' : 'Vote Photo B is Synthetic'}
              </button>
            </div>
          </div>

          {/* Hint & Explanations */}
          <div className="arena-footer">
            {!isAnswered ? (
              <div className="hint-container">
                <button className="btn btn-secondary btn-small" onClick={() => setShowHint(!showHint)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" x2="12.01" y1="17" y2="17"/>
                  </svg>
                  {showHint ? 'Hide Forensic Hint' : 'Show Forensic Hint'}
                </button>
                {showHint && (
                  <p className="hint-text animate-fade-in">{round.forensicHint}</p>
                )}
              </div>
            ) : (
              <div className="explanation-box animate-fade-in">
                <div className="explanation-header">
                  <strong>FORENSIC BREAKDOWN:</strong>
                  <span className={`result-eval ${((selectedGuess === 'A' && round.mediaA.isFake) || (selectedGuess === 'B' && round.mediaB.isFake)) ? 'text-success' : 'text-danger'}`}>
                    {((selectedGuess === 'A' && round.mediaA.isFake) || (selectedGuess === 'B' && round.mediaB.isFake)) ? '✓ Correct Identification!' : '✗ Incorrect!'}
                  </span>
                </div>
                <p className="explanation-text">{round.explanation}</p>
                <button className="btn btn-primary btn-small next-round-btn" onClick={handleNext}>
                  {currentIdx < CHALLENGE_ROUNDS.length - 1 ? 'Next Round →' : 'View Final Score'}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="completed-card glass-card animate-fade-in">
          <div className="score-circle-display">
            <span className="final-score-num">{score}/{CHALLENGE_ROUNDS.length}</span>
            <span className="final-score-lbl">Correct Identifications</span>
          </div>
          <h2>Challenge Completed</h2>
          <p className="completion-sub">
            {score === CHALLENGE_ROUNDS.length 
              ? 'Expert Forensic Eye! You identified every synthetic media vector correctly.' 
              : 'Generative models fool human perception up to 60% of the time. Automated neural tools like TruthLens inspect frequency spectrums beyond human sight.'}
          </p>
          <button className="btn btn-primary" onClick={handleRestart}>
            Try Challenge Again
          </button>
        </div>
      )}
    </div>
  );
};

export default DeepfakeChallenge;
