import React, { useState } from 'react';
import './SignInModal.css';

const SignInModal = ({ isOpen, onClose, onSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      if (onSignInSuccess) onSignInSuccess(email);
      onClose();
    }, 600);
  };

  return (
    <div className="auth-modal-overlay animate-fade-in" onClick={onClose}>
      <div className="auth-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose} aria-label="Close modal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="auth-header">
          <div className="brand-icon small">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <circle cx="12" cy="11" r="3"/>
            </svg>
          </div>
          <h2>{isSignUp ? 'Create TruthLens Workspace' : 'Sign in to TruthLens'}</h2>
          <p>{isSignUp ? 'Provision API keys, batch processing, and audit logs.' : 'Access your forensic scan history, certificates, and API tokens.'}</p>
        </div>

        {submitted ? (
          <div className="auth-success-state animate-fade-in">
            <div className="success-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <h3>Authentication Successful</h3>
            <p>Entering secure forensic workspace...</p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="auth-email">WORK EMAIL</label>
              <input
                id="auth-email"
                type="email"
                placeholder="name@organization.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="auth-field">
              <label htmlFor="auth-password">PASSWORD</label>
              <input
                id="auth-password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full auth-submit-btn">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>

            <div className="auth-toggle-row">
              <span>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>
              <button
                type="button"
                className="auth-toggle-btn"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Sign In' : 'Sign Up Free'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignInModal;
