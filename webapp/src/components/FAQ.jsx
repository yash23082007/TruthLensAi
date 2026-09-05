import React, { useState } from 'react';
import './FAQ.css';

const FAQ_DATA = {
  home: [
    {
      q: "How does TruthLens detect deepfakes?",
      a: "We combine multiple analysis methods: error level analysis for compression artifacts, frequency spectrum analysis for GAN signatures, facial landmark tracking for face swaps, and acoustic analysis for voice clones."
    },
    {
      q: "Is uploaded media retained or stored on your servers?",
      a: "No. Files are processed in memory and discarded immediately after analysis. Nothing is stored."
    },
    {
      q: "Can the system verify Content Authenticity Initiative (C2PA) credentials?",
      a: "Yes. TruthLens contains a dedicated C2PA inspector that parses cryptographic manifests, certificates from hardware cameras (like Sony and Leica), and digital watermark signatures to verify original provenance."
    },
    {
      q: "How does the live consensus fact verification work?",
      a: "We extract factual claims from text, run them against knowledge bases, and use calibrated language models to flag likely misinformation."
    }
  ],
  image: [
    {
      q: "Which AI generation tools can be detected in images?",
      a: "Our image forensic pipeline detects signatures and artifacts from Midjourney, Stable Diffusion, DALL-E, Flux, Imagen, ComfyUI, and generative inpainting tools by analyzing high-frequency noise profiles and EXIF metadata markers."
    },
    {
      q: "What image formats and file size limits are supported?",
      a: "TruthLens supports JPG, JPEG, PNG, WEBP, BMP, and GIF formats up to 100MB per file."
    }
  ],
  video: [
    {
      q: "How does frame-by-frame deepfake video analysis work?",
      a: "The system samples video frames dynamically using OpenCV, evaluating inter-frame lighting changes, facial landmark micro-jitter, and audio-video lip synchronization consistency."
    },
    {
      q: "Which video containers are supported?",
      a: "MP4, MOV, WEBM, AVI, and MKV video formats are supported with sample analyses up to 100MB."
    }
  ],
  audio: [
    {
      q: "How does voice clone detection differentiate human speech from AI audio?",
      a: "Human speech is characterized by organic pitch jitter, natural breath pauses, and acoustic vocal tract chaos. Neural text-to-speech generators produce mathematically uniform formants, flatter pitch contours, and sharp silence boundaries."
    },
    {
      q: "What audio formats can be analyzed?",
      a: "WAV, MP3, FLAC, OGG, AAC, and M4A audio files are supported up to 100MB."
    }
  ]
};

const FAQ = ({ type = 'home' }) => {
  const activeFaqs = FAQ_DATA[type] || FAQ_DATA.home;
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section container">
      <div className="section-header-block centered">
        <h2 className="section-main-title">FAQ</h2>
      </div>

      <div className="faq-list">
        {activeFaqs.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
              <button 
                className="faq-question-btn" 
                onClick={() => toggleFAQ(idx)}
                aria-expanded={isOpen}
              >
                <span className="faq-question-text">{item.q}</span>
                <div className="faq-chevron-box">
                  <svg 
                    className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              </button>
              {isOpen && (
                <div className="faq-answer animate-fade-in">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
