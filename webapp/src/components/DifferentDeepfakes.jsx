import React, { useState } from 'react';
import './DifferentDeepfakes.css';

const SAMPLES = [
  {
    id: 1,
    title: "AI Generated Profile Portrait",
    percentage: "94%",
    type: "AI DETECTED",
    risk: "danger",
    image: "/images/sample_social.jpg",
    label: "Diffusion Synthesis",
    description: "Synthetic portrait showing characteristic DCT radial frequency spikes and bilateral eye reflection asymmetry."
  },
  {
    id: 2,
    title: "Pixel Cloned Event Photo",
    percentage: "87%",
    type: "SPLICED",
    risk: "warning",
    image: "/images/sample_parade.jpg",
    label: "Error Level Discontinuity",
    description: "Cloned crowd regions identified via localized JPEG quantization table mismatches."
  },
  {
    id: 3,
    title: "Authentic Banking Document",
    percentage: "96%",
    type: "AUTHENTIC",
    risk: "success",
    image: "/images/sample_finance.jpg",
    label: "Hardware Scan",
    description: "Intact physical scanner raster lines and uniform compression quantization tables across all zones."
  },
  {
    id: 4,
    title: "Real-Time Video Face Filter",
    percentage: "91%",
    type: "DEEPFAKE",
    risk: "danger",
    image: "/images/sample_videocall.jpg",
    label: "Temporal Landmark Jitter",
    description: "Real-time autoencoder face filter flagged by boundary blur during rapid head rotations."
  },
  {
    id: 5,
    title: "DSLR Editorial News Photo",
    percentage: "98%",
    type: "AUTHENTIC",
    risk: "success",
    image: "/images/sample_news.jpg",
    label: "PRNU Sensor Match",
    description: "Original camera sensor noise fingerprint present with intact unedited EXIF exposure parameters."
  },
  {
    id: 6,
    title: "Neural Voice Phishing Call",
    percentage: "95%",
    type: "VOICE CLONE",
    risk: "danger",
    image: "/images/sample_scamcall.jpg",
    label: "Acoustic MFCC Flattener",
    description: "Synthetic text-to-speech clone exhibiting mathematically uniform pitch jitter and robotic silence intervals."
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
      <div className="section-header-block">
        <div className="section-tag">Case Evidence</div>
        <h2 className="section-main-title">Forensic Detection in Practice</h2>
        <p className="section-main-desc">
          Compare how our multi-vector neural ensemble detects synthetic generation, localized pixel splicing, and cloned voice notes across diverse file types.
        </p>
      </div>

      <div className="carousel-wrapper">
        <button className="carousel-arrow prev" onClick={handlePrev} aria-label="Previous samples">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>

        <div className="carousel-grid">
          {SAMPLES.slice(startIndex, startIndex + 3).map((item) => (
            <div key={item.id} className="sample-card-rich glass-card animate-fade-in">
              <div className="sample-img-box">
                <img src={item.image} alt={item.title} className="sample-cover-img" />
                <div className="sample-img-overlay">
                  <span className={`risk-badge-tag risk-${item.risk}`}>
                    <span className="status-dot"></span>
                    {item.percentage} {item.type}
                  </span>
                </div>
              </div>

              <div className="sample-content-box">
                <div className="sample-label-text">{item.label}</div>
                <h3 className="sample-title">{item.title}</h3>
                <p className="sample-desc-text">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-arrow next" onClick={handleNext} aria-label="Next samples">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>

      <div className="carousel-dots">
        <button 
          className={`dot ${startIndex === 0 ? 'active' : ''}`}
          onClick={() => setStartIndex(0)}
          aria-label="Slide group 1"
        ></button>
        <button 
          className={`dot ${startIndex === 3 ? 'active' : ''}`}
          onClick={() => setStartIndex(3)}
          aria-label="Slide group 2"
        ></button>
      </div>
    </section>
  );
};

export default DifferentDeepfakes;
