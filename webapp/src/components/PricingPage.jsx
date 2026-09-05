import Icon from './Icon';

const plans = [
  ['Personal', 'Start with a single content check.', ['Text, image, video, and audio workflows', 'Human-readable results', 'No account required for the current verifier'], 'Start verifying'],
  ['For teams', 'For review workflows that need shared context.', ['A future option for team workflows', 'Designed for explainable assessments', 'Contact us to discuss your use case'], 'Talk to us'],
  ['For builders', 'Integrate the available API into your own workflow.', ['FastAPI analysis endpoints', 'Existing request and response contracts', 'Run it within your own environment'], 'View API info'],
];

export default function PricingPage({ onNavigate }) {
  return <div className="page-enter"><section className="simple-page-hero pricing-hero container"><span className="eyebrow">Pricing</span><h1>Start with a clearer view.</h1><p>TruthLens is currently presented as a local verification experience. These paths describe the ways the product is designed to grow, without implying features that are not available today.</p></section><section className="pricing-grid container">{plans.map(([name, description, features, action], index) => <article className={index === 1 ? 'featured' : ''} key={name}>{index === 1 && <span className="plan-note">Planned workflow</span>}<h2>{name}</h2><p>{description}</p><ul>{features.map((feature) => <li key={feature}><Icon name="check" size={16} />{feature}</li>)}</ul><button className={index === 1 ? 'button button-secondary' : 'button button-primary'} onClick={() => index === 2 ? onNavigate('/about') : onNavigate('/verify/image')}>{action}<Icon name="arrow" size={16} /></button></article>)}</section><section className="pricing-note container"><Icon name="alert" size={18} /><p>TruthLens provides automated, heuristic assessments. It does not represent a guarantee of authenticity or a production forensic service.</p></section></div>;
}
