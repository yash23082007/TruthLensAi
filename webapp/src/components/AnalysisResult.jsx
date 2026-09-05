import { useEffect, useState } from 'react';
import Icon from './Icon';

const verdictFor = (result) => {
  if (result.is_authentic) return 'Likely authentic';
  if (['high', 'critical'].includes(result.risk_level)) return 'Suspicious signals found';
  return 'Inconclusive';
};

const titleCase = (value = '') => value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

export const normalizeAnalysisResult = (response) => ({
  modality: response.content_type,
  score: Number(response.trust_score),
  riskLevel: response.risk_level || 'unknown',
  verdict: verdictFor(response),
  isAuthentic: Boolean(response.is_authentic),
  explanation: response.explanation || response.summary,
  summary: response.summary,
  findings: Array.isArray(response.details) ? response.details : [],
  extractedText: response.extracted_text,
  claimsVerified: response.claims_verified,
  claimsFlagged: response.claims_flagged,
  totalFrames: response.total_frames,
  deepfakeFrames: response.deepfake_frames,
  processingTime: response.processing_time_ms,
});

export default function AnalysisResult({ response, onReset }) {
  const [shown, setShown] = useState(false);
  const result = normalizeAnalysisResult(response);
  useEffect(() => { const timer = window.setTimeout(() => setShown(true), 70); return () => window.clearTimeout(timer); }, [response]);
  return <section className={`analysis-result ${shown ? 'is-visible' : ''}`} aria-live="polite" id="verification-result">
    <div className="result-heading"><span className="result-found"><Icon name="check" size={15} /> Result found</span><h2>Verification Result</h2><p>{result.summary}</p></div>
    <div className="result-overview"><div className="verdict-block"><span className={`verdict-icon ${result.riskLevel}`}><Icon name={result.isAuthentic ? 'check' : 'lens'} size={23} /></span><div><span className="detail-label">Verdict</span><h3>{result.verdict}</h3><span className={`risk-badge ${result.riskLevel}`}>{titleCase(result.riskLevel)} risk</span></div></div><div className="score-block"><div className="score-ring" style={{ '--score': `${Math.min(100, Math.max(0, result.score)) * 3.6}deg` }}><div><strong>{Number.isFinite(result.score) ? result.score.toFixed(result.score % 1 ? 1 : 0) : '—'}</strong><small>/ 100</small></div></div><div><span className="detail-label">Trust score</span><p>Higher scores reflect more flagged signals from the backend analysis.</p></div></div></div>
    <div className="analysis-grid"><article className="explanation-card"><span className="card-kicker"><Icon name="lens" size={16} /> Why this result?</span><p>{result.explanation}</p><small>TruthLens provides an automated assessment based on detected signals. It is not a guarantee of authenticity.</small></article><article className="findings-card"><span className="card-kicker"><Icon name="document" size={16} /> Findings</span>{result.findings.length ? <div className="finding-list">{result.findings.map((finding, index) => <div className="finding" style={{ '--delay': `${index * 70}ms` }} key={`${finding.category}-${index}`}><span className={`finding-dot ${finding.severity}`} /><div><b>{titleCase(finding.category)}</b><p>{finding.finding}</p></div><span className={`severity ${finding.severity}`}>{finding.severity}</span></div>)}</div> : <p className="empty-findings">The analyzer did not return individual findings for this assessment.</p>}</article></div>
    {(result.extractedText || Number.isInteger(result.claimsVerified) || Number.isInteger(result.totalFrames)) && <div className="result-details">{result.extractedText && <article><span className="detail-label">Extracted text</span><p>{result.extractedText}</p></article>}{Number.isInteger(result.claimsVerified) && <article><span className="detail-label">Claims reviewed</span><p>{result.claimsVerified} verified · {result.claimsFlagged || 0} flagged</p></article>}{Number.isInteger(result.totalFrames) && <article><span className="detail-label">Video sampling</span><p>{result.deepfakeFrames ?? 0} flagged of {result.totalFrames} sampled frames</p></article>}</div>}
    <div className="result-actions"><button className="button button-primary" onClick={onReset}>Verify Another <Icon name="arrow" size={16} /></button>{Number.isFinite(result.processingTime) && <span>Analysis completed in {Math.round(result.processingTime)} ms</span>}</div>
  </section>;
}
