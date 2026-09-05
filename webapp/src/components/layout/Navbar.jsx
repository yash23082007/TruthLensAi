import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, FileText, Image as ImageIcon, Film, Mic } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <div className="brand-mark">
            <span>◎</span>
          </div>
          <span>TruthLens <b>AI</b></span>
        </Link>

        <div className="desktop-nav">
          <Link to="/" className={location.pathname === '/' ? 'nav-active' : ''}>Home</Link>
          
          <div 
            className="verify-menu"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="dropdown-trigger">
              Verify <ChevronDown size={14} />
            </button>
            
            {dropdownOpen && (
              <div className="verify-dropdown">
                <Link to="/verify/text" className="dropdown-item">
                  <FileText size={18} />
                  <div>
                    <strong>Text Verification</strong>
                    <small>Analyze messages and claims</small>
                  </div>
                </Link>
                <Link to="/verify/image" className="dropdown-item">
                  <ImageIcon size={18} />
                  <div>
                    <strong>Image Verification</strong>
                    <small>Detect AI and manipulation</small>
                  </div>
                </Link>
                <Link to="/verify/video" className="dropdown-item">
                  <Film size={18} />
                  <div>
                    <strong>Video Verification</strong>
                    <small>Analyze deepfakes and splices</small>
                  </div>
                </Link>
                <Link to="/verify/audio" className="dropdown-item">
                  <Mic size={18} />
                  <div>
                    <strong>Audio Verification</strong>
                    <small>Detect synthetic voices</small>
                  </div>
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/about">About</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div className="nav-actions">
          <Link to="/signin" className="sign-in">Sign In</Link>
          <Link to="/verify/image" className="button primary nav-cta">Start Verifying →</Link>
          <button 
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav">
          <Link to="/">Home</Link>
          <div className="mobile-nav-group">
            <span className="mobile-group-title">Verify</span>
            <Link to="/verify/text">Text Verification</Link>
            <Link to="/verify/image">Image Verification</Link>
            <Link to="/verify/video">Video Verification</Link>
            <Link to="/verify/audio">Audio Verification</Link>
          </div>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/about">About</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      )}
    </header>
  );
}
