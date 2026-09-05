import FAQAccordion from './FAQAccordion';

export default function FAQPage() {
  return <div className="page-enter"><section className="simple-page-hero faq-page-hero container"><span className="eyebrow">Frequently asked questions</span><h1>Understand the tool before you use the result.</h1><p>TruthLens is built around clear expectations about what an automated content assessment can tell you.</p></section><section className="faq-page-content container"><FAQAccordion /></section></div>;
}
