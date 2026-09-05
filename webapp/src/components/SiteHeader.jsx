import { useEffect, useRef, useState } from 'react';
import Brand from './Brand';
import Icon from './Icon';

const verifyLinks = [
  ['text', 'Text Verification', 'Check claims, messages, and articles', 'text'],
  ['image', 'Image Verification', 'Review visual and metadata signals', 'image'],
  ['video', 'Video Verification', 'Inspect sampled video signals', 'video'],
  ['audio', 'Audio Verification', 'Review voice and audio indicators', 'audio'],
];

export default function SiteHeader({ route, onNavigate, onHomeSection, onSignIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => { const close = (event) => { if (!menuRef.current?.contains(event.target)) setMenuOpen(false); }; document.addEventListener('mousedown', close); return () => document.removeEventListener('mousedown', close); }, []);
  const go = (to) => { setMenuOpen(false); setMobileOpen(false); onNavigate(to); };
  const verifyActive = route.page === 'verify';
  return <header className="site-header"><div className="container nav-shell">
    <button className="brand-button" onClick={() => go('/')}><Brand /></button>
    <nav className="desktop-nav" aria-label="Primary navigation">
      <button className={route.page === 'home' ? 'active' : ''} onClick={() => go('/')}>Home</button>
      <div className="verify-menu" ref={menuRef}><button className={verifyActive ? 'active' : ''} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>Verify <Icon name="chevron" size={14} /></button>
        {menuOpen && <div className="verify-dropdown">{verifyLinks.map(([slug, title, description, icon]) => <button key={slug} onClick={() => go(`/verify/${slug}`)}><span className="dropdown-icon"><Icon name={icon} size={17} /></span><span><b>{title}</b><small>{description}</small></span></button>)}</div>}
      </div>
      <button onClick={() => onHomeSection('how-it-works')}>How It Works</button><button className={route.page === 'about' ? 'active' : ''} onClick={() => go('/about')}>About</button><button className={route.page === 'pricing' ? 'active' : ''} onClick={() => go('/pricing')}>Pricing</button><button className={route.page === 'faq' ? 'active' : ''} onClick={() => go('/faq')}>FAQ</button>
    </nav>
    <div className="nav-actions"><button className="sign-in-link" onClick={onSignIn}>Sign In</button><button className="button button-primary nav-cta" onClick={() => go('/verify/image')}>Start Verifying <Icon name="arrow" size={16} /></button><button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}><span /><span /><span /></button></div>
  </div>{mobileOpen && <div className="mobile-nav container"><button onClick={() => go('/')}>Home</button>{verifyLinks.map(([slug, title]) => <button key={slug} onClick={() => go(`/verify/${slug}`)}>{title}</button>)}<button onClick={() => { setMobileOpen(false); onHomeSection('how-it-works'); }}>How It Works</button><button onClick={() => go('/about')}>About</button><button onClick={() => go('/pricing')}>Pricing</button><button onClick={() => go('/faq')}>FAQ</button><button onClick={() => { setMobileOpen(false); onSignIn(); }}>Sign In</button></div>}</header>;
}
