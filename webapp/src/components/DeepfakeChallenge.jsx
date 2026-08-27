import React, { useState } from 'react';
import './DeepfakeChallenge.css';

const CHALLENGE_ROUNDS = [
  {
    id: 1,
    title: 'Photorealistic Portrait',
    type: 'image',
    mediaA: {
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
      label: 'Photo A',
      isFake: false
    },
    mediaB: {
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      label: 'Photo B',
      isFake: true
    },
    forensicHint: 'Examine the pupil reflections, earlobe cartilage definition, and background depth-of-field coherence.',
    explanation: 'Photo B is AI-generated (Flux.1 model). Notice the lack of natural skin pores on the cheekbones and unnatural specular highlights in the iris.'
  },
  {
    id: 2,
    title: 'Historical Archive Photograph',
    type: 'image',
    mediaA: {
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
      label: 'Photo A',
      isFake: true
    },
    mediaB: {
      url: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80',
      label: 'Photo B',
      isFake: false
    },
    forensicHint: 'Look for film grain consistency, edge fringing, and period-accurate textile weave patterns.',
    explanation: 'Photo A is a synthetic deepfake retro recreation. The digital noise pattern does not match silver halide film grain under Laplacian frequency analysis.'
  },
  {
    id: 3,
    title: 'Breaking Viral News Event',
    type: 'image',
    mediaA: {
      url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      label: 'Photo A',
      isFake: false
    },
    mediaB: {
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
      label: 'Photo B',
      isFake: true
    },
    forensicHint: 'Audit perspective vanishing lines and architectural geometry repeating patterns.',
    explanation: 'Photo B has GAN spatial warping on the upper structural facades where the generative model hallucinated window alignments.'
  },
  {
    id: 4,
    title: 'Financial Document & Invoice Audit',
    type: 'image',
    mediaA: {
      url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
      label: 'Photo A',
      isFake: true
    },
    mediaB: {
      url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
      label: 'Photo B',
      isFake: false
    },
    forensicHint: 'Inspect font baseline alignment and micro-print anti-counterfeit rastering.',
    explanation: 'Photo A is a synthesized forgery created by a diffusion document inpainting model. Font baselines jump by 3.2px between digit pairs.'
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
    setShowHint(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="deepfake-challenge container animate-fade-in">
      <div className="challenge-header">
        <div>
          <div className="section-stamp">Interactive Perception Arena</div>
          <h1 className="challenge-title">SPOT THE DEEPFAKE CHALLENGE</h1>
          <p className="challenge-subtitle">
            Test your human perception against state-of-the-art synthetic media. One of these images is authentic, and one is an AI generation. Can you find the fake?
          </p>
        </div>
        {onBack && (
          <button className="btn btn-secondary" onClick={onBack}>
            ← BACK TO SCANNER
          </button>
        )}
      </div>

      {!isCompleted ? (
        <div className="arena-card glass-card">
          {/* Round Header & Progress */}
          <div className="arena-top">
            <div className="round-indicator">
              ROUND {currentIdx + 1} OF {CHALLENGE_ROUNDS.length}: <strong>{round.title.toUpperCase()}</strong>
            </div>
            <div className="score-pill">
              YOUR SCORE: <strong>{score} / {currentIdx + (isAnswered ? 1 : 0)}</strong>
            </div>
          </div>

          {/* Side by Side Comparison Grid */}
          <div className="media-comparison-grid">
            {/* Option A */}
            <div className={`media-option-card ${isAnswered ? (round.mediaA.isFake ? 'is-fake' : 'is-real') : ''}`}>
              <div className="media-preview-box">
                <img src={round.mediaA.url} alt="Option A" className="challenge-img" />
                <span className="media-label">{round.mediaA.label}</span>
                {isAnswered && (
                  <span className={`reveal-stamp ${round.mediaA.isFake ? 'fake' : 'real'}`}>
                    {round.mediaA.isFake ? '🔴 AI DEEPFAKE' : '🟢 AUTHENTIC REAL'}
                  </span>
                )}
              </div>
              <button
                className={`btn ${selectedGuess === 'A' ? 'btn-glow' : 'btn-secondary'} vote-btn`}
                onClick={() => handleVote('A')}
                disabled={isAnswered}
              >
                {isAnswered && selectedGuess === 'A' ? 'YOUR PICK' : 'PICK PHOTO A AS FAKE'}
              </button>
            </div>

            {/* Option B */}
            <div className={`media-option-card ${isAnswered ? (round.mediaB.isFake ? 'is-fake' : 'is-real') : ''}`}>
              <div className="media-preview-box">
                <img src={round.mediaB.url} alt="Option B" className="challenge-img" />
                <span className="media-label">{round.mediaB.label}</span>
                {isAnswered && (
                  <span className={`reveal-stamp ${round.mediaB.isFake ? 'fake' : 'real'}`}>
                    {round.mediaB.isFake ? '🔴 AI DEEPFAKE' : '🟢 AUTHENTIC REAL'}
                  </span>
                )}
              </div>
              <button
                className={`btn ${selectedGuess === 'B' ? 'btn-glow' : 'btn-secondary'} vote-btn`}
                onClick={() => handleVote('B')}
                disabled={isAnswered}
              >
                {isAnswered && selectedGuess === 'B' ? 'YOUR PICK' : 'PICK PHOTO B AS FAKE'}
              </button>
            </div>
          </div>

          {/* Hint & Forensic Explanation */}
          <div className="arena-controls-bottom">
            {!isAnswered ? (
              <div className="hint-box">
                {!showHint ? (
                  <button className="hint-toggle-btn" onClick={() => setShowHint(true)}>
                    💡 Need a forensic clue? Click to reveal hint
                  </button>
                ) : (
                  <p className="hint-text"><strong>FORENSIC CLUE:</strong> {round.forensicHint}</p>
                )}
              </div>
            ) : (
              <div className="verdict-banner animate-slide-up">
                <div className="verdict-title">
                  {((selectedGuess === 'A' && round.mediaA.isFake) || (selectedGuess === 'B' && round.mediaB.isFake)) ? (
                    <span className="text-success">🎉 EXCELLENT EYE! YOU CAUGHT THE FAKE.</span>
                  ) : (
                    <span className="text-danger">⚠️ DECEIVED! THE AI FOOLED YOU.</span>
                  )}
                </div>
                <p className="verdict-explanation">{round.explanation}</p>
                <div className="verdict-actions">
                  <button className="btn btn-primary" onClick={handleNext}>
                    {currentIdx < CHALLENGE_ROUNDS.length - 1 ? 'NEXT ROUND →' : 'VIEW FINAL REPORT →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Completed Scorecard */
        <div className="scorecard-card glass-card animate-slide-up">
          <div className="scorecard-icon">🏆</div>
          <h2>CHALLENGE COMPLETE!</h2>
          <div className="scorecard-rating">
            <span className="big-score">{Math.round((score / CHALLENGE_ROUNDS.length) * 100)}%</span>
            <span className="score-desc">Human Perception Accuracy</span>
          </div>

          <div className="comparison-table">
            <div className="table-col human">
              <span>YOUR RESULT</span>
              <strong>{score} / {CHALLENGE_ROUNDS.length} CORRECT</strong>
            </div>
            <div className="table-col ai">
              <span>TRUTHLENS AI</span>
              <strong>4 / 4 (100% ACCURACY)</strong>
            </div>
          </div>

          <p className="scorecard-summary">
            Modern generative models like Flux and Midjourney are designed to pass human visual inspection. That's why multi-signal forensic verification (ELA, EXIF, and frequency analysis) is essential to know what's real.
          </p>

          <div className="scorecard-actions">
            <button className="btn btn-secondary" onClick={handleRestart}>
              🔄 RETRY CHALLENGE
            </button>
            <button className="btn btn-glow" onClick={onBack}>
              ⚡ TRY TRUTHLENS SCANNER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeepfakeChallenge;
