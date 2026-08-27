import React from 'react';
import './UseCases.css';

const USE_CASES = [
  {
    id: 'teachers',
    title: "Teachers Spotting Fake Historical Photos",
    tag: "MEDIA LITERACY & EDUCATION",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
    quote: "“I used TruthLens during a lesson on WWII photography. My students uploaded viral images—and were shocked by how many were AI generates. The results came in 3 seconds with crystal clear reports.”",
    author: "Emily Harper",
    role: "High School History Teacher • 5.0 ★★★★★",
    description: "History educators utilize TruthLens AI to demonstrate digital verification methods in classrooms. By uploading viral historical pictures, students see how metadata checks and visual analysis separate authentic history from doctored representations, raising critical media literacy."
  },
  {
    id: 'journalists',
    title: "Journalists Verifying Breaking Viral Videos",
    tag: "NEWSROOM EDITORIAL DEFENSE",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80",
    quote: "“TruthLens saved our newsroom from broadcasting an AI-generated breaking news clip. The frame-by-frame temporal consistency and audio forensic audit proved the face-swap in seconds.”",
    author: "Marcus Vance",
    role: "Investigative Reporter, Global News Bureau • 5.0 ★★★★★",
    description: "Reporters run user-generated footage through the video forensic pipeline to verify clips before publication. Spotting frame inconsistencies and face-swap jitter protects publications from reporting fake incidents and spreading misinformation."
  },
  {
    id: 'creators',
    title: "Content Creators Protecting Digital Identity",
    tag: "BRAND & IP PROTECTION",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    quote: "“I found a cloned version of my voice promoting a crypto scam. TruthLens generated a cryptographic forensic certificate with SHA-256 hashes that helped me get the ads taken down within 2 hours.”",
    author: "Elena Rostova",
    role: "Tech Creator & Streamer • 5.0 ★★★★★",
    description: "Streamers and online creators scan web uploads to track if their face or voice clones are being used to run unauthorized ads or promotional scams, enabling swift takedown actions to protect their reputation."
  },
  {
    id: 'families',
    title: "Families Checking Deepfake Voice Scam Calls",
    tag: "PHONE PHISHING & FRAUD DEFENSE",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    quote: "“A voice sounded exactly like my daughter claiming an emergency. We recorded it into TruthLens and it flagged a 94% ElevenLabs neural clone instantly. It saved us from sending money to fraudsters.”",
    author: "David Chen",
    role: "Parent & Security Engineer • 5.0 ★★★★★",
    description: "With synthetic voice cloning on the rise, parents use TruthLens AI to verify suspicious distress voice notes. Detecting unnatural voice spectral patterns offers families quick peace of mind against digital kidnapping scams."
  }
];

const UseCases = () => {
  return (
    <section className="use-cases-section container">
      <div className="features-header left-aligned-section">
        <div className="section-stamp">Real-World Case Studies</div>
        <h2 className="use-case-main-title">WHO RELIES ON TRUTHLENS AI?</h2>
        <p className="use-case-main-desc">
          When generative tools make synthetic deception effortless, forensic verification must be accessible to everyone. Here is how newsrooms, classrooms, and families stay protected.
        </p>
      </div>

      <div className="use-cases-list">
        {USE_CASES.map((item, idx) => (
          <div key={item.id} className={`use-case-row glass-card ${idx % 2 === 1 ? 'reverse' : ''}`}>
            <div className="use-case-img-pane">
              <img src={item.image} alt={item.title} className="case-img" />
              <div className="case-tag-pill">{item.tag}</div>
            </div>

            <div className="use-case-info-pane">
              <h3 className="case-title">{item.title}</h3>
              <p className="case-desc">{item.description}</p>
              
              <div className="case-quote-box">
                <p className="quote-text">{item.quote}</p>
                <div className="quote-author-row">
                  <strong>{item.author}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UseCases;
