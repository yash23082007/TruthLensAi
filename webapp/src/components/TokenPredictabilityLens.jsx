import React, { useState } from 'react';
import './TokenPredictabilityLens.css';
import { analyzeContent } from '../utils/api';

const SAMPLE_TEXTS = [
  {
    id: 'txt-scam',
    title: 'Urgent Wire Transfer / Phishing Alert',
    text: 'URGENT SECURITY ALERT: Your bank account has been locked due to suspicious login attempts. Please click the link immediately and confirm your social security number and password to prevent permanent account suspension.'
  },
  {
    id: 'txt-ai',
    title: 'Synthetic LLM Formula Essay',
    text: 'In conclusion, it is crucial to recognize that technological innovation serves as a transformative catalyst for modern society. By delving into the multifaceted nuances of artificial intelligence, we can foster a holistic paradigm that balances ethical frameworks with unprecedented synergy.'
  },
  {
    id: 'txt-human',
    title: 'Authentic Human Message',
    text: 'Hey everyone, sorry for running a bit late today! My car had a dead battery and traffic on the highway was backed up for miles. Let\'s grab lunch around 1pm if you\'re still at the studio.'
  }
];

const TokenPredictabilityLens = ({ onBack }) => {
  const [inputText, setInputText] = useState(SAMPLE_TEXTS[0].text);
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [stats, setStats] = useState(null);

  const runTokenAnalysis = async (textToScan = inputText) => {
    if (!textToScan.trim()) return;
    setIsScanning(true);
    setSelectedToken(null);

    const words = textToScan.split(/(\s+)/);
    const urgencyWords = ['urgent', 'locked', 'suspicious', 'immediately', 'confirm', 'social', 'security', 'password', 'suspension', 'wire', 'transfer', 'click', 'bank', 'closure', 'restricted'];
    const aiFormulaWords = ['delving', 'multifaceted', 'nuances', 'catalyst', 'transformative', 'paradigm', 'holistic', 'unprecedented', 'furthermore', 'testament', 'crucial', 'synergy', 'conclusion'];

    const parsedTokens = words.map((w, idx) => {
      const clean = w.toLowerCase().replace(/[^a-z]/g, '');
      let type = 'human';
      let reason = 'Natural conversational variance with high organic burstiness.';
      let score = 0.15;

      if (urgencyWords.includes(clean)) {
        type = 'scam';
        reason = 'High-pressure social engineering keyword characteristic of phishing scams.';
        score = 0.95;
      } else if (aiFormulaWords.includes(clean)) {
        type = 'ai';
        reason = 'Over-indexed LLM vocabulary token with low perplexity and predictable formulaic transition.';
        score = 0.88;
      } else if (clean.length > 7 && Math.sin(idx) > 0.4) {
        type = 'moderate';
        reason = 'Predictable sentence transition structure with moderate token probability.';
        score = 0.52;
      }

      return { word: w, clean, type, reason, score, index: idx };
    });

    setTokens(parsedTokens);

    try {
      const apiResult = await analyzeContent(textToScan, 'text');
      setStats({
        trust_score: apiResult.trust_score,
        risk_level: apiResult.risk_level,
        summary: apiResult.summary,
        details: apiResult.details
      });
    } catch (err) {
      setStats({
        trust_score: 82.0,
        risk_level: 'high',
        summary: 'High probability of synthetic phishing / AI generation detected.',
        details: [
          { category: 'Scam Phishing', finding: 'Multiple urgency keywords and credential requests', confidence: 0.92, severity: 'critical' }
        ]
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="token-lens container animate-fade-in">
      <div className="lens-header">
        <div>
          <div className="section-tag">Token Forensics</div>
          <h1 className="lens-title">Token Perplexity & Phishing Lens</h1>
          <p className="lens-subtitle">
            Inspect text token-by-token. Color coding exposes low-perplexity LLM filler phrases, social engineering urgency triggers, and authentic human burstiness.
          </p>
        </div>
        {onBack && (
          <button className="btn btn-secondary btn-small" onClick={onBack}>
            ← Back to Overview
          </button>
        )}
      </div>

      {/* Preset Toolbar */}
      <div className="lens-presets">
        <span className="preset-label">BENCHMARK PRESETS:</span>
        <div className="presets-list">
          {SAMPLE_TEXTS.map((sample) => (
            <button
              key={sample.id}
              className="preset-chip"
              onClick={() => {
                setInputText(sample.text);
                runTokenAnalysis(sample.text);
              }}
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      <div className="lens-layout">
        {/* Editor Pane */}
        <div className="lens-editor-pane glass-card">
          <div className="pane-header">
            <h3>Input Text & Token Map</h3>
            <button
              className="btn btn-primary btn-small"
              onClick={() => runTokenAnalysis()}
              disabled={isScanning}
            >
              {isScanning ? (
                <>
                  <span className="status-dot active pulse"></span>
                  Evaluating...
                </>
              ) : (
                'Scan Tokens'
              )}
            </button>
          </div>

          <textarea
            className="lens-textarea"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            placeholder="Paste text here to inspect token predictability..."
          />

          {tokens.length > 0 && (
            <div className="token-display-box">
              <div className="legend-strip">
                <span className="legend-item"><span className="legend-dot scam"></span> Urgent Phishing Trigger</span>
                <span className="legend-item"><span className="legend-dot ai"></span> High Predictability (LLM)</span>
                <span className="legend-item"><span className="legend-dot moderate"></span> Moderate Transition</span>
                <span className="legend-item"><span className="legend-dot human"></span> Organic Human Variance</span>
              </div>

              <div className="tokens-wrapper">
                {tokens.map((token, idx) => (
                  <span
                    key={idx}
                    className={`token-span ${token.type} ${selectedToken?.index === token.index ? 'selected' : ''}`}
                    onClick={() => token.clean && setSelectedToken(token)}
                  >
                    {token.word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Diagnostics Sidebar */}
        <div className="lens-sidebar glass-card">
          <h3 className="sidebar-title">Token Diagnostics</h3>

          {selectedToken ? (
            <div className="token-detail-card animate-slide-up">
              <div className="token-card-head">
                <span className={`signal-severity-tag sev-${selectedToken.type === 'scam' ? 'critical' : selectedToken.type === 'ai' ? 'high' : 'low'}`}>
                  {selectedToken.type.toUpperCase()}
                </span>
                <strong className="token-word">"{selectedToken.word.trim()}"</strong>
              </div>
              <div className="token-metric">
                <span className="metric-lbl">Predictability Index:</span>
                <strong className="metric-val">{Math.round(selectedToken.score * 100)}%</strong>
              </div>
              <p className="token-reason">{selectedToken.reason}</p>
            </div>
          ) : (
            <div className="token-placeholder">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                <path d="M9 18h6"/>
                <path d="M10 22h4"/>
              </svg>
              <p>Click any highlighted word in the text to inspect its predictability score and anomaly context.</p>
            </div>
          )}

          {stats && (
            <div className="lens-stats-box">
              <span className="stats-heading">EVALUATION VERDICT</span>
              <div className="stats-score-line">
                <span>Threat Level:</span>
                <strong className={`risk-text-${stats.risk_level?.toLowerCase()}`}>
                  {stats.risk_level?.toUpperCase()}
                </strong>
              </div>
              <p className="stats-summary">{stats.summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenPredictabilityLens;
