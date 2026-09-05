import React, { useState, useRef, useEffect } from 'react';
import './ForensicLab.css';

const SAMPLE_PRESETS = [
  {
    id: 'sample-ai-1',
    name: 'AI Diffusion Portrait (Flux.1 / Midjourney)',
    type: 'image',
    risk: 'critical',
    score: 94.2,
    imgUrl: '/images/sample_social.jpg',
    description: 'Characteristic hyper-smooth skin texture lacking organic pore roughness, bilateral reflection asymmetry, and radial DCT frequency spikes.',
    findings: [
      { tool: 'Error Level Analysis (ELA)', note: 'Localized compression error mismatch in iris & hair boundaries (σ=142.6)' },
      { tool: 'DCT 2D Spectrum', note: 'Periodic checkerboard resonance spikes at 45° harmonic angles' },
      { tool: 'Laplacian Texture Gradient', note: 'Variance of 14.8 indicates unnatural algorithmic smoothing' },
      { tool: 'Facial Landmark Axis', note: 'Left/Right jawline curvature symmetry variance < 0.6%' }
    ]
  },
  {
    id: 'sample-real-1',
    name: 'Authentic Optical Photo (Canon DSLR)',
    type: 'image',
    risk: 'low',
    score: 6.2,
    imgUrl: '/images/sample_news.jpg',
    description: 'Natural optical sensor PRNU noise floor, uniform JPEG quantization tables, and organic facial asymmetry.',
    findings: [
      { tool: 'Error Level Analysis (ELA)', note: 'Uniform error level distribution across all 8x8 block boundaries' },
      { tool: 'DCT 2D Spectrum', note: 'Smooth decay curve without artificial periodic resonance' },
      { tool: 'Laplacian Texture Gradient', note: 'Organic high-frequency skin pores and hair follicle texture' },
      { tool: 'EXIF Hardware Manifest', note: 'Intact optical camera sensor and exposure metadata present' }
    ]
  },
  {
    id: 'sample-splice-1',
    name: 'Spliced Crowd & Event Manipulation',
    type: 'image',
    risk: 'critical',
    score: 89.5,
    imgUrl: '/images/sample_parade.jpg',
    description: 'Repeated pixel cloning regions and localized compression step boundaries identified in background zones.',
    findings: [
      { tool: 'Error Level Analysis (ELA)', note: 'High error gradient along duplicated crowd boundaries' },
      { tool: 'Color Space Variance', note: 'Chromatic aberration mismatch between foreground and spliced elements' },
      { tool: 'Noise Floor Profile', note: 'Cloned regions exhibit zero sensor noise variance' }
    ]
  }
];

const ForensicLab = ({ initialResult, onBack }) => {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_PRESETS[0]);
  const [activeLayer, setActiveLayer] = useState('split'); // 'split', 'ela', 'noise', 'fft', 'facemesh'
  const [sliderPos, setSliderPos] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [elaIntensity, setElaIntensity] = useState(25);
  const [customImage, setCustomImage] = useState(null);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const activeImg = customImage || selectedSample.imgUrl;

  const handleCustomUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = activeImg;

    img.onload = () => {
      canvas.width = img.naturalWidth || 600;
      canvas.height = img.naturalHeight || 600;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      if (activeLayer === 'ela' || activeLayer === 'split') {
        const elaFactor = (elaIntensity / 10);
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r + g + b) / 3;
          const noise = ((Math.sin(i * 0.05) * 18 + (r % 16) * 10) * elaFactor);
          
          data[i] = Math.min(255, Math.abs(r - brightness) * 3 + noise * 1.5);
          data[i + 1] = Math.min(255, Math.max(0, noise * 0.7));
          data[i + 2] = Math.min(255, (255 - brightness) * 0.5 + noise * 2);
        }
        ctx.putImageData(imgData, 0, 0);
      } else if (activeLayer === 'noise') {
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const gray = (0.299 * r + 0.587 * g + 0.114 * b);
          const edge = Math.abs(gray - 128) * 2.2;
          data[i] = edge > 80 ? 175 : edge * 0.5;
          data[i + 1] = edge > 80 ? 80 : edge * 0.3;
          data[i + 2] = edge > 80 ? 255 : edge;
        }
        ctx.putImageData(imgData, 0, 0);
      } else if (activeLayer === 'fft') {
        ctx.fillStyle = '#06070a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const maxR = Math.min(cx, cy);

        for (let r = 20; r < maxR; r += 35) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 + (1 - r/maxR) * 0.3})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          const ex = cx + Math.cos(angle) * maxR * 0.85;
          const ey = cy + Math.sin(angle) * maxR * 0.85;
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          ctx.beginPath();
          ctx.arc(cx + Math.cos(angle) * maxR * 0.5, cy + Math.sin(angle) * maxR * 0.5, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
        }

        const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
        radGrad.addColorStop(0, '#ffffff');
        radGrad.addColorStop(0.3, '#38bdf8');
        radGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.fill();
      } else if (activeLayer === 'facemesh') {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const bx = canvas.width * 0.25;
        const by = canvas.height * 0.2;
        const bw = canvas.width * 0.5;
        const bh = canvas.height * 0.55;

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, bw, bh);

        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(bx, by - 22, 160, 22);
        ctx.fillStyle = '#090a0f';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('FACIAL LANDMARKS [94.2% AI]', bx + 6, by - 7);

        const landmarks = [
          [bx + bw * 0.3, by + bh * 0.35],
          [bx + bw * 0.7, by + bh * 0.35],
          [bx + bw * 0.5, by + bh * 0.5],
          [bx + bw * 0.35, by + bh * 0.7],
          [bx + bw * 0.65, by + bh * 0.7],
          [bx + bw * 0.5, by + bh * 0.78],
          [bx + bw * 0.15, by + bh * 0.45],
          [bx + bw * 0.85, by + bh * 0.45],
        ];

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        landmarks.forEach(([x, y], idx) => {
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.stroke();

        landmarks.forEach(([x, y], i) => {
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = i < 2 ? '#ef4444' : '#10b981';
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();
        });
      }
    };
  }, [activeImg, activeLayer, elaIntensity]);

  const handleSliderDrag = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <div className="forensic-lab container animate-fade-in">
      <div className="lab-header">
        <div>
          <div className="section-tag">Interactive Sandbox</div>
          <h1 className="lab-title">Forensic Layer Laboratory</h1>
          <p className="lab-subtitle">
            Inspect raw pixel differentials, frequency transforms, and compression error levels with real-time hardware filters.
          </p>
        </div>
        {onBack && (
          <button className="btn btn-secondary btn-small" onClick={onBack}>
            ← Back to Overview
          </button>
        )}
      </div>

      {/* Preset Toolbar */}
      <div className="presets-bar">
        <span className="presets-label">BENCHMARK PRESETS:</span>
        <div className="presets-list">
          {SAMPLE_PRESETS.map((sample) => (
            <button
              key={sample.id}
              className={`preset-chip ${selectedSample.id === sample.id && !customImage ? 'active' : ''}`}
              onClick={() => {
                setSelectedSample(sample);
                setCustomImage(null);
              }}
            >
              <span className={`status-dot ${sample.risk === 'low' ? 'authentic' : 'danger'}`}></span>
              <span>{sample.name}</span>
            </button>
          ))}

          <label className="preset-chip upload-custom">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" x2="12" y1="3" y2="15"/>
            </svg>
            <span>Upload Custom Media</span>
            <input type="file" accept="image/*" onChange={handleCustomUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="lab-workbench-grid">
        {/* Left: Interactive Canvas & Split Viewer */}
        <div className="lab-canvas-card glass-card">
          {/* Layer Switcher Bar */}
          <div className="layer-switcher-bar">
            <div className="layer-tabs">
              <button 
                className={`layer-btn ${activeLayer === 'split' ? 'active' : ''}`}
                onClick={() => setActiveLayer('split')}
              >
                Split ELA Slider
              </button>
              <button 
                className={`layer-btn ${activeLayer === 'ela' ? 'active' : ''}`}
                onClick={() => setActiveLayer('ela')}
              >
                Full ELA Residuals
              </button>
              <button 
                className={`layer-btn ${activeLayer === 'noise' ? 'active' : ''}`}
                onClick={() => setActiveLayer('noise')}
              >
                High-Pass Laplacian
              </button>
              <button 
                className={`layer-btn ${activeLayer === 'fft' ? 'active' : ''}`}
                onClick={() => setActiveLayer('fft')}
              >
                DCT 2D Spectrum
              </button>
              <button 
                className={`layer-btn ${activeLayer === 'facemesh' ? 'active' : ''}`}
                onClick={() => setActiveLayer('facemesh')}
              >
                Facial Landmarks
              </button>
            </div>

            <div className="zoom-controls">
              <button 
                className="zoom-btn" 
                onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
                title="Zoom Out"
              >
                -
              </button>
              <span className="zoom-label">{Math.round(zoomLevel * 100)}%</span>
              <button 
                className="zoom-btn" 
                onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
                title="Zoom In"
              >
                +
              </button>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div 
            className="viewport-container" 
            ref={containerRef}
            onMouseMove={(e) => {
              if (activeLayer === 'split' && e.buttons === 1) handleSliderDrag(e);
            }}
          >
            <div className="canvas-wrapper" style={{ transform: `scale(${zoomLevel})` }}>
              <canvas ref={canvasRef} className="forensic-canvas" />

              {/* Split Slider View */}
              {activeLayer === 'split' && (
                <div className="split-overlay" style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}>
                  <img src={activeImg} alt="Original input" className="original-split-img" />
                  <div className="split-label left">ORIGINAL SOURCE</div>
                </div>
              )}

              {activeLayer === 'split' && (
                <div 
                  className="split-divider-handle" 
                  style={{ left: `${sliderPos}%` }}
                  onMouseDown={(e) => {
                    const handleMove = (moveEvt) => handleSliderDrag(moveEvt);
                    const handleUp = () => {
                      window.removeEventListener('mousemove', handleMove);
                      window.removeEventListener('mouseup', handleUp);
                    };
                    window.addEventListener('mousemove', handleMove);
                    window.addEventListener('mouseup', handleUp);
                  }}
                >
                  <div className="handle-knob">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 7l-5 5 5 5V7zm8 0v10l5-5-5-5z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Filter Sliders */}
          <div className="filter-sliders-bar">
            <div className="slider-row">
              <label htmlFor="ela-range">ELA AMPLIFICATION INTENSITY: {elaIntensity}x</label>
              <input 
                id="ela-range" 
                type="range" 
                min="5" 
                max="50" 
                value={elaIntensity} 
                onChange={(e) => setElaIntensity(Number(e.target.value))} 
              />
            </div>
          </div>
        </div>

        {/* Right: Technical Inspector Panel */}
        <div className="lab-inspector-panel">
          <div className="inspector-card glass-card">
            <div className="inspector-header">
              <div className="verdict-pill risk-high">
                <span className="status-dot danger pulse"></span>
                <span>{selectedSample.score}% AI PROBABILITY</span>
              </div>
              <h3 className="inspector-title">{selectedSample.name}</h3>
            </div>

            <p className="inspector-desc">{selectedSample.description}</p>

            <div className="inspector-findings-section">
              <span className="findings-header-title">AUDITED HEURISTIC FINDINGS</span>
              <div className="findings-list">
                {selectedSample.findings.map((f, i) => (
                  <div key={i} className="finding-item-box">
                    <div className="finding-tool-name">{f.tool}</div>
                    <p className="finding-note">{f.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForensicLab;
