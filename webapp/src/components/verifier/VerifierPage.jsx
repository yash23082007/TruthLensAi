import React, { useState } from 'react';
import VerificationTabs from './VerificationTabs';
import MediaUploader from './MediaUploader';
import ExampleCarousel from './ExampleCarousel';
import ResultExperience from '../result/ResultExperience';
import './VerifierPage.css';

export default function VerifierPage({ modality }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const getHeaders = () => {
    switch (modality) {
      case 'text':
        return {
          title: 'Text Verification',
          subtitle: 'Analyze text, messages, and claims to detect AI-generated content or suspicious manipulation patterns.'
        };
      case 'image':
        return {
          title: 'Image Verification',
          subtitle: 'Upload an image to detect AI generation, deepfakes, face swaps, and metadata anomalies.'
        };
      case 'video':
        return {
          title: 'Video Verification',
          subtitle: 'Analyze video files frame-by-frame for deepfake signatures, splices, and audio-visual desync.'
        };
      case 'audio':
        return {
          title: 'Audio Verification',
          subtitle: 'Detect voice cloning, synthetic speech, and unnatural audio patterns in voice recordings.'
        };
      default:
        return { title: 'Verification', subtitle: 'Upload media to analyze.' };
    }
  };

  const { title, subtitle } = getHeaders();

  const handleAnalyze = async (payload, type) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      if (type === 'text') {
        formData.append('text', payload);
      } else {
        formData.append('file', payload);
      }

      // We use the existing backend endpoint
      const response = await fetch(`http://localhost:8000/api/analyze/${modality}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error('Error during analysis:', error);
      alert('Analysis failed. Please ensure the backend is running and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="verifier-page page-enter">
      <div className="container verifier-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <VerificationTabs activeModality={modality} />
      </div>

      <div className="container verifier-workspace">
        <div className="verifier-grid">
          
          <div className="verifier-panel upload-panel">
            <MediaUploader 
              modality={modality} 
              onFileSelected={(file) => handleAnalyze(file, 'file')}
              onTextSubmit={(text) => handleAnalyze(text, 'text')}
              isAnalyzing={isAnalyzing}
            />
          </div>
          
          <div className="verifier-panel info-panel">
            <h3>What we check</h3>
            <ul className="check-list">
              <li>
                <div className="check-dot"></div>
                <div>
                  <strong>Deep Learning Forensics</strong>
                  <span>State-of-the-art HuggingFace models for {modality} analysis</span>
                </div>
              </li>
              <li>
                <div className="check-dot"></div>
                <div>
                  <strong>Heuristic Signatures</strong>
                  <span>Detects known AI generation tools and patterns</span>
                </div>
              </li>
              <li>
                <div className="check-dot"></div>
                <div>
                  <strong>Structural Anomalies</strong>
                  <span>Analyzes file metadata and byte-level inconsistencies</span>
                </div>
              </li>
            </ul>

            <ExampleCarousel modality={modality} />
          </div>

        </div>

        {/* Render Result Experience if we have data */}
        {analysisResult && (
          <div id="result-section" className="result-section">
            <ResultExperience result={analysisResult} modality={modality} />
          </div>
        )}
      </div>
    </div>
  );
}
