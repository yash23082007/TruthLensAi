import React from 'react';
import { Link } from 'react-router-dom';
import './VerificationTabs.css';

export default function VerificationTabs({ activeModality }) {
  const tabs = [
    { id: 'text', label: 'Text' },
    { id: 'image', label: 'Image' },
    { id: 'video', label: 'Video' },
    { id: 'audio', label: 'Audio' }
  ];

  return (
    <div className="verification-tabs">
      {tabs.map(tab => (
        <Link 
          key={tab.id}
          to={`/verify/${tab.id}`} 
          className={`tab-item ${activeModality === tab.id ? 'active' : ''}`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
