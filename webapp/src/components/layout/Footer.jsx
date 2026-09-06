import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        
        <div className="footer-col brand-col">
          <Link to="/" className="brand footer-brand">
            <div className="brand-mark">
              <span>◎</span>
            </div>
            <span>TruthLens <b>AI</b></span>
          </Link>
          <p className="footer-tagline">See through the lies.</p>
        </div>

        <div className="footer-col">
          <h3>Product</h3>
          <Link to="/verify/text">Text Verification</Link>
          <Link to="/verify/image">Image Verification</Link>
          <Link to="/verify/video">Video Verification</Link>
          <Link to="/verify/audio">Audio Verification</Link>
        </div>

        <div className="footer-col">
          <h3>Resources</h3>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div className="footer-col">
          <h3>Legal</h3>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>

      </div>

      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} TruthLens AI. All rights reserved.</span>
        <div className="footer-bottom-links">
          <span>Automated verification based on detected signals.</span>
        </div>
      </div>
    </footer>
  );
}
