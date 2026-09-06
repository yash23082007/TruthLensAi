import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    question: "What is TruthLens AI?",
    answer: "TruthLens AI is a multimodal content verification platform designed to help you analyze digital media and understand whether it exhibits signs of manipulation, AI generation, or deception."
  },
  {
    question: "What types of content can TruthLens analyze?",
    answer: "TruthLens can analyze text (messages, articles, claims), images, videos, and audio recordings using specialized forensic models for each modality."
  },
  {
    question: "How does the Trust Score work?",
    answer: "The Trust Score is an aggregated metric based on multiple deep learning and heuristic signals. A higher score indicates a higher likelihood that the content is authentic and unaltered, while a low score indicates suspicious patterns."
  },
  {
    question: "Can TruthLens guarantee a file is authentic?",
    answer: "No. TruthLens provides an automated assessment based on detected signals. While our models are highly advanced, results are probabilistic and should be used as evidence to help you make an informed decision, not as an absolute guarantee."
  },
  {
    question: "Can TruthLens analyze screenshots?",
    answer: "Yes, but screenshots lose original metadata and compression artifacts. Our visual and text (OCR) analyzers can still evaluate the visible content for manipulation and claims."
  },
  {
    question: "Are uploaded files stored?",
    answer: "Files are processed securely in memory and discarded immediately after analysis. We do not store your media or use it to train our public models."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="container faq-section">
      <div className="faq-header">
        <h2>Frequently Asked Questions</h2>
      </div>
      
      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div className={`faq-item ${isOpen ? 'open' : ''}`} key={index}>
              <button 
                className="faq-trigger" 
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                {isOpen ? <ChevronUp size={20} className="faq-icon" /> : <ChevronDown size={20} className="faq-icon" />}
              </button>
              {isOpen && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
