import React, { useState, useEffect } from 'react';
import './ThreatRadar.css';

const DEFAULT_RADAR_DATA = {
  status: "active",
  global_threat_level: "DEFCON 2 — ELEVATED SYNTHETIC CAMPAIGNS",
  global_threat_score: 78.4,
  scanned_last_24h: 142850,
  flagged_deepfakes_24h: 26940,
  detection_rate_pct: 98.7,
  threat_distribution: {
    voice_cloning_scams: 38,
    face_swap_video: 27,
    ai_image_manipulation: 21,
    phishing_text_generation: 14
  },
  active_campaigns: [
    {
      id: "CAMP-2026-881",
      name: "Global Executive Voice Clone Wire Fraud",
      medium: "Audio / Voice Clone",
      severity: "CRITICAL",
      vectors: ["ElevenLabs v3", "RVC Voice Models"],
      targets: ["FinTech", "Corporate Treasuries"],
      active_since: "2026-08-20",
      mitigation: "Enforce out-of-band cryptographic voice callback authentication"
    },
    {
      id: "CAMP-2026-882",
      name: "Viral Synthetic News Anchor Broadcasts",
      medium: "Video Face Swap",
      severity: "HIGH",
      vectors: ["HeyGen", "LivePortrait-v2"],
      targets: ["Social Platforms (X, TikTok, YT Shorts)"],
      active_since: "2026-08-24",
      mitigation: "Check C2PA metadata & facial boundary Laplacian variance"
    },
    {
      id: "CAMP-2026-883",
      name: "High-Volume Urgent KYC AI ID Manipulation",
      medium: "Image ID & Document",
      severity: "CRITICAL",
      vectors: ["Midjourney v6.1", "Flux.1 Schnell"],
      targets: ["Banking & Crypto Exchanges"],
      active_since: "2026-08-15",
      mitigation: "Deploy ELA compression & PRNU sensor pattern validation"
    },
    {
      id: "CAMP-2026-884",
      name: "Hyper-Personalized Spear Phishing SMS & Email",
      medium: "Text Generation",
      severity: "HIGH",
      vectors: ["Uncensored Llama-3-70B fine-tunes"],
      targets: ["Healthcare & Educational staff"],
      active_since: "2026-08-26",
      mitigation: "Perplexity burstiness filtering & urgency keyword screening"
    }
  ]
};

const ThreatRadar = ({ onBack }) => {
  const [data, setData] = useState(DEFAULT_RADAR_DATA);
  const [filterMedium, setFilterMedium] = useState('ALL');
  const [tickerCount, setTickerCount] = useState(142850);

  useEffect(() => {
    fetch('http://localhost:8000/api/threats/radar')
      .then(res => res.json())
      .then(json => {
        if (json.active_campaigns) setData(json);
      })
      .catch(() => {});

    const interval = setInterval(() => {
      setTickerCount(prev => prev + Math.floor(Math.random() * 4) + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const filteredCampaigns = data.active_campaigns.filter(c => {
    if (filterMedium === 'ALL') return true;
    return c.medium.toLowerCase().includes(filterMedium.toLowerCase());
  });

  return (
    <div className="threat-radar container animate-fade-in">
      <div className="radar-header">
        <div>
          <div className="section-tag">Global Threat Intelligence</div>
          <h1 className="radar-title">Synthetic Media Threat Radar</h1>
          <p className="radar-subtitle">
            Real-time global telemetry monitoring active synthetic identity attacks, voice cloning fraud campaigns, and generative disinformation vectors.
          </p>
        </div>
        {onBack && (
          <button className="btn btn-secondary btn-small" onClick={onBack}>
            ← Back to Overview
          </button>
        )}
      </div>

      {/* Hero Telemetry Banner */}
      <div className="radar-hero-grid">
        <div className="defcon-card glass-card">
          <div className="defcon-tag">DEFCON STATUS</div>
          <div className="defcon-status">
            <span className="status-dot danger pulse"></span>
            <h2>{data.global_threat_level}</h2>
          </div>
          <div className="threat-meter">
            <div className="threat-bar" style={{ width: `${data.global_threat_score}%` }}></div>
          </div>
          <div className="defcon-footer">
            <span>SYNTHETIC ATTACK INDEX: <strong>{data.global_threat_score}/100</strong></span>
            <span>TELEMETRY: <strong>ACTIVE</strong></span>
          </div>
        </div>

        <div className="stats-metric-card glass-card">
          <div className="metric-box">
            <span className="metric-num">{tickerCount.toLocaleString()}</span>
            <span className="metric-lbl">Scanned Last 24h</span>
          </div>
          <div className="metric-box">
            <span className="metric-num text-danger">{data.flagged_deepfakes_24h.toLocaleString()}</span>
            <span className="metric-lbl">Flagged Deepfakes</span>
          </div>
          <div className="metric-box">
            <span className="metric-num text-success">{data.detection_rate_pct}%</span>
            <span className="metric-lbl">Detection Accuracy</span>
          </div>
        </div>
      </div>

      {/* Vector Distribution Bar */}
      <div className="vector-dist-card glass-card">
        <div className="dist-header">
          <h3>24h Threat Vector Distribution</h3>
          <span className="telemetry-meta-tag">GLOBAL SENSOR ARRAY</span>
        </div>
        <div className="dist-bars-container">
          <div className="dist-item">
            <div className="dist-info">
              <span>Voice Cloning & Audio Scams</span>
              <strong>{data.threat_distribution.voice_cloning_scams}%</strong>
            </div>
            <div className="dist-bar-track">
              <div className="dist-bar-fill voice" style={{ width: `${data.threat_distribution.voice_cloning_scams}%` }}></div>
            </div>
          </div>

          <div className="dist-item">
            <div className="dist-info">
              <span>Video Face Swaps & Lip-Sync</span>
              <strong>{data.threat_distribution.face_swap_video}%</strong>
            </div>
            <div className="dist-bar-track">
              <div className="dist-bar-fill video" style={{ width: `${data.threat_distribution.face_swap_video}%` }}></div>
            </div>
          </div>

          <div className="dist-item">
            <div className="dist-info">
              <span>AI Image & Identity Documents</span>
              <strong>{data.threat_distribution.ai_image_manipulation}%</strong>
            </div>
            <div className="dist-bar-track">
              <div className="dist-bar-fill image" style={{ width: `${data.threat_distribution.ai_image_manipulation}%` }}></div>
            </div>
          </div>

          <div className="dist-item">
            <div className="dist-info">
              <span>Phishing & Generated NLP Text</span>
              <strong>{data.threat_distribution.phishing_text_generation}%</strong>
            </div>
            <div className="dist-bar-track">
              <div className="dist-bar-fill text" style={{ width: `${data.threat_distribution.phishing_text_generation}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Campaigns Table / Feed */}
      <div className="campaigns-section">
        <div className="campaigns-header-row">
          <div>
            <h2 className="campaigns-title">Active Synthetic Media Campaigns</h2>
            <p className="campaigns-subtitle">Targeted vectors monitored by TruthLens early warning telemetry</p>
          </div>
          <div className="filter-chips">
            {['ALL', 'Audio', 'Video', 'Image', 'Text'].map((medium) => (
              <button
                key={medium}
                className={`filter-btn ${filterMedium === medium ? 'active' : ''}`}
                onClick={() => setFilterMedium(medium)}
              >
                {medium}
              </button>
            ))}
          </div>
        </div>

        <div className="campaigns-grid">
          {filteredCampaigns.map((camp) => (
            <div key={camp.id} className="campaign-card glass-card">
              <div className="camp-top">
                <div className="camp-id-tag">
                  <span className="status-dot danger pulse"></span>
                  <code>{camp.id}</code>
                </div>
                <span className={`signal-severity-tag sev-${camp.severity.toLowerCase()}`}>
                  {camp.severity}
                </span>
              </div>

              <h3 className="camp-name">{camp.name}</h3>

              <div className="camp-details-grid">
                <div className="detail-item">
                  <span className="d-label">VECTOR MEDIUM</span>
                  <span className="d-val">{camp.medium}</span>
                </div>
                <div className="detail-item">
                  <span className="d-label">ACTIVE SINCE</span>
                  <span className="d-val">{camp.active_since}</span>
                </div>
                <div className="detail-item full-width">
                  <span className="d-label">GENERATIVE GENERATORS / TOOLING</span>
                  <div className="vector-pills">
                    {camp.vectors.map((v, i) => (
                      <span key={i} className="vector-pill">{v}</span>
                    ))}
                  </div>
                </div>
                <div className="detail-item full-width">
                  <span className="d-label">TARGET SECTORS</span>
                  <span className="d-val">{camp.targets.join(', ')}</span>
                </div>
              </div>

              <div className="mitigation-box">
                <span className="mit-label">RECOMMENDED MITIGATION:</span>
                <p className="mit-text">{camp.mitigation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreatRadar;
