import React from 'react';
import './EditorialSection.css';

export default function EditorialSection({ layout, title, text, imageSrc, imageCaption }) {
  const isImageLeft = layout === 'image-left';

  return (
    <section className="container editorial-section">
      <div className={`editorial-grid ${isImageLeft ? 'image-left' : 'text-left'}`}>
        
        {isImageLeft && (
          <div className="editorial-visual">
            <img src={imageSrc} alt={imageCaption} />
            <div className="editorial-caption">{imageCaption}</div>
          </div>
        )}
        
        <div className="editorial-content">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>

        {!isImageLeft && (
          <div className="editorial-visual">
            <img src={imageSrc} alt={imageCaption} />
            <div className="editorial-caption">{imageCaption}</div>
          </div>
        )}
        
      </div>
    </section>
  );
}
