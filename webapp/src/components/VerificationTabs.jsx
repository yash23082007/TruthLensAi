import { modalityConfig } from './verifierConfig';
import Icon from './Icon';

export default function VerificationTabs({ active, onChange }) {
  return <div className="verification-tabs" role="tablist" aria-label="Verification type">{Object.entries(modalityConfig).map(([key, config]) => <button key={key} role="tab" aria-selected={active === key} className={active === key ? 'active' : ''} onClick={() => onChange(key)}><Icon name={config.icon} size={16} />{config.label}</button>)}</div>;
}
