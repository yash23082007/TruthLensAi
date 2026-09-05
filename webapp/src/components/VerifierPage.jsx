import { useEffect, useState } from 'react';
import { analyzeContent } from '../utils/api';
import AnalysisResult from './AnalysisResult';
import AudioArtwork from './AudioArtwork';
import FAQAccordion from './FAQAccordion';
import Icon from './Icon';
import MediaUploader from './MediaUploader';
import VerificationTabs from './VerificationTabs';
import { modalityConfig } from './verifierConfig';

const examples = {
  image: [['public-information.png', 'Public information', 'Inspect an image before sharing it'], ['workshop.png', 'Document context', 'Review text and image signals together'], ['hero-home.png', 'Social post', 'Pause before trusting a visual claim']],
  video: [['public-information.png', 'News / public video', 'Review a public-facing clip'], ['workshop.png', 'Document / presentation', 'Look for context in a recorded presentation'], ['video-call.png', 'Video call', 'Assess signals in a shared recording']],
  audio: [['video-call.png', 'Unexpected call', 'Review an unfamiliar voice message'], ['public-information.png', 'Creator recording', 'Check a claimed speaker or clip'], ['hero-home.png', 'Family request', 'Pause before acting on a voice note']],
  text: [['workshop.png', 'Financial message', 'Assess pressure or phishing language'], ['public-information.png', 'Public claim', 'Review claims before repeating them'], ['hero-home.png', 'Social post', 'Check language and extracted claims']],
};

function ContextVisual({ modality, config }) {
  if (modality === 'audio') return <AudioArtwork />;
  if (modality === 'text') return <div className="text-context-art"><span><Icon name="document" size={25} /></span><i /><i /><i /><i /><b>Check the language.<br />Understand the signals.</b></div>;
  return <div className="media-context-art"><img src={config.visual} alt="Illustrative verification scenario" /><span>Illustrative scenario</span><div className="focus-corner one" /><div className="focus-corner two" /><p><Icon name="lens" size={16} /> Look closer</p></div>;
}

function ExampleCarousel({ modality }) {
  const [active, setActive] = useState(0);
  const cards = examples[modality];
  const visible = [0, 1, 2].map((offset) => cards[(active + offset) % cards.length]);
  return <section className="example-section"><div className="section-heading split"><div><span className="eyebrow">Example scenarios</span><h2>Built for the moments you pause.</h2></div><div className="carousel-controls"><button aria-label="Previous examples" onClick={() => setActive((active + cards.length - 1) % cards.length)}>←</button><button aria-label="Next examples" onClick={() => setActive((active + 1) % cards.length)}>→</button></div></div><div className="example-cards">{visible.map(([image, title, description], index) => <article key={`${image}-${index}`}><div className="example-image"><img src={`/images/${image}`} alt="" /><span className="example-tag">Example</span>{modality === 'video' && <span className="play-button"><Icon name="play" size={18} /></span>}</div><h3>{title}</h3><p>{description}</p></article>)}</div><div className="carousel-dots" aria-hidden="true">{cards.map((_, index) => <i key={index} className={index === active ? 'active' : ''} />)}</div></section>;
}

export default function VerifierPage({ modality, onNavigate }) {
  const config = modalityConfig[modality];
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  useEffect(() => { setFile(null); setText(''); setResult(null); setError(''); setStatus('idle'); }, [modality]);
  const ready = modality === 'text' ? text.trim().length > 0 : Boolean(file);
  const submit = async (event) => { event.preventDefault(); if (!ready || status === 'loading') return; setStatus('loading'); setError(''); setResult(null); try { const response = await analyzeContent(modality === 'text' ? text.trim() : file, modality); setResult(response); window.setTimeout(() => document.getElementById('verification-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80); } catch (requestError) { setError(requestError.message || 'The verification service is unavailable. Please try again.'); } finally { setStatus('idle'); } };
  const reset = () => { setFile(null); setText(''); setResult(null); setError(''); window.setTimeout(() => document.getElementById('verify-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0); };
  return <div className="page-enter"><section className="verifier-hero container"><span className="eyebrow">Multimodal content verification</span><h1>{config.title}</h1><p>{config.description}</p><VerificationTabs active={modality} onChange={(next) => onNavigate(`/verify/${next}`)} /></section>
    <section className="verify-workspace container" id="verify-workspace"><form className="verify-form" onSubmit={submit}><div className="verify-form-main">{modality === 'text' ? <div className="text-verifier"><textarea value={text} onChange={(event) => { setText(event.target.value); setError(''); }} placeholder={config.placeholder} disabled={status === 'loading'} aria-label="Text to verify" /><div><span>{text.length.toLocaleString()} characters</span><span>{text.trim() ? text.trim().split(/\s+/).length : 0} words</span></div></div> : <MediaUploader modality={modality} config={config} file={file} onFileChange={setFile} disabled={status === 'loading'} error={error} onError={setError} />}{modality === 'text' && error && <p className="form-error" role="alert"><Icon name="alert" size={16} />{error}</p>}<div className="review-strip"><div className="avatar-stack"><img src="/images/public-information.png" alt="" /><img src="/images/workshop.png" alt="" /><img src="/images/hero-home.png" alt="" /></div><span>Designed for clear, explainable verification</span></div><button className="button button-primary analysis-button" type="submit" disabled={!ready || status === 'loading'}>{status === 'loading' ? <><span className="loading-ring" />Analyzing your content…</> : <>{config.action}<Icon name="arrow" size={17} /></>}</button></div><ContextVisual modality={modality} config={config} /></form></section>
    {result && <div className="container"><AnalysisResult response={result} onReset={reset} /></div>}
    <ExampleCarousel modality={modality} />
    <section className="verifier-info"><div className="container info-grid"><div><span className="eyebrow">Understand the assessment</span><h2>Signals, not sensationalism.</h2></div><p>TruthLens turns the details returned by its analyzers into a clear result: an assessment, risk level, explanation, and the findings behind it. It is designed to help you make a more informed next decision.</p><div className="info-link"><Icon name="lens" size={20} /><span>Automated assessment<br />with human-readable context</span></div></div></section>
    <section className="faq-section container"><div className="section-heading centered"><span className="eyebrow">Questions, answered</span><h2>What to know before you verify.</h2></div><FAQAccordion /></section><section className="small-cta container"><div><span className="eyebrow">Start with what you have</span><h2>One place to check the content in front of you.</h2></div><button className="button button-primary" onClick={() => document.getElementById('verify-workspace')?.scrollIntoView({ behavior: 'smooth' })}>Verify another item <Icon name="arrow" size={17} /></button></section>
  </div>;
}
