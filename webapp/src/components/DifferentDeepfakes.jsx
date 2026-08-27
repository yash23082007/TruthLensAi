import React, { useState } from 'react';
import './DifferentDeepfakes.css';

const SAMPLES = [
  {
    id: 1,
    title: "Social Media Profile",
    percentage: "89%",
    type: "Deepfake",
    risk: "critical",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    label: "GAN Profile Swap Detected",
    description: "AI-generated avatar mimicking a real user identity. Shows ultra-smooth skin texture and eye gaze misalignment.",
    signals: "ELA mismatch σ=138.4 • Specular pupil reflection asymmetry"
  },
  {
    id: 2,
    title: "Parade & Crowd Photos",
    percentage: "45%",
    type: "Manipulated",
    risk: "warning",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80",
    label: "Cloned Background Splicing",
    description: "Edited photograph with repeated crowd tiles cloned to artificially exaggerate public event attendance.",
    signals: "Repeated pixel block hash correlation • Inconsistent ambient lighting"
  },
  {
    id: 3,
    title: "Financial Documents",
    percentage: "31%",
    type: "Low Risk",
    risk: "success",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
    label: "Clean Signature Scan",
    description: "Scanned official PDF showing authentic compression quantization and consistent bank font baselines.",
    signals: "Uniform 8x8 DCT quantization • Anti-counterfeit raster verified"
  },
  {
    id: 4,
    title: "Video Calls & Zoom Swaps",
    percentage: "67%",
    type: "High Risk",
    risk: "critical",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    label: "Lip-Sync & Jitter Anomaly",
    description: "Real-time face-swap model operating in a video conference. Displays boundary edge blur on head turns.",
    signals: "Laplacian edge discontinuity • Temporal lighting jitter across frames"
  },
  {
    id: 5,
    title: "News Broadcast Footage",
    percentage: "15%",
    type: "Authentic",
    risk: "success",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80",
    label: "Original EXIF Lineage Intact",
    description: "Verified news media graphic with cryptographic camera signatures and untouched sensor noise floor.",
    signals: "PRNU sensor noise match • C2PA hardware manifest valid"
  },
  {
    id: 6,
    title: "Scam Phone Calls",
    percentage: "94%",
    type: "Deepfake",
    risk: "critical",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    label: "Cloned Neural Speech",
    description: "Synthesized executive voice clone demanding urgent wire transfers. Displays flat pitch contour and zero-noise pauses.",
    signals: "Robotic formant transition • Unnatural pitch variance (σ=0.4 Hz)"
  }
];

const DifferentDeepfakes = ({ onSelectTool }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 3 >= SAMPLES.length ? 0 : prev + 3));
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 3 < 0 ? SAMPLES.length - 3 : prev - 3));
  };

  return (
    <section className="different-deepfakes-section container">
      <div className="features-header left-aligned-section">
        <div className="section-stamp">Multimodal Forensics Showcase</div>
        <h2 className="section-main-title">DIFFERENT DEEPFAKE DETECTION SCENARIOS</h2>
        <p className="section-main-desc">
          From social media bot detection to viral video debunking and phone scam audits, see how TruthLens identifies synthetic manipulation across all digital mediums.
        </p>
      </div>

      <div className="carousel-wrapper">
        <button className="carousel-arrow prev" onClick={handlePrev} aria-label="Previous samples">
          ◀
        </button>

        <div className="carousel-grid">
          {SAMPLES.slice(startIndex, startIndex + 3).map((item) => (
            <div key={item.id} className="sample-card-rich glass-card animate-fade-in">
              <div className="sample-img-box">
                <img src={item.image} alt={item.title} className="sample-cover-img" />
                <div className="sample-img-overlay">
                  <span className={`risk-badge-tag ${item.risk}`}>
                    {item.percentage} {item.type.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="sample-content-box">
                <h3>{item.title}</h3>
                <div className="sample-label-text">{item.label}</div>
                <p className="sample-desc-text">{item.description}</p>
                <div className="sample-signals-strip">
                  <strong>⚡ Evidence:</strong> {item.signals}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-arrow next" onClick={handleNext} aria-label="Next samples">
          ▶
        </button>
      </div>

      <div className="carousel-dots">
        <button 
          className={`dot ${startIndex === 0 ? 'active' : ''}`}
          onClick={() => setStartIndex(0)}
        ></button>
        <button 
          className={`dot ${startIndex === 3 ? 'active' : ''}`}
          onClick={() => setStartIndex(3)}
        ></button>
      </div>
    </section>
  );
};

export default DifferentDeepfakes;
