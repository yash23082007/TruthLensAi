import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-section container animate-fade-in">
      <div className="about-header centered">
        <div className="section-tag">System Specifications</div>
        <h1 className="section-main-title">Multi-Signal Forensic Architecture</h1>
        <p className="section-main-desc">
          TruthLens AI combines computer vision, acoustic forensics, natural language processing, and real-time retrieval-augmented generation (RAG) to detect synthetic media vectors.
        </p>
      </div>

      <div className="technical-grid">
        {/* Pipeline 1: Text */}
        <div className="glass-card tech-card">
          <div className="tech-icon-header">
            <div className="tech-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" x2="8" y1="13" y2="13"/>
                <line x1="16" x2="8" y1="17" y2="17"/>
              </svg>
            </div>
            <h3>Text & NLP Verification Pipeline</h3>
          </div>
          <p className="tech-summary">
            Audits text payloads for synthetic formulaic patterns and social engineering tactics.
          </p>
          <ul className="tech-features">
            <li>
              <strong>Perplexity & Lexical Burstiness</strong>: Evaluates sentence length coefficient of variation and token cluster distribution to separate LLM output from organic writing.
            </li>
            <li>
              <strong>Phishing & Social Engineering Heuristics</strong>: Flags high-pressure urgency patterns, fake credential gateways, and suspicious URI redirects.
            </li>
            <li>
              <strong>Real-Time Wikipedia Consensus RAG</strong>: Extracts verifiable empirical claims and queries encyclopedia APIs live to cross-examine factual consensus.
            </li>
          </ul>
        </div>

        {/* Pipeline 2: Image */}
        <div className="glass-card tech-card">
          <div className="tech-icon-header">
            <div className="tech-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
            </div>
            <h3>Visual & Image Forensics Pipeline</h3>
          </div>
          <p className="tech-summary">
            Audits pixel-level error residuals, frequency transforms, and camera sensor noise.
          </p>
          <ul className="tech-features">
            <li>
              <strong>Error Level Analysis (ELA)</strong>: Re-compresses JPEG matrices to expose quantization mismatches caused by localized pixel editing or diffusion inpainting.
            </li>
            <li>
              <strong>DCT Frequency Domain Transforms</strong>: Computes 2D discrete cosine transforms to isolate checkerboard power spectrum spikes from generative upsamplers.
            </li>
            <li>
              <strong>PRNU Sensor & EXIF Audit</strong>: Verifies Photo-Response Non-Uniformity silicon noise floors and scans binary headers for generator signatures.
            </li>
          </ul>
        </div>

        {/* Pipeline 3: Audio */}
        <div className="glass-card tech-card">
          <div className="tech-icon-header">
            <div className="tech-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </div>
            <h3>Acoustic & Voice Clone Pipeline</h3>
          </div>
          <p className="tech-summary">
            Differentiates human vocal tract chaos from algorithmic neural speech synthesis.
          </p>
          <ul className="tech-features">
            <li>
              <strong>MFCC Spectral Analysis</strong>: Analyzes Mel-Frequency Cepstral Coefficients via Librosa to detect robotic formant transitions and spectral flattening.
            </li>
            <li>
              <strong>Pitch Jitter & Harmonics</strong>: Measures micro-variations in fundamental frequency (F0) that neural voice clones fail to naturally replicate.
            </li>
            <li>
              <strong>Silence Cadence Inspection</strong>: Flags unnatural mathematically uniform pauses indicative of synthetic audio stitching.
            </li>
          </ul>
        </div>

        {/* Pipeline 4: Video */}
        <div className="glass-card tech-card">
          <div className="tech-icon-header">
            <div className="tech-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m22 8-6 4 6 4V8Z"/>
                <rect width="14" height="12" x="2" y="6" rx="2"/>
              </svg>
            </div>
            <h3>Video Deepfake Pipeline</h3>
          </div>
          <p className="tech-summary">
            Performs multi-frame temporal evaluations and container integrity audits.
          </p>
          <ul className="tech-features">
            <li>
              <strong>Dynamic Temporal Sampling</strong>: Samples key frames using OpenCV without incurring excessive server processing latency.
            </li>
            <li>
              <strong>Facial Boundary Jitter Tracking</strong>: Identifies micro-blur along face swap seams and tracks landmark alignment stability during head rotation.
            </li>
            <li>
              <strong>Container & Atom Auditing</strong>: Detects multi-generation re-encoding anomalies and duplicate metadata header blocks (`moov` atoms).
            </li>
          </ul>
        </div>
      </div>

      {/* Unified Scoring Engine Box */}
      <div className="glass-card trust-engine-card">
        <div className="trust-engine-header">
          <div className="tech-icon-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <div>
            <h3>Unified Trust Score & Risk Engine</h3>
            <p>Mathematical aggregation of individual forensic finding confidence scores</p>
          </div>
        </div>
        
        <div className="bento-inner-grid">
          <div className="inner-col">
            <h4>Vector Weights</h4>
            <ul className="engine-weights">
              <li><span>Deepfake Detection</span> <strong className="weight-val">30%</strong></li>
              <li><span>AI Image Generation</span> <strong className="weight-val">25%</strong></li>
              <li><span>Pixel Manipulation</span> <strong className="weight-val">20%</strong></li>
              <li><span>Scam / Phishing NLP</span> <strong className="weight-val">15%</strong></li>
              <li><span>Claim Verification</span> <strong className="weight-val">10%</strong></li>
            </ul>
          </div>
          
          <div className="inner-col">
            <h4>Severity Calibration</h4>
            <div className="severity-bar">
              <span className="sev-tag low">LOW (0.05x)</span>
              <span className="sev-tag med">MEDIUM (0.40x)</span>
              <span className="sev-tag high">HIGH (0.80x)</span>
              <span className="sev-tag crit">CRITICAL (1.00x)</span>
            </div>
            <div className="formula-box">
              <code>Category Risk = max(confidence * severity_multiplier)</code>
              <code>Trust Score = Sum(Category Risk * Weight) * 100</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
