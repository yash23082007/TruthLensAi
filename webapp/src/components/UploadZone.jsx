import React, { useState, useCallback, useEffect } from 'react';
import './UploadZone.css';
import { analyzeContent } from '../utils/api';

const SAMPLES = {
  image: [
    { label: 'Synthetic AI Portrait', file: 'sample_social.jpg', tag: 'AI' },
    { label: 'Authentic News Photo', file: 'sample_news.jpg', tag: 'REAL' },
    { label: 'Spliced Crowd Photo', file: 'sample_parade.jpg', tag: 'SPLICED' }
  ],
  audio: [
    { label: 'Synthetic Voice Scam', text: 'URGENT: This is federal treasury agent calling regarding your immediate wire tax transfer.', tag: 'VOICE' },
    { label: 'Authentic Voice Note', text: 'Hey, I left my keys at the front desk. Let me know when you arrive at the office.', tag: 'HUMAN' }
  ],
  text: [
    { label: 'Bank Phishing Email', text: 'URGENT SECURITY ALERT: Your online banking account has been temporarily restricted due to unauthorized login attempts. Confirm your social security number and password within 24 hours to prevent account closure.', tag: 'PHISHING' },
    { label: 'Scientific Claim', text: 'Recent clinical research published in medical journals confirms that daily cardiovascular exercise reduces long-term mortality risk.', tag: 'CLAIM' },
    { label: 'Synthetic Formula Essay', text: 'In conclusion, it is important to recognize that technological paradigms serve as a transformative catalyst for multifaceted modern ecosystems, leveraging holistic synergy.', tag: 'LLM' }
  ],
  video: [
    { label: 'Video Face-Swap Frame', file: 'sample_videocall.jpg', tag: 'FACE-SWAP' },
    { label: 'Authentic Camera Capture', file: 'sample_news.jpg', tag: 'AUTHENTIC' }
  ]
};

const SCAN_STAGES = [
  "Uploading file...",
  "Running image analysis...",
  "Checking for manipulation...",
  "Analyzing metadata...",
  "Generating report..."
];

const UploadZone = ({ onAnalysisComplete, preselectedType, setPreselectedType, routeType = 'home' }) => {
  const [activeTab, setActiveTab] = useState(preselectedType || (routeType !== 'home' ? routeType : 'image'));
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanStageIdx, setScanStageIdx] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  useEffect(() => {
    if (preselectedType) {
      setActiveTab(preselectedType);
    }
  }, [preselectedType]);

  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setScanStageIdx((prev) => (prev < SCAN_STAGES.length - 1 ? prev + 1 : prev));
      }, 450);
    } else {
      setScanStageIdx(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const processFile = async (file, typeOverride) => {
    if (!file) return;
    
    let type = typeOverride || activeTab;
    if (!typeOverride) {
      if (file.type.startsWith('video/')) type = 'video';
      else if (file.type.startsWith('audio/')) type = 'audio';
      else if (file.type.startsWith('text/')) type = 'text';
      else if (file.type.startsWith('image/')) type = 'image';
    }

    setSelectedFileName(file.name);
    setIsAnalyzing(true);
    setError('');

    try {
      const result = await analyzeContent(file, type);
      onAnalysisComplete(result);
    } catch (err) {
      setError(err.message || 'Verification service temporarily unavailable. Please verify backend connection.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [activeTab]);

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleTextAnalyze = async () => {
    if (!textInput.trim()) return;
    setIsAnalyzing(true);
    setError('');
    try {
      const result = await analyzeContent(textInput, 'text');
      onAnalysisComplete(result);
    } catch (err) {
      setError(err.message || 'Could not analyze text claims.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadSample = async (sample, type) => {
    if (sample.text) {
      setTextInput(sample.text);
      setIsAnalyzing(true);
      setError('');
      try {
        const result = await analyzeContent(sample.text, type || 'text');
        onAnalysisComplete(result);
      } catch (err) {
        setError('Sample analysis failed.');
      } finally {
        setIsAnalyzing(false);
      }
    } else if (sample.file) {
      setSelectedFileName(sample.file);
      try {
        const response = await fetch(`/images/${sample.file}`);
        const blob = await response.blob();
        const file = new File([blob], sample.file, { type: 'image/jpeg' });
        await processFile(file, type || 'image');
      } catch (err) {
        setError('Could not load sample file.');
      }
    }
  };

  const getAcceptType = () => {
    switch (activeTab) {
      case 'image': return 'image/jpeg,image/png,image/webp,image/gif,image/bmp';
      case 'video': return 'video/mp4,video/quicktime,video/webm,video/avi,video/mkv';
      case 'audio': return 'audio/wav,audio/mpeg,audio/flac,audio/ogg,audio/aac,audio/mp3';
      default: return '*/*';
    }
  };

  return (
    <section id="upload-zone" className="upload-workspace container animate-slide-up">
      <div className="workspace-card glass-card">
        {/* Workspace Segmented Tabs */}
        <div className="workspace-tabs-bar">
          <div className="tabs-group">
            <button 
              className={`workspace-tab ${activeTab === 'image' ? 'active' : ''}`}
              onClick={() => { setActiveTab('image'); if(setPreselectedType) setPreselectedType('image'); }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
              <span>Image</span>
            </button>

            <button 
              className={`workspace-tab ${activeTab === 'video' ? 'active' : ''}`}
              onClick={() => { setActiveTab('video'); if(setPreselectedType) setPreselectedType('video'); }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m22 8-6 4 6 4V8Z"/>
                <rect width="14" height="12" x="2" y="6" rx="2"/>
              </svg>
              <span>Video</span>
            </button>

            <button 
              className={`workspace-tab ${activeTab === 'audio' ? 'active' : ''}`}
              onClick={() => { setActiveTab('audio'); if(setPreselectedType) setPreselectedType('audio'); }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
              <span>Audio / Voice</span>
            </button>

            <button 
              className={`workspace-tab ${activeTab === 'text' ? 'active' : ''}`}
              onClick={() => { setActiveTab('text'); if(setPreselectedType) setPreselectedType('text'); }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" x2="8" y1="13" y2="13"/>
                <line x1="16" x2="8" y1="17" y2="17"/>
              </svg>
              <span>Text & Claims</span>
            </button>
          </div>


        </div>

        {/* Upload Body */}
        <div className="workspace-body">
          {activeTab !== 'text' ? (
            <div 
              className={`drop-area ${isDragging ? 'dragging' : ''} ${isAnalyzing ? 'analyzing' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                id="file-input-control" 
                className="hidden-file-input" 
                onChange={handleFileInput}
                disabled={isAnalyzing}
                accept={getAcceptType()}
              />

              {isAnalyzing ? (
                <div className="processing-state animate-fade-in">
                  <div className="telemetry-radar-spinner">
                    <div className="radar-circle c1"></div>
                    <div className="radar-circle c2"></div>
                    <div className="radar-sweep"></div>
                  </div>
                  <div className="processing-text-block">
                    <p className="processing-stage-label">{SCAN_STAGES[scanStageIdx]}</p>
                    <p className="processing-sub">{selectedFileName || 'Processing file'}</p>
                    
                    <div className="scan-progress-track">
                      <div 
                        className="scan-progress-fill"
                        style={{ width: `${Math.round(((scanStageIdx + 1) / SCAN_STAGES.length) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                <label htmlFor="file-input-control" className="drop-target-label">
                  <div className="drop-icon-wrapper">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" x2="12" y1="3" y2="15"/>
                    </svg>
                  </div>
                  <div className="drop-text-block">
                    <h3 className="drop-title">
                      Drop your {activeTab} file here or <span className="browse-link">browse</span>
                    </h3>
                    <p className="drop-hint">
                      Supported: {activeTab === 'image' ? 'JPG, PNG, WEBP, BMP, GIF' : activeTab === 'video' ? 'MP4, MOV, WEBM, AVI, MKV' : 'WAV, MP3, FLAC, OGG, AAC'} • Up to 100MB
                    </p>
                  </div>
                </label>
              )}
            </div>
          ) : (
            <div className="text-input-area">
              <textarea 
                className="claim-textarea"
                placeholder="Paste news articles, phishing emails, social media posts, or statements to verify for AI generation, scams, and fact discrepancies..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                disabled={isAnalyzing}
                rows={5}
              />
              <div className="text-actions-bar">
                <div className="text-meta">
                  <span className="char-counter">{textInput.length} chars</span>
                  <span className="word-counter">{textInput.trim() ? textInput.trim().split(/\s+/).length : 0} words</span>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={handleTextAnalyze}
                  disabled={isAnalyzing || !textInput.trim()}
                >
                  {isAnalyzing ? (
                    <>
                      <span className="status-dot active pulse"></span>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                      Analyze Text & Claims
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="error-banner animate-fade-in">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" x2="12" y1="8" y2="12"/>
                <line x1="12" x2="12.01" y1="16" y2="16"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Quick Benchmark Samples */}
          {!isAnalyzing && (
            <div className="samples-toolbar">
              <span className="samples-label">Try a sample:</span>
              <div className="sample-chips-grid">
                {activeTab === 'image' && SAMPLES.image.map((s, i) => (
                  <button key={i} className="sample-chip" onClick={() => loadSample(s, 'image')}>
                    <span className={`chip-badge ${s.tag.toLowerCase()}`}>{s.tag}</span>
                    <span className="chip-text">{s.label}</span>
                  </button>
                ))}
                {activeTab === 'audio' && SAMPLES.audio.map((s, i) => (
                  <button key={i} className="sample-chip" onClick={() => loadSample(s, 'audio')}>
                    <span className={`chip-badge ${s.tag.toLowerCase()}`}>{s.tag}</span>
                    <span className="chip-text">{s.label}</span>
                  </button>
                ))}
                {activeTab === 'text' && SAMPLES.text.map((s, i) => (
                  <button key={i} className="sample-chip" onClick={() => loadSample(s, 'text')}>
                    <span className={`chip-badge ${s.tag.toLowerCase()}`}>{s.tag}</span>
                    <span className="chip-text">{s.label}</span>
                  </button>
                ))}
                {activeTab === 'video' && SAMPLES.video.map((s, i) => (
                  <button key={i} className="sample-chip" onClick={() => loadSample(s, 'image')}>
                    <span className={`chip-badge ${s.tag.toLowerCase()}`}>{s.tag}</span>
                    <span className="chip-text">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadZone;
