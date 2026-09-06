import React from 'react';
import { Play } from 'lucide-react';
import './ExampleCarousel.css';

export default function ExampleCarousel({ modality }) {
  const examples = {
    image: [
      { id: 1, title: 'AI-Generated Portrait', label: 'Suspicious', img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%230f172a"/><circle cx="200" cy="125" r="80" fill="%231e293b"/></svg>' },
      { id: 2, title: 'Manipulated News Photo', label: 'Suspicious', img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%231e293b"/><path d="M0,250 L200,100 L400,250" fill="%23334155"/></svg>' },
      { id: 3, title: 'Authentic Photograph', label: 'Likely Authentic', img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%23f8fafc"/><circle cx="200" cy="125" r="80" fill="%23f1f5f9"/></svg>' }
    ],
    video: [
      { id: 1, title: 'News Presentation', label: 'Suspicious', img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%230f172a"/><rect x="50" y="50" width="300" height="150" fill="%231e293b"/></svg>', hasPlay: true },
      { id: 2, title: 'Video Call Deepfake', label: 'Suspicious', img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%231e293b"/><circle cx="200" cy="125" r="80" fill="%23334155"/></svg>', hasPlay: true },
      { id: 3, title: 'Authentic Interview', label: 'Likely Authentic', img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%23f8fafc"/><rect x="50" y="50" width="300" height="150" fill="%23f1f5f9"/></svg>', hasPlay: true }
    ],
    audio: [
      { id: 1, title: 'Voice Clone (Phishing)', label: 'Suspicious', img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%230f172a"/><path d="M50,125 Q200,50 350,125" fill="none" stroke="%233b82f6" stroke-width="10"/></svg>', hasPlay: true },
      { id: 2, title: 'Synthetic TTS Audio', label: 'Suspicious', img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%231e293b"/><path d="M50,125 Q200,200 350,125" fill="none" stroke="%23ef4444" stroke-width="10"/></svg>', hasPlay: true },
      { id: 3, title: 'Authentic Recording', label: 'Likely Authentic', img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%23f8fafc"/><path d="M50,125 Q200,125 350,125" fill="none" stroke="%2310b981" stroke-width="10"/></svg>', hasPlay: true }
    ],
    text: [
      { id: 1, title: 'Phishing Email', label: 'Suspicious', img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%230f172a"/><line x1="100" y1="100" x2="300" y2="100" stroke="%231e293b" stroke-width="20"/></svg>' },
      { id: 2, title: 'AI-Generated Article', label: 'Suspicious', img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%231e293b"/><line x1="100" y1="125" x2="300" y2="125" stroke="%23334155" stroke-width="20"/></svg>' },
      { id: 3, title: 'Human Written Essay', label: 'Likely Authentic', img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%23f8fafc"/><line x1="100" y1="125" x2="300" y2="125" stroke="%23f1f5f9" stroke-width="20"/></svg>' }
    ]
  };

  const currentExamples = examples[modality] || examples.image;

  return (
    <div className="example-carousel">
      <h3>Example {modality.charAt(0).toUpperCase() + modality.slice(1)} Verification</h3>
      <div className="carousel-track">
        {currentExamples.map(ex => (
          <div key={ex.id} className="carousel-card">
            <div className="carousel-image">
              <img src={ex.img} alt={ex.title} />
              {ex.hasPlay && (
                <div className="play-overlay">
                  <Play size={24} fill="currentColor" />
                </div>
              )}
              <span className={`carousel-badge ${ex.label === 'Suspicious' ? 'badge-suspicious' : 'badge-authentic'}`}>
                {ex.label}
              </span>
            </div>
            <div className="carousel-info">
              <strong>{ex.title}</strong>
              <span className="carousel-action">View Analysis →</span>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
}
