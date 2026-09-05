import React, { useState, useEffect } from 'react';
import SignInModal from './SignInModal';
import './Navbar.css';

const Navbar = ({ currentPage, onChangePage, onSelectTool }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [credits, setCredits] = useState(50);
  const [userEmail, setUserEmail] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('truthlens-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('truthlens-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

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
    <>
      <header className="site-header">
        <div className="header-container">
          {/* Logo */}
          <div className="header-brand" onClick={() => navigateTo('home')}>
            <div className="brand-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <circle cx="12" cy="11" r="3"/>
                <path d="m9 18 3-3 3 3"/>
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-name">TruthLens</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <button 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => navigateTo('home')}
            >
              Overview
            </button>

            {/* Deepfake Detection Tools Dropdown */}
            <div 
              className="dropdown-wrapper"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className={`nav-link dropdown-trigger ${['image-detect', 'video-detect', 'voice-detect', 'forensic-lab', 'threat-radar', 'c2pa'].includes(currentPage) ? 'active' : ''}`}>
                Detection Suites
                <svg className="arrow-glyph" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu animate-fade-in">
                  <div className="dropdown-section-title">Analysis</div>
                  <button className="dropdown-item" onClick={() => handleToolClick('image')}>
                    <div className="item-icon-box">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                        <circle cx="9" cy="9" r="2"/>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                      </svg>
                    </div>
                    <div className="item-content">
                      <strong>Image forensics</strong>
                      <small>ELA, EXIF & frequency spectrum</small>
                    </div>
                  </button>

                  <button className="dropdown-item" onClick={() => handleToolClick('video')}>
                    <div className="item-icon-box">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m22 8-6 4 6 4V8Z"/>
                        <rect width="14" height="12" x="2" y="6" rx="2"/>
                      </svg>
                    </div>
                    <div className="item-content">
                      <strong>Video detection</strong>
                      <small>Frame consistency & face tracking</small>
                    </div>
                  </button>

                  <button className="dropdown-item" onClick={() => handleToolClick('audio')}>
                    <div className="item-icon-box">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                        <line x1="12" x2="12" y1="19" y2="22"/>
                      </svg>
                    </div>
                    <div className="item-content">
                      <strong>Voice clone screener</strong>
                      <small>Spectral analysis & pitch patterns</small>
                    </div>
                  </button>

                  <button className="dropdown-item" onClick={() => handleToolClick('text')}>
                    <div className="item-icon-box">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" x2="8" y1="13" y2="13"/>
                        <line x1="16" x2="8" y1="17" y2="17"/>
                      </svg>
                    </div>
                    <div className="item-content">
                      <strong>Text & claim verifier</strong>
                      <small>NLP analysis & fact checking</small>
                    </div>
                  </button>

                  <div className="dropdown-divider"></div>
                  <div className="dropdown-section-title">Tools</div>

                  <button className="dropdown-item highlight" onClick={() => navigateTo('forensic-lab')}>
                    <div className="item-icon-box special">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0"/>
                        <path d="M5.52 16h12.96"/>
                      </svg>
                    </div>
                    <div className="item-content">
                      <strong>Forensic Sandbox</strong>
                      <small>Interactive layer split-slider</small>
                    </div>
                  </button>

                  <button className="dropdown-item highlight" onClick={() => navigateTo('threat-radar')}>
                    <div className="item-icon-box special">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m4.93 4.93 4.24 4.24"/>
                        <path d="m14.83 9.17 4.24-4.24"/>
                        <circle cx="12" cy="12" r="4"/>
                      </svg>
                    </div>
                    <div className="item-content">
                      <strong>Global Threat Radar</strong>
                      <small>Live synthetic media telemetry</small>
                    </div>
                  </button>

                  <button className="dropdown-item highlight" onClick={() => navigateTo('c2pa')}>
                    <div className="item-icon-box special">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                    </div>
                    <div className="item-content">
                      <strong>C2PA Provenance</strong>
                      <small>Cryptographic hardware credentials</small>
                    </div>
                  </button>

                  <button className="dropdown-item highlight" onClick={() => navigateTo('challenge')}>
                    <div className="item-icon-box special">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <line x1="12" x2="12.01" y1="17" y2="17"/>
                      </svg>
                    </div>
                    <div className="item-content">
                      <strong>Spot The Deepfake Arena</strong>
                      <small>Interactive benchmark challenge</small>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button 
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => navigateTo('about')}
            >
              Architecture
            </button>

            <button 
              className={`nav-link ${currentPage === 'api-docs' ? 'active' : ''}`}
              onClick={() => navigateTo('api-docs')}
            >
              API
            </button>

            <button 
              className={`nav-link ${currentPage === 'pricing' ? 'active' : ''}`}
              onClick={() => navigateTo('pricing')}
            >
              Pricing
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions">
            {/* Light / Dark Mode Toggle */}
            <button 
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Auth Sign in */}
            {userEmail ? (
              <div className="user-profile-badge">
                <span className="user-avatar-initial">{userEmail[0].toUpperCase()}</span>
                <span className="user-email-text">{userEmail.split('@')[0]}</span>
              </div>
            ) : (
              <button 
                className="btn btn-secondary btn-small signin-btn"
                onClick={() => setSignInOpen(true)}
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer animate-fade-in">
            <button className="mobile-nav-link" onClick={() => navigateTo('home')}>Overview</button>
            <button className="mobile-nav-link" onClick={() => handleToolClick('image')}>Image Forensics</button>
            <button className="mobile-nav-link" onClick={() => handleToolClick('video')}>Video Deepfake Detection</button>
            <button className="mobile-nav-link" onClick={() => handleToolClick('audio')}>Voice Clone Screener</button>
            <button className="mobile-nav-link" onClick={() => handleToolClick('text')}>Text & Claims Verification</button>
            <button className="mobile-nav-link" onClick={() => navigateTo('forensic-lab')}>Forensic Sandbox</button>
            <button className="mobile-nav-link" onClick={() => navigateTo('threat-radar')}>Global Threat Radar</button>
            <button className="mobile-nav-link" onClick={() => navigateTo('c2pa')}>C2PA Provenance</button>
            <button className="mobile-nav-link" onClick={() => navigateTo('api-docs')}>API Docs</button>
            <button className="mobile-nav-link" onClick={() => navigateTo('about')}>Architecture</button>
            <button className="mobile-nav-link" onClick={() => navigateTo('pricing')}>Pricing</button>
            <div className="mobile-theme-row">
              <span>Color Theme</span>
              <button className="btn btn-secondary btn-small" onClick={toggleTheme}>
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
            <button className="btn btn-primary w-full" onClick={() => setSignInOpen(true)}>Sign In</button>
          </div>
        )}
      </header>

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSignInSuccess={(email) => setUserEmail(email)}
      />
    </>
  );
};

export default Navbar;
