import React from 'react';
import './HowToUse.css';

const STEPS = [
  {
    step: "1",
    title: "Upload your file",
    desc: "Drag and drop an image, video, audio clip, or paste text."
  },
  {
    step: "2",
    title: "Automated analysis",
    desc: "Multiple detection methods run simultaneously on your file."
  },
  {
    step: "3",
    title: "Review results",
    desc: "See a trust score, risk classification, and detailed breakdown."
  },
  {
    step: "4",
    title: "Export report",
    desc: "Download a verification certificate or copy the JSON audit trail."
  }
];

const HowToUse = () => {
  return (
    <section className="how-to-use-section container">
      <div className="section-header-block">
        <h2 className="section-main-title">How it works</h2>
      </div>

      <div className="how-steps-row">
        {STEPS.map((item, idx) => (
          <div key={idx} className="step-item">
            <div className="step-number">{item.step}</div>
            <div className="step-content">
              <h3 className="step-title">{item.title}</h3>
              <p className="step-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToUse;
