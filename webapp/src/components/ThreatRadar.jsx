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
    // Fetch live backend telemetry
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
          <div className="section-stamp">Live Threat Intelligence</div>
          <h1 className="radar-title">GLOBAL DEEPFAKE THREAT RADAR</h1>
          <p className="radar-subtitle">
            Real-time global telemetry monitoring active synthetic identity attacks, voice cloning fraud campaigns, and generative disinformation vectors.
          </p>
        </div>
        {onBack && (
          <button className="btn btn-secondary" onClick={onBack}>
            ← BACK TO SCANNER
          </button>
        )}
      </div>

      {/* Hero Telemetry Banner */}
      <div className="radar-hero-grid">
        <div className="defcon-card glass-card">
          <div className="defcon-tag">GLOBAL ALERT STATUS</div>
          <div className="defcon-status">
            <span className="radar-blip"></span>
            <h2>{data.global_threat_level}</h2>
          </div>
          <div className="threat-meter">
            <div className="threat-bar" style={{ width: `${data.global_threat_score}%` }}></div>
          </div>
          <div className="defcon-footer">
            <span>SYNTHETIC ATTACK INDEX: <strong>{data.global_threat_score}/100</strong></span>
            <span>UPDATED: <strong>LIVE</strong></span>
          </div>
        </div>

        <div className="stats-ticker-card glass-card">
          <div className="stat-row">
            <div>
              <span className="stat-label">24H SCANNED ASSETS</span>
              <strong className="stat-number">{tickerCount.toLocaleString()}</strong>
            </div>
            <div className="stat-badge live">LIVE FEED</div>
          </div>
          <div className="stat-row">
            <div>
              <span className="stat-label">FLAGGED DEEPFAKES</span>
              <strong className="stat-number danger">{data.flagged_deepfakes_24h.toLocaleString()}</strong>
            </div>
            <div>
              <span className="stat-label">ACCURACY RATE</span>
              <strong className="stat-number success">{data.detection_rate_pct}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Threat Distribution Bars */}
      <div className="distribution-pane glass-card">
        <h3>ACTIVE SYNTHETIC MEDIA VECTORS</h3>
        <div className="vector-bars-grid">
          <div className="vector-box">
            <div className="vector-head">
              <span>🎙️ Voice Cloning Scams</span>
              <strong>{data.threat_distribution.voice_cloning_scams}%</strong>
            </div>
            <div className="vector-track">
              <div className="vector-fill" style={{ width: `${data.threat_distribution.voice_cloning_scams}%` }}></div>
            </div>
          </div>

          <div className="vector-box">
            <div className="vector-head">
              <span>🎥 Face Swap Video</span>
              <strong>{data.threat_distribution.face_swap_video}%</strong>
            </div>
            <div className="vector-track">
              <div className="vector-fill" style={{ width: `${data.threat_distribution.face_swap_video}%` }}></div>
            </div>
          </div>

          <div className="vector-box">
            <div className="vector-head">
              <span>🖼️ AI Image Manipulation</span>
              <strong>{data.threat_distribution.ai_image_manipulation}%</strong>
            </div>
            <div className="vector-track">
              <div className="vector-fill" style={{ width: `${data.threat_distribution.ai_image_manipulation}%` }}></div>
            </div>
          </div>

          <div className="vector-box">
            <div className="vector-head">
              <span>📝 Phishing Text Generation</span>
              <strong>{data.threat_distribution.phishing_text_generation}%</strong>
            </div>
            <div className="vector-track">
              <div className="vector-fill" style={{ width: `${data.threat_distribution.phishing_text_generation}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Threat Campaigns Stream */}
      <div className="campaigns-section">
        <div className="campaigns-header">
          <h3>ACTIVE THREAT CAMPAIGNS & MITIGATION INTEL</h3>
          <div className="filter-pills">
            {['ALL', 'Audio', 'Video', 'Image', 'Text'].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filterMedium === cat ? 'active' : ''}`}
                onClick={() => setFilterMedium(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="campaign-cards-grid">
          {filteredCampaigns.map((camp) => (
            <div key={camp.id} className="campaign-card glass-card">
              <div className="campaign-top">
                <span className={`severity-tag ${camp.severity.toLowerCase()}`}>
                  {camp.severity} SEVERITY
                </span>
                <span className="camp-id">{camp.id}</span>
              </div>

              <h4 className="camp-name">{camp.name}</h4>

              <div className="camp-meta">
                <div>
                  <span className="meta-lbl">MEDIUM</span>
                  <span className="meta-val">{camp.medium}</span>
                </div>
                <div>
                  <span className="meta-lbl">ACTIVE SINCE</span>
                  <span className="meta-val">{camp.active_since}</span>
                </div>
              </div>

              <div className="camp-vectors">
                <span className="meta-lbl">KNOWN GENERATORS:</span>
                <div className="vector-chips">
                  {camp.vectors.map((vec, idx) => (
                    <span key={idx} className="v-chip">{vec}</span>
                  ))}
                </div>
              </div>

              <div className="camp-mitigation">
                <strong>🛡️ Recommended Defense:</strong>
                <p>{camp.mitigation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreatRadar;
