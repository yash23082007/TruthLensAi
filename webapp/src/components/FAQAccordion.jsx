import { useState } from 'react';
import Icon from './Icon';

export const commonFAQs = [
  ['What does TruthLens assess?', 'TruthLens checks content for signals its available analyzers can identify — including manipulation indicators, AI-content patterns, scam or phishing language, and claim-related signals.'],
  ['Does a result prove that content is real or fake?', 'No. TruthLens provides an automated, heuristic assessment based on detected signals. Treat the result as context for your decision, not a guarantee of authenticity.'],
  ['What can I verify?', 'You can submit text, images, videos, and audio recordings. Accepted file formats and limits are shown in each verifier.'],
  ['Why can different content receive different kinds of findings?', 'Each modality is handled by a distinct analyzer, so the evidence available in an image, a video, a recording, and a message is different.'],
  ['Do I need an account?', 'No. The current verification workflow is available without an account.'],
];

export default function FAQAccordion({ items = commonFAQs }) {
  const [open, setOpen] = useState(0);
  return <div className="faq-list">{items.map(([question, answer], index) => <article className="faq-item" key={question}><button aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span>{question}</span><Icon name="chevron" size={18} /></button>{open === index && <p>{answer}</p>}</article>)}</div>;
}
