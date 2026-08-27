import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ currentPage, onChangePage, onSelectTool }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToolClick = (toolType) => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectTool) {
      onSelectTool(toolType);
    }
  };

  const navigateTo = (page) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    onChangePage(page);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
          <div className="logo-shield">TL</div>
          <span className="logo-text">TRUTHLENS <span className="logo-accent">AI</span></span>
        </div>

        {/* Live Engine Status Badge */}
        <div className="nav-engine-status">
          <span className="status-blip"></span>
          <span>NEURAL ENGINE ONLINE</span>
        </div>

        {/* Desktop Links */}
        <div className="navbar-links">
          <button 
            className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => navigateTo('home')}
          >
            HOME
          </button>

          {/* Tools Dropdown */}
          <div 
            className="dropdown-wrapper"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="nav-btn dropdown-trigger">
              DETECTION TOOLS <span className="arrow-indicator">▼</span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => handleToolClick('image')}>
                  📷 Deepfake Image Detection
                </button>
                <button className="dropdown-item" onClick={() => handleToolClick('video')}>
                  🎥 Deepfake Video Detection
                </button>
                <button className="dropdown-item" onClick={() => handleToolClick('audio')}>
                  🎙️ Voice Clone Screener
                </button>
                <button className="dropdown-item" onClick={() => handleToolClick('text')}>
                  📝 Text & Scam Verification
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item featured" onClick={() => navigateTo('forensic-lab')}>
                  🔬 Interactive Forensic Lab
                </button>
                <button className="dropdown-item featured" onClick={() => navigateTo('live-voice')}>
                  ⚡ Live Microphone Screener
                </button>
                <button className="dropdown-item featured" onClick={() => navigateTo('token-lens')}>
                  🔍 Token Perplexity Lens
                </button>
              </div>
            )}
          </div>

          <button 
            className={`nav-btn ${currentPage === 'forensic-lab' ? 'active' : ''}`}
            onClick={() => navigateTo('forensic-lab')}
          >
            FORENSIC LAB
          </button>

          <button 
            className={`nav-btn ${currentPage === 'threat-radar' ? 'active' : ''}`}
            onClick={() => navigateTo('threat-radar')}
          >
            THREAT RADAR
          </button>

          <button 
            className={`nav-btn ${currentPage === 'challenge' ? 'active' : ''}`}
            onClick={() => navigateTo('challenge')}
          >
            REAL VS AI
          </button>

          <button 
            className={`nav-btn ${currentPage === 'c2pa' ? 'active' : ''}`}
            onClick={() => navigateTo('c2pa')}
          >
            C2PA AUDIT
          </button>

          <button 
            className={`nav-btn ${currentPage === 'api-docs' ? 'active' : ''}`}
            onClick={() => navigateTo('api-docs')}
          >
            API
          </button>

          <button 
            className={`nav-btn ${currentPage === 'pricing' ? 'active' : ''}`}
            onClick={() => navigateTo('pricing')}
          >
            PRICING
          </button>

          <button 
            className={`nav-btn ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => navigateTo('about')}
          >
            ABOUT
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu animate-slide-up">
          <button className="mobile-item" onClick={() => navigateTo('home')}>🏠 Home</button>
          <button className="mobile-item" onClick={() => handleToolClick('image')}>📷 Image Detection</button>
          <button className="mobile-item" onClick={() => handleToolClick('video')}>🎥 Video Detection</button>
          <button className="mobile-item" onClick={() => handleToolClick('audio')}>🎙️ Voice Screener</button>
          <button className="mobile-item" onClick={() => handleToolClick('text')}>📝 Text Verification</button>
          <button className="mobile-item" onClick={() => navigateTo('forensic-lab')}>🔬 Forensic Lab</button>
          <button className="mobile-item" onClick={() => navigateTo('live-voice')}>🎙️ Live Mic Screener</button>
          <button className="mobile-item" onClick={() => navigateTo('token-lens')}>🔍 Token Lens</button>
          <button className="mobile-item" onClick={() => navigateTo('threat-radar')}>📡 Threat Radar</button>
          <button className="mobile-item" onClick={() => navigateTo('challenge')}>🎮 Spot The Deepfake</button>
          <button className="mobile-item" onClick={() => navigateTo('c2pa')}>🛡️ C2PA Auditor</button>
          <button className="mobile-item" onClick={() => navigateTo('api-docs')}>⚡ API Sandbox</button>
          <button className="mobile-item" onClick={() => navigateTo('pricing')}>💎 Pricing</button>
          <button className="mobile-item" onClick={() => navigateTo('about')}>ℹ️ About Us</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
