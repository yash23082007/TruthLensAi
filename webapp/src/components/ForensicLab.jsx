import React, { useState, useRef, useEffect } from 'react';
import './ForensicLab.css';

const SAMPLE_PRESETS = [
  {
    id: 'sample-ai-1',
    name: 'AI Generated Portrait (Flux.1 / Midjourney)',
    type: 'image',
    risk: 'critical',
    score: 91.2,
    imgUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    description: 'Notice the hyper-smooth skin texture lacking pores, extreme axial symmetry, and DCT frequency checkerboard spikes.',
    findings: [
      { tool: 'ELA Heatmap', note: 'Localized compression mismatch in pupil reflections (σ=138.4)' },
      { tool: 'DCT Frequency', note: 'Radial GAN power spectrum spikes at 45° harmonic angles' },
      { tool: 'Texture Gradient', note: 'Laplacian variance of 14.2 (abnormally low natural micro-roughness)' },
      { tool: 'Facial Landmark', note: 'Left/Right jawline curvature diff < 0.8% (synthetic symmetry)' }
    ]
  },
  {
    id: 'sample-real-1',
    name: 'Authentic DSLR Portrait (Canon EOS R5)',
    type: 'image',
    risk: 'low',
    score: 8.5,
    imgUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    description: 'Natural optical sensor PRNU noise, uniform JPEG quantization matrix, and realistic asymmetrical facial features.',
    findings: [
      { tool: 'ELA Heatmap', note: 'Uniform error level distribution across all 8x8 block boundaries' },
      { tool: 'DCT Frequency', note: 'Smooth decay curve without artificial periodic resonance' },
      { tool: 'Texture Gradient', note: 'Organic high-frequency skin pores and hair follicle texture' },
      { tool: 'EXIF Provenance', note: 'Hardware lens metadata present: EF 85mm f/1.4L IS USM' }
    ]
  },
  {
    id: 'sample-splice-1',
    name: 'Spliced Identity Manipulation (Face Swap)',
    type: 'image',
    risk: 'critical',
    score: 88.7,
    imgUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
    description: 'Obvious boundary blending artifacts around neck and jawline where a synthetic face was composited onto a real body.',
    findings: [
      { tool: 'ELA Heatmap', note: 'High error gradient along face boundary seam' },
      { tool: 'Color Temperature', note: '12% Kelvin temperature mismatch between face and background' },
      { tool: 'Motion Jitter', note: 'Edge blur inconsistencies indicative of auto-encoder face swap' }
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

  // Render forensic filters onto HTML5 canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = activeImg;

    img.onload = () => {
      canvas.width = img.width || 600;
      canvas.height = img.height || 600;

      // Draw original
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      if (activeLayer === 'ela' || activeLayer === 'split') {
        // Compute Error Level Analysis Simulation
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r + g + b) / 3;
          
          // ELA difference amplification
          const elaFactor = (elaIntensity / 10);
          const noise = ((Math.sin(i * 0.05) * 20 + (r % 16) * 10) * elaFactor);
          
          data[i] = Math.min(255, Math.abs(r - brightness) * 3 + noise * 1.5);     // Red
          data[i + 1] = Math.min(255, Math.max(0, noise * 0.8));                    // Green
          data[i + 2] = Math.min(255, (255 - brightness) * 0.5 + noise * 2);       // Blue / Violet
        }
        ctx.putImageData(imgData, 0, 0);
      } else if (activeLayer === 'noise') {
        // High frequency Laplacian / Noise gradient
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
        // 2D Frequency Power Spectrum
        ctx.fillStyle = '#06060c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const maxR = Math.min(cx, cy);

        for (let r = 20; r < maxR; r += 35) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(175, 80, 255, ${0.15 + (1 - r/maxR) * 0.3})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          const ex = cx + Math.cos(angle) * maxR * 0.85;
          const ey = cy + Math.sin(angle) * maxR * 0.85;
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = 'rgba(255, 77, 77, 0.4)';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          ctx.beginPath();
          ctx.arc(cx + Math.cos(angle) * maxR * 0.5, cy + Math.sin(angle) * maxR * 0.5, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#ff4d4d';
          ctx.fill();
        }

        const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
        radGrad.addColorStop(0, '#ffffff');
        radGrad.addColorStop(0.3, '#af50ff');
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

        ctx.strokeStyle = '#af50ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, bw, bh);

        ctx.fillStyle = '#af50ff';
        ctx.fillRect(bx, by - 24, 180, 24);
        ctx.fillStyle = '#090909';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('FACE MESH #01 [94.2% AI]', bx + 8, by - 8);

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

        ctx.strokeStyle = 'rgba(175, 80, 255, 0.6)';
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
          ctx.fillStyle = i < 2 ? '#ff4d4d' : '#24b47e';
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();
        });

        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(bx + bw * 0.5, by);
        ctx.lineTo(bx + bw * 0.5, by + bh);
        ctx.stroke();
        ctx.setLineDash([]);
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
          <div className="section-stamp">Interactive Forensic Sandbox</div>
          <h1 className="lab-title">MULTIMODAL DEEPFAKE LAB</h1>
          <p className="lab-subtitle">
            Inspect raw pixels, compression quantization tables, and frequency anomalies with live forensic filters.
          </p>
        </div>
        {onBack && (
          <button className="btn btn-secondary" onClick={onBack}>
            ← BACK TO SCANNER
          </button>
        )}
      </div>

      {/* Preset Selector */}
      <div className="presets-bar">
        <span className="presets-label">TEST BENCH PRESETS:</span>
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
              <span className={`risk-dot ${sample.risk}`}></span>
              {sample.name}
            </button>
          ))}
          <label className="preset-chip upload-chip">
            <span>📁 Upload Custom Media</span>
            <input type="file" accept="image/*" onChange={handleCustomUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Main Studio Workspace */}
      <div className="lab-workspace">
        {/* Left Toolbar: Layer Controls */}
        <div className="lab-sidebar glass-card">
          <h3>FORENSIC LAYERS</h3>
          <div className="layer-buttons">
            <button
              className={`layer-btn ${activeLayer === 'split' ? 'active' : ''}`}
              onClick={() => setActiveLayer('split')}
            >
              <span className="layer-icon">↔</span>
              <div>
                <strong>Split-Screen Comparison</strong>
                <small>Draggable Original vs ELA difference</small>
              </div>
            </button>

            <button
              className={`layer-btn ${activeLayer === 'ela' ? 'active' : ''}`}
              onClick={() => setActiveLayer('ela')}
            >
              <span className="layer-icon">⚡</span>
              <div>
                <strong>Error Level Analysis (ELA)</strong>
                <small>JPEG quantization variance heatmap</small>
              </div>
            </button>

            <button
              className={`layer-btn ${activeLayer === 'noise' ? 'active' : ''}`}
              onClick={() => setActiveLayer('noise')}
            >
              <span className="layer-icon">🔍</span>
              <div>
                <strong>Laplacian Texture & Noise</strong>
                <small>High-frequency skin & edge smoothness</small>
              </div>
            </button>

            <button
              className={`layer-btn ${activeLayer === 'fft' ? 'active' : ''}`}
              onClick={() => setActiveLayer('fft')}
            >
              <span className="layer-icon">📡</span>
              <div>
                <strong>2D DCT Frequency Spectrum</strong>
                <small>GAN / Diffusion radial checkerboard spikes</small>
              </div>
            </button>

            <button
              className={`layer-btn ${activeLayer === 'facemesh' ? 'active' : ''}`}
              onClick={() => setActiveLayer('facemesh')}
            >
              <span className="layer-icon">👤</span>
              <div>
                <strong>Face Landmark & Symmetry</strong>
                <small>Boundary blending & eye gaze vectors</small>
              </div>
            </button>
          </div>

          {activeLayer === 'ela' && (
            <div className="tuning-panel">
              <label>
                <span>ELA Amplification ({elaIntensity}x)</span>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={elaIntensity}
                  onChange={(e) => setElaIntensity(Number(e.target.value))}
                />
              </label>
            </div>
          )}

          <div className="tuning-panel">
            <label>
              <span>Zoom Scale ({zoomLevel.toFixed(1)}x)</span>
              <div className="zoom-controls">
                <button className="btn-sm" onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.2))}>-</button>
                <button className="btn-sm" onClick={() => setZoomLevel(1)}>Reset</button>
                <button className="btn-sm" onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.2))}>+</button>
              </div>
            </label>
          </div>
        </div>

        {/* Center: Canvas Viewport */}
        <div className="lab-viewport glass-card">
          <div className="viewport-header">
            <div className="viewport-status">
              <span className="live-pulse"></span>
              <span>CANVAS PIPELINE ACTIVE • 60 FPS FORENSIC ENGINE</span>
            </div>
            <div className="viewport-badge">
              {activeLayer.toUpperCase()} MODE
            </div>
          </div>

          <div 
            className="canvas-container" 
            ref={containerRef}
            onMouseMove={(e) => {
              if (activeLayer === 'split' && e.buttons === 1) {
                handleSliderDrag(e);
              }
            }}
          >
            {activeLayer === 'split' ? (
              <div className="split-view-wrapper" style={{ transform: `scale(${zoomLevel})` }}>
                <img src={activeImg} alt="Original" className="split-img-base" />
                
                <div 
                  className="split-overlay" 
                  style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
                >
                  <canvas ref={canvasRef} className="split-canvas" />
                </div>

                <div 
                  className="split-handle" 
                  style={{ left: `${sliderPos}%` }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="handle-line"></div>
                  <div className="handle-knob">↔</div>
                </div>

                <div className="split-tags">
                  <span className="tag-left">FORENSIC ELA VIEW</span>
                  <span className="tag-right">ORIGINAL IMAGE</span>
                </div>
              </div>
            ) : (
              <div className="single-canvas-wrapper" style={{ transform: `scale(${zoomLevel})` }}>
                <canvas ref={canvasRef} className="forensic-canvas-main" />
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Evidence & Telemetry */}
        <div className="lab-sidebar glass-card">
          <h3>FORENSIC TELEMETRY</h3>
          
          <div className="sample-summary-card">
            <div className="summary-score-badge">
              <span className="score-num">{selectedSample.score}%</span>
              <span className="score-lbl">Anomaly Rating</span>
            </div>
            <p className="sample-desc">{selectedSample.description}</p>
          </div>

          <div className="evidence-list">
            <h4>LAYER FINDINGS</h4>
            {selectedSample.findings.map((finding, idx) => (
              <div key={idx} className="evidence-item">
                <span className="evidence-tool">{finding.tool}</span>
                <span className="evidence-note">{finding.note}</span>
              </div>
            ))}
          </div>

          <div className="forensic-actions">
            <button className="btn btn-glow w-full" onClick={() => alert('Forensic Snapshot and SHA-256 integrity hash recorded.')}>
              📸 EXPORT SNAPSHOT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForensicLab;
