import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './FinalCTA.css';

export default function FinalCTA() {
  return (
    <section className="container final-cta-section">
      <div className="final-cta-content">
        <h2>Ready to verify something?</h2>
        <p>Check your text, image, video, or audio with TruthLens AI.</p>
        <Link to="/verify/image" className="button primary cta-button">
          Start Verification <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
