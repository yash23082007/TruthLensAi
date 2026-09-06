import React from 'react';
import { Play } from 'lucide-react';
import './ExampleCarousel.css';

export default function ExampleCarousel({ modality }) {
  const examples = {
    image: [
      { id: 1, title: 'AI-Generated Portrait', label: 'Suspicious', img: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=400' },
      { id: 2, title: 'Manipulated News Photo', label: 'Suspicious', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400' },
      { id: 3, title: 'Authentic Photograph', label: 'Likely Authentic', img: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&q=80&w=400' }
    ],
    video: [
      { id: 1, title: 'News Presentation', label: 'Suspicious', img: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=400', hasPlay: true },
      { id: 2, title: 'Video Call Deepfake', label: 'Suspicious', img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400', hasPlay: true },
      { id: 3, title: 'Authentic Interview', label: 'Likely Authentic', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400', hasPlay: true }
    ],
    audio: [
      { id: 1, title: 'Voice Clone (Phishing)', label: 'Suspicious', img: 'https://images.unsplash.com/photo-1520698851410-60b64becc0d4?auto=format&fit=crop&q=80&w=400', hasPlay: true },
      { id: 2, title: 'Synthetic TTS Audio', label: 'Suspicious', img: 'https://images.unsplash.com/photo-1588691515250-9371059f3791?auto=format&fit=crop&q=80&w=400', hasPlay: true },
      { id: 3, title: 'Authentic Recording', label: 'Likely Authentic', img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400', hasPlay: true }
    ],
    text: [
      { id: 1, title: 'Phishing Email', label: 'Suspicious', img: 'https://images.unsplash.com/photo-1579389083046-d3ce19614145?auto=format&fit=crop&q=80&w=400' },
      { id: 2, title: 'AI-Generated Article', label: 'Suspicious', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400' },
      { id: 3, title: 'Human Written Essay', label: 'Likely Authentic', img: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=400' }
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
