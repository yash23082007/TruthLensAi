import { useEffect, useState } from 'react';
import Brand from './Brand';
import Icon from './Icon';

export default function SignInDialog({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => { if (!isOpen) { setSubmitted(false); setEmail(''); } }, [isOpen]);
  useEffect(() => { const onKey = (event) => { if (event.key === 'Escape') onClose(); }; if (isOpen) document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey); }, [isOpen, onClose]);
  if (!isOpen) return null;
  const submit = (event) => { event.preventDefault(); if (email.trim()) setSubmitted(true); };
  return <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}><section className="sign-in-dialog" role="dialog" aria-modal="true" aria-labelledby="sign-in-heading" onMouseDown={(event) => event.stopPropagation()}><button className="dialog-close" onClick={onClose} aria-label="Close sign in"><Icon name="close" size={20} /></button><Brand compact />
    {submitted ? <div className="dialog-confirmation"><span><Icon name="check" size={25} /></span><h2 id="sign-in-heading">Thanks — you’re on the list.</h2><p>This demo does not connect to an account service yet. You can continue verifying content without signing in.</p><button className="button button-primary" onClick={onClose}>Continue</button></div> : <form onSubmit={submit}><h2 id="sign-in-heading">Sign in to TruthLens</h2><p>Account access is being prepared. Leave your email to be notified when it’s available.</p><label htmlFor="sign-in-email">Email address</label><input id="sign-in-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoFocus required /><button className="button button-primary" type="submit">Continue <Icon name="arrow" size={16} /></button><small>Verification remains available without an account.</small></form>}
  </section></div>;
}
