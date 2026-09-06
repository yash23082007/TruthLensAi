import React from 'react';
import Hero from './Hero';
import CapabilityCards from './CapabilityCards';
import EditorialSection from './EditorialSection';
import HowItWorks from './HowItWorks';
import FAQ from './FAQ';
import FinalCTA from './FinalCTA';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="homepage page-enter">
      <Hero />
      <CapabilityCards />
      
      <EditorialSection 
        layout="image-left"
        title="Detect suspicious digital content before you trust it."
        text="Digital manipulation is becoming easier to create and harder to spot. TruthLens AI uses multiple advanced analysis layers to give you a clear, evidence-based assessment of the content you verify."
        imageSrc='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%23f1f5f9"/><circle cx="600" cy="400" r="300" fill="none" stroke="%23cbd5e1" stroke-width="40"/><path d="M400,500 L800,300" stroke="%2394a3b8" stroke-width="20"/></svg>'
        imageCaption="Checking media authenticity."
      />
      
      <EditorialSection 
        layout="text-left"
        title="Understand what makes a result suspicious."
        text="A simple 'fake' or 'real' label isn't enough. Our platform extracts technical metadata, detects generation tool signatures, and highlights the exact signals that contributed to the final trust score."
        imageSrc='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%230f172a"/><circle cx="600" cy="400" r="300" fill="none" stroke="%231e293b" stroke-width="40"/><path d="M400,500 L800,300" stroke="%233b82f6" stroke-width="20"/></svg>'
        imageCaption="Data extraction and analysis."
      />
      
      <HowItWorks />
      
      <div className="container testimonial-section">
        <div className="testimonial-card">
          <blockquote>
            "Built to make digital verification easier to understand and accessible to everyone, not just forensic experts."
          </blockquote>
          <div className="pagination-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
      
      <FAQ />
      <FinalCTA />
    </div>
  );
}
