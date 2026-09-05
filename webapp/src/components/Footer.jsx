import React from 'react';
import './Footer.css';

const Footer = ({ onChangePage, onSelectTool }) => {
  return (
    <footer className="footer-bar">
      <div className="container footer-container">
        <div className="footer-brand">
          <span className="footer-logo-text">TruthLens</span>
          <p className="footer-tagline">
            Media verification and deepfake detection.
          </p>
        </div>
        
        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Detection</h4>
            <a href="#" onClick={(e) => { e.preventDefault(); onSelectTool('image'); }}>Images</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onSelectTool('video'); }}>Video</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onSelectTool('audio'); }}>Voice & audio</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onSelectTool('text'); }}>Text & claims</a>
          </div>

          <div className="footer-col">
            <h4>Tools</h4>
            <a href="#" onClick={(e) => { e.preventDefault(); onChangePage('forensic-lab'); }}>Forensic sandbox</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onChangePage('threat-radar'); }}>Threat radar</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onChangePage('c2pa'); }}>C2PA provenance</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onChangePage('challenge'); }}>Deepfake challenge</a>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <a href="#" onClick={(e) => { e.preventDefault(); onChangePage('about'); }}>About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onChangePage('api-docs'); }}>API</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onChangePage('pricing'); }}>Pricing</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onChangePage('privacy'); }}>Privacy</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom container">
        <p>© 2026 TruthLens. All files processed in-memory with zero data retention.</p>
      </div>
    </footer>
  );
};

export default Footer;
