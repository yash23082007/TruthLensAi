import Icon from './Icon';

export default function Brand({ compact = false }) {
  return <span className="brand" aria-label="TruthLens AI"><span className="brand-mark"><Icon name="lens" size={compact ? 16 : 18} strokeWidth={2.15} /></span><span>TruthLens <i>AI</i></span></span>;
}
