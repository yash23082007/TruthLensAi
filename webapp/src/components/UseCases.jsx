import React from 'react';
import './UseCases.css';

const USE_CASES = [
  {
    id: 'journalists',
    title: "Newsroom Editorial & Breaking Video Verification",
    tag: "Investigative Journalism",
    image: "/images/journalist.jpg",
    quote: "“TruthLens prevented our broadcast from airing an AI-generated breaking news clip. The frame-by-frame temporal consistency and audio forensic audit proved the face-swap in seconds.”",
    author: "Marcus Vance",
    role: "Senior Investigative Reporter, Global News Bureau",
    description: "Reporters run user-generated footage through the video forensic pipeline to verify clips before publication, catching facial boundary jitter and synthesized audio before broadcast."
  },
  {
    id: 'creators',
    title: "Digital Identity & Brand Protection for Creators",
    tag: "Brand & IP Security",
    image: "/images/creator.jpg",
    quote: "“I found a cloned version of my voice running unauthorized financial promotions. TruthLens generated a cryptographic certificate with SHA-256 hashes that secured takedowns in hours.”",
    author: "Elena Rostova",
    role: "Tech Creator & Streamer",
    description: "Creators and executives scan online media to detect unauthorized voice cloning and deepfake impersonation, generating tamper-proof evidence packages for swift takedown enforcement."
  },
  {
    id: 'education',
    title: "Classroom Media Literacy & Historical Verification",
    tag: "Education & Research",
    image: "/images/teacher.jpg",
    quote: "“My students analyzed viral historical photos and were stunned by how many were modern diffusion generations. The technical breakdown made digital forensics immediately accessible.”",
    author: "Emily Harper",
    role: "History & Media Educator",
    description: "Educators utilize TruthLens to demonstrate how EXIF metadata, frequency transforms, and noise consistency separate historical records from synthetic reinterpretations."
  },
  {
    id: 'defense',
    title: "Defense Against Synthetic Voice Wire Fraud",
    tag: "Phishing & Fraud Defense",
    image: "/images/family.jpg",
    quote: "“A distress call sounded identical to a family member. We recorded it into TruthLens and it flagged a 94% neural clone instantly, protecting us from an urgent financial scam.”",
    author: "David Chen",
    role: "Security Engineer & Parent",
    description: "Security teams and families screen suspicious audio recordings for robotic formant shifts and unnatural pitch flatness typical of neural speech generators."
  }
];

const UseCases = () => {
  return (
    <section className="use-cases-section container">
      <div className="section-header-block centered">
        <div className="section-tag">Industry Applications</div>
        <h2 className="section-main-title">Trusted for Mission-Critical Verification</h2>
        <p className="section-main-desc">
          From newsroom broadcast desks to enterprise brand defense, TruthLens delivers instant forensic clarity against synthetic deception.
        </p>
      </div>

      <div className="use-cases-grid">
        {USE_CASES.map((item) => (
          <div key={item.id} className="use-case-card glass-card">
            <div className="use-case-top">
              <div className="case-img-container">
                <img src={item.image} alt={item.title} className="case-avatar" />
              </div>
              <div className="case-meta">
                <span className="case-tag">{item.tag}</span>
                <h3 className="case-title">{item.title}</h3>
              </div>
            </div>

            <p className="case-desc">{item.description}</p>
            
            <div className="case-quote-box">
              <p className="quote-body">{item.quote}</p>
              <div className="quote-author-row">
                <strong className="quote-author">{item.author}</strong>
                <span className="quote-role">{item.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UseCases;
