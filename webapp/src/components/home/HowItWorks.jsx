import React from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <section className="container how-it-works-section">
      <div className="how-it-works-header">
        <h2>How TruthLens Works</h2>
        <p>Verify your content in a few simple steps.</p>
      </div>
      
      <div className="how-it-works-grid">
        <div className="how-steps">
          
          <div className="step-item">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Upload Your Content</h3>
              <p>Choose the image, video, audio, or text you want to verify.</p>
            </div>
          </div>
          
          <div className="step-item">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Run Verification</h3>
              <p>Our deep learning models and heuristic analyzers inspect the media for anomalies.</p>
            </div>
          </div>
          
          <div className="step-item">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Review the Result</h3>
              <p>Get a clear Trust Score and Risk Level based on detected signals.</p>
            </div>
          </div>
          
          <div className="step-item">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3>Understand the Signals</h3>
              <p>Read detailed, human-readable explanations of exactly why the content was flagged.</p>
            </div>
          </div>
          
        </div>
        
        <div className="how-visual">
          <div className="how-illustration">
            <div className="orbit">
              <span>◎</span>
            </div>
            <strong>Verification Engine</strong>
            <small>Multimodal Analysis</small>
          </div>
        </div>
      </div>
    </section>
  );
}
