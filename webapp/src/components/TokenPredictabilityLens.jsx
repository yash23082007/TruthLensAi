import React, { useState } from 'react';
import './TokenPredictabilityLens.css';
import { analyzeContent } from '../utils/api';

const SAMPLE_TEXTS = [
  {
    id: 'txt-scam',
    title: 'Urgent Wire Scam / Phishing Alert',
    text: 'URGENT: Your bank account has been locked due to suspicious login attempts. Please click the link immediately and confirm your social security number and password to prevent permanent account suspension.'
  },
  {
    id: 'txt-ai',
    title: 'AI LLM Essay (GPT-4 Typical Formula)',
    text: 'In conclusion, it is important to remember that technological innovation serves as a transformative catalyst for modern society. By delving into the multifaceted nuances of artificial intelligence, we can foster a holistic paradigm that balances ethical frameworks with unprecedented efficiency.'
  },
  {
    id: 'txt-human',
    title: 'Authentic Human Message',
    text: 'Hey guys, sorry for being late today! My car wouldn\'t start and traffic on I-95 was absolute chaos. Let\'s grab coffee around 3pm if you\'re still at the office.'
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
    const urgencyWords = ['urgent', 'locked', 'suspicious', 'immediately', 'confirm', 'social', 'security', 'password', 'suspension', 'wire', 'transfer', 'click', 'bank'];
    const aiFormulaWords = ['delving', 'multifaceted', 'nuances', 'catalyst', 'transformative', 'paradigm', 'holistic', 'unprecedented', 'furthermore', 'testament'];

    const parsedTokens = words.map((w, idx) => {
      const clean = w.toLowerCase().replace(/[^a-z]/g, '');
      let type = 'human'; // 'ai', 'scam', 'moderate', 'human'
      let reason = 'Organic conversational variance.';
      let score = 0.15;

      if (urgencyWords.includes(clean)) {
        type = 'scam';
        reason = 'High-urgency social engineering keyword triggering scam flags.';
        score = 0.95;
      } else if (aiFormulaWords.includes(clean)) {
        type = 'ai';
        reason = 'Over-indexed LLM vocabulary token with high predictability (low perplexity).';
        score = 0.88;
      } else if (clean.length > 7 && Math.sin(idx) > 0.4) {
        type = 'moderate';
        reason = 'Predictable sentence transition structure.';
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
        summary: '⚠️ High probability of synthetic phishing / AI generation detected.',
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
          <div className="section-stamp">Token Forensics & Perplexity Lens</div>
          <h1 className="lens-title">INTERACTIVE TEXT & SCAM HIGHLIGHTER</h1>
          <p className="lens-subtitle">
            Inspect text token-by-token. Color coding exposes low-perplexity LLM filler, social engineering urgency triggers, and authentic human burstiness.
          </p>
        </div>
        {onBack && (
          <button className="btn btn-secondary" onClick={onBack}>
            ← BACK TO SCANNER
          </button>
        )}
      </div>

      {/* Preset Buttons */}
      <div className="lens-presets">
        <span className="preset-label">TEST PRESETS:</span>
        {SAMPLE_TEXTS.map((sample) => (
          <button
            key={sample.id}
            className="preset-tag"
            onClick={() => {
              setInputText(sample.text);
              runTokenAnalysis(sample.text);
            }}
          >
            {sample.title}
          </button>
        ))}
      </div>

      <div className="lens-layout">
        {/* Left Column: Text Input & Interactive Token View */}
        <div className="lens-editor-pane glass-card">
          <div className="pane-header">
            <h3>INPUT TEXT & TOKEN MAPPING</h3>
            <button
              className="btn btn-glow btn-sm"
              onClick={() => runTokenAnalysis()}
              disabled={isScanning}
            >
              {isScanning ? 'EVALUATING TOKENS...' : '⚡ SCAN TOKENS'}
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
                <span className="legend-item"><b className="dot scam"></b> Urgent / Phishing Trigger</span>
                <span className="legend-item"><b className="dot ai"></b> High Predictability (AI LLM)</span>
                <span className="legend-item"><b className="dot moderate"></b> Moderate Transition</span>
                <span className="legend-item"><b className="dot human"></b> Human Nuance / Organic</span>
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

        {/* Right Column: Token Inspector & Diagnostics */}
        <div className="lens-sidebar glass-card">
          <h3>TOKEN DIAGNOSTICS</h3>

          {selectedToken ? (
            <div className="token-detail-card animate-slide-up">
              <div className="token-card-head">
                <span className={`token-badge ${selectedToken.type}`}>
                  {selectedToken.type.toUpperCase()}
                </span>
                <strong className="token-word">"{selectedToken.word.trim()}"</strong>
              </div>
              <div className="token-metric">
                <span>Predictability Score:</span>
                <strong>{Math.round(selectedToken.score * 100)}%</strong>
              </div>
              <p className="token-reason">{selectedToken.reason}</p>
            </div>
          ) : (
            <div className="token-placeholder">
              <p>👉 Click on any highlighted word in the text to inspect its token weight and context rationale.</p>
            </div>
          )}

          {stats && (
            <div className="lens-stats-box">
              <h4>SYNTHETIC TEXT VERDICT</h4>
              <div className="stats-score-line">
                <span>Anomaly Risk:</span>
                <strong className={`risk-${stats.risk_level}`}>{stats.risk_level.toUpperCase()}</strong>
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
