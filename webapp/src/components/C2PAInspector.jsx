import React, { useState } from 'react';
import './C2PAInspector.css';

const SAMPLE_METADATA = [
  {
    id: 'meta-ai',
    title: 'Midjourney v6.1 Generation (Cryptographic Signature Missing)',
    status: 'FLAGGED',
    provenance: 'UNVERIFIED',
    generator: 'Midjourney Prompt Diffusion Engine',
    camera: 'None (Pure Computational Render)',
    lens: 'N/A',
    software: 'Automatic1111 / ComfyUI / Midjourney Bot',
    c2pa_manifest: 'ABSENT',
    prnu_sensor_pattern: 'UNNATURAL (No Silicon Substrate PRNU Detected)',
    details: [
      { key: 'EXIF Tag 0x0131 (Software)', value: 'Midjourney v6.1 AI Generator' },
      { key: 'Color Profile', value: 'sRGB IEC61966-2.1 (Standard Synthesized)' },
      { key: 'Compression Quantization', value: 'Quantization Matrix Table Non-Standard (GAN spill)' },
      { key: 'Digital Watermark (SynthID)', value: 'Positive AI latent watermark match (97.4%)' }
    ]
  },
  {
    id: 'meta-real',
    title: 'Sony Alpha A7R V (Hardware Authenticated)',
    status: 'AUTHENTIC',
    provenance: 'VERIFIED',
    generator: 'Physical Optical Sensor',
    camera: 'Sony ILCE-7RM5',
    lens: 'FE 24-70mm F2.8 GM II',
    software: 'Sony Camera OS Firmware v2.01',
    c2pa_manifest: 'C2PA-v1.3 VALID (Signed by Sony PKI Root)',
    prnu_sensor_pattern: 'AUTHENTIC (Silicon Photo-Diode Noise Floor Match)',
    details: [
      { key: 'Exposure Time', value: '1/250 sec at f/4.0, ISO 100' },
      { key: 'GPS Geolocation Tag', value: '37.7749° N, 122.4194° W' },
      { key: 'Shutter Count Signature', value: 'Actuation #14,821 verified' },
      { key: 'Cryptographic C2PA Signature', value: 'SHA-384 RSA-4096 valid hardware key' }
    ]
  }
];

const C2PAInspector = ({ onBack }) => {
  const [selectedMeta, setSelectedMeta] = useState(SAMPLE_METADATA[0]);

  return (
    <div className="c2pa-inspector container animate-fade-in">
      <div className="c2pa-header">
        <div>
          <div className="section-stamp">Provenance & Cryptographic Auditing</div>
          <h1 className="c2pa-title">C2PA & CONTENT CREDENTIALS AUDITOR</h1>
          <p className="c2pa-subtitle">
            Inspect hardware camera sensor PRNU noise, Adobe Content Authenticity Initiative (C2PA) digital signatures, and AI watermark provenance headers.
          </p>
        </div>
        {onBack && (
          <button className="btn btn-secondary" onClick={onBack}>
            ← BACK TO SCANNER
          </button>
        )}
      </div>

      {/* Selector */}
      <div className="c2pa-presets">
        <span className="preset-label">INSPECTION PRESETS:</span>
        {SAMPLE_METADATA.map((sample) => (
          <button
            key={sample.id}
            className={`c2pa-chip ${selectedMeta.id === sample.id ? 'active' : ''}`}
            onClick={() => setSelectedMeta(sample)}
          >
            <span className={`status-dot ${sample.status.toLowerCase()}`}></span>
            {sample.title}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="c2pa-grid">
        {/* Left: Provenance Summary */}
        <div className="c2pa-summary-card glass-card">
          <div className="c2pa-top">
            <span className={`c2pa-badge ${selectedMeta.status.toLowerCase()}`}>
              {selectedMeta.status}
            </span>
            <span className="c2pa-id">MANIFEST AUDIT</span>
          </div>

          <h3 className="c2pa-item-title">{selectedMeta.title}</h3>

          <div className="provenance-metrics">
            <div className="prov-row">
              <span className="p-lbl">ORIGIN GENERATOR:</span>
              <strong className="p-val">{selectedMeta.generator}</strong>
            </div>
            <div className="prov-row">
              <span className="p-lbl">CAMERA HARDWARE:</span>
              <strong className="p-val">{selectedMeta.camera}</strong>
            </div>
            <div className="prov-row">
              <span className="p-lbl">OPTICAL LENS:</span>
              <strong className="p-val">{selectedMeta.lens}</strong>
            </div>
            <div className="prov-row">
              <span className="p-lbl">C2PA SIGNATURE:</span>
              <strong className={`p-val ${selectedMeta.provenance === 'VERIFIED' ? 'text-success' : 'text-danger'}`}>
                {selectedMeta.c2pa_manifest}
              </strong>
            </div>
            <div className="prov-row">
              <span className="p-lbl">SENSOR PRNU NOISE:</span>
              <strong className="p-val">{selectedMeta.prnu_sensor_pattern}</strong>
            </div>
          </div>
        </div>

        {/* Right: Granular EXIF & IPTC Header Breakdown */}
        <div className="c2pa-details-card glass-card">
          <h3>EMBEDDED METADATA AUDIT STREAM</h3>

          <div className="tags-table">
            <div className="tags-head">
              <span>METADATA FIELD</span>
              <span>PARSED VALUE</span>
            </div>
            {selectedMeta.details.map((item, idx) => (
              <div key={idx} className="tags-row">
                <span className="t-key">{item.key}</span>
                <span className="t-val">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="c2pa-advisory">
            <strong>ℹ️ FORENSIC ADVISORY:</strong>
            <p>
              Metadata can be stripped by social media compression pipelines. TruthLens combines C2PA manifest audits with neural pixel-level heuristics to provide reliable verification even when EXIF headers have been cleared.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default C2PAInspector;
