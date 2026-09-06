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
        imageSrc="https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&q=80&w=1200"
        imageCaption="Checking media authenticity."
      />
      
      <EditorialSection 
        layout="text-left"
        title="Understand what makes a result suspicious."
        text="A simple 'fake' or 'real' label isn't enough. Our platform extracts technical metadata, detects generation tool signatures, and highlights the exact signals that contributed to the final trust score."
        imageSrc="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
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
