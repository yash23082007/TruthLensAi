import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UploadZone from './components/UploadZone';
import AnalysisResult from './components/AnalysisResult';
import FeatureCards from './components/FeatureCards';
import DifferentDeepfakes from './components/DifferentDeepfakes';
import HowToUse from './components/HowToUse';
import UseCases from './components/UseCases';
import FAQ from './components/FAQ';
import About from './components/About';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Privacy from './components/Privacy';
import Terms from './components/Terms';

// Extraordinary New Forensic Suites
import ForensicLab from './components/ForensicLab';
import LiveVoiceScreener from './components/LiveVoiceScreener';
import TokenPredictabilityLens from './components/TokenPredictabilityLens';
import ThreatRadar from './components/ThreatRadar';
import DeepfakeChallenge from './components/DeepfakeChallenge';
import C2PAInspector from './components/C2PAInspector';
import ApiPlayground from './components/ApiPlayground';

import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [preselectedType, setPreselectedType] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setAnalysisResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTool = (toolType) => {
    setAnalysisResult(null);
    if (toolType === 'image') {
      setCurrentPage('image-detect');
    } else if (toolType === 'video') {
      setCurrentPage('video-detect');
    } else if (toolType === 'audio') {
      setCurrentPage('voice-detect');
    } else if (toolType === 'text') {
      setCurrentPage('home');
      setPreselectedType('text');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    setTimeout(() => {
      document.getElementById('results-view')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    document.getElementById('upload-zone')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <div className="aurora-bg"></div>
      
      <Navbar 
        currentPage={currentPage} 
        onChangePage={handlePageChange} 
        onSelectTool={handleSelectTool} 
      />
      
      <main style={{ paddingTop: '64px' }}>
        {/* HOMEPAGE VIEW */}
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={handlePageChange} />
            <UploadZone 
              onAnalysisComplete={handleAnalysisComplete} 
              preselectedType={preselectedType}
              setPreselectedType={setPreselectedType}
              routeType="home"
            />
            {analysisResult && (
              <AnalysisResult 
                result={analysisResult} 
                onReset={handleReset} 
                onOpenForensicLab={() => setCurrentPage('forensic-lab')}
              />
            )}
            
            <DifferentDeepfakes onSelectTool={handleSelectTool} />
            <HowToUse />
            <UseCases />
            <FAQ type="home" />
          </>
        )}

        {/* IMAGE DETECT PAGE */}
        {currentPage === 'image-detect' && (
          <>
            <section className="hero container animate-slide-up">
              <div className="hero-content">
                <div className="section-stamp">Visual Verification Pipeline</div>
                <h1 className="hero-title">DEEPFAKE IMAGE DETECTION</h1>
                <p className="hero-subtitle">
                  Verify image authenticity in seconds. Scans for localized pixel manipulation, ELA compression consistency, face texture smoothness, and GAN frequency spikes.
                </p>
              </div>
            </section>
            
            <UploadZone 
              onAnalysisComplete={handleAnalysisComplete} 
              routeType="image"
            />
            
            {analysisResult && (
              <AnalysisResult 
                result={analysisResult} 
                onReset={handleReset} 
                onOpenForensicLab={() => setCurrentPage('forensic-lab')}
              />
            )}

            <DifferentDeepfakes onSelectTool={handleSelectTool} />
            <FAQ type="image" />
          </>
        )}

        {/* VIDEO DETECT PAGE */}
        {currentPage === 'video-detect' && (
          <>
            <section className="hero container animate-slide-up">
              <div className="hero-content">
                <div className="section-stamp">Motion Analysis Pipeline</div>
                <h1 className="hero-title">DEEPFAKE VIDEO DETECTION</h1>
                <p className="hero-subtitle">
                  Scan videos frame-by-frame for face swaps and lip-sync anomalies. Checks temporal consistency, tracks face boundary jitter, and audits container atoms.
                </p>
              </div>
            </section>
            
            <UploadZone 
              onAnalysisComplete={handleAnalysisComplete} 
              routeType="video"
            />
            
            {analysisResult && (
              <AnalysisResult 
                result={analysisResult} 
                onReset={handleReset} 
                onOpenForensicLab={() => setCurrentPage('forensic-lab')}
              />
            )}

            <FAQ type="video" />
          </>
        )}

        {/* VOICE DETECT PAGE */}
        {currentPage === 'voice-detect' && (
          <>
            <section className="hero container animate-slide-up">
              <div className="hero-content">
                <div className="section-stamp">Spectral Auditing Pipeline</div>
                <h1 className="hero-title">DEEPFAKE VOICE DETECTION</h1>
                <p className="hero-subtitle">
                  Detect voice clones and neural text-to-speech. Analyzes Mel-Frequency Cepstral Coefficients (MFCC), pitch consistency, and silence interval pause timings.
                </p>
              </div>
            </section>
            
            <UploadZone 
              onAnalysisComplete={handleAnalysisComplete} 
              routeType="audio"
            />
            
            {analysisResult && (
              <AnalysisResult 
                result={analysisResult} 
                onReset={handleReset} 
                onOpenForensicLab={() => setCurrentPage('forensic-lab')}
              />
            )}

            <FAQ type="audio" />
          </>
        )}

        {/* INTERACTIVE FORENSIC LAB */}
        {currentPage === 'forensic-lab' && (
          <ForensicLab 
            initialResult={analysisResult} 
            onBack={() => handlePageChange('home')} 
          />
        )}

        {/* LIVE MICROPHONE VOICE SCREENER */}
        {currentPage === 'live-voice' && (
          <LiveVoiceScreener 
            onAnalysisComplete={handleAnalysisComplete} 
            onBack={() => handlePageChange('home')} 
          />
        )}

        {/* TOKEN PREDICTABILITY & SCAM LENS */}
        {currentPage === 'token-lens' && (
          <TokenPredictabilityLens 
            onBack={() => handlePageChange('home')} 
          />
        )}

        {/* GLOBAL THREAT RADAR */}
        {currentPage === 'threat-radar' && (
          <ThreatRadar 
            onBack={() => handlePageChange('home')} 
          />
        )}

        {/* SPOT THE DEEPFAKE CHALLENGE ARENA */}
        {currentPage === 'challenge' && (
          <DeepfakeChallenge 
            onBack={() => handlePageChange('home')} 
          />
        )}

        {/* C2PA CONTENT CREDENTIALS AUDITOR */}
        {currentPage === 'c2pa' && (
          <C2PAInspector 
            onBack={() => handlePageChange('home')} 
          />
        )}

        {/* API DEVELOPER PLAYGROUND */}
        {currentPage === 'api-docs' && (
          <ApiPlayground 
            onBack={() => handlePageChange('home')} 
          />
        )}
        
        {/* FEATURES */}
        {currentPage === 'features' && (
          <FeatureCards />
        )}

        {/* PRICING */}
        {currentPage === 'pricing' && (
          <Pricing onTryFree={() => handlePageChange('home')} />
        )}
        
        {/* ABOUT */}
        {currentPage === 'about' && (
          <About />
        )}

        {/* PRIVACY */}
        {currentPage === 'privacy' && (
          <Privacy />
        )}

        {/* TERMS */}
        {currentPage === 'terms' && (
          <Terms />
        )}
      </main>

      <Footer 
        onChangePage={handlePageChange} 
        onSelectTool={handleSelectTool} 
      />
    </div>
  );
}

export default App;
