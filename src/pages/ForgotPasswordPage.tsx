import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigate: (route: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const { resetPassword, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const validateEmail = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return 'Email address is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    setConfirmationMessage('');

    const err = validateEmail(email);
    setEmailError(err);
    if (err) return;

    const result = await resetPassword(email);
    if (result.error) {
      setGeneralError(result.error);
    } else if (result.successMessage) {
      setConfirmationMessage(result.successMessage);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card-wrapper">
        <div className="auth-card">
          <Logo size={94} />

          <div className="auth-header">
            <h1 className="auth-title">Reset Password</h1>
            <p className="auth-subtitle">
              Enter your email to receive recovery instructions.
            </p>
          </div>

          {generalError && (
            <div className="alert-banner error" role="alert">
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>{generalError}</div>
            </div>
          )}

          {confirmationMessage ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: '#ECFDF5',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                }}
              >
                <CheckCircle2 size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111827' }}>
                Instructions Sent
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {confirmationMessage}
              </p>
              <button
                type="button"
                className="primary-button"
                onClick={() => onNavigate('login')}
              >
                Return to Sign In
              </button>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="reset-email" className="form-label">
                  REGISTERED EMAIL ADDRESS
                </label>
                <div className="input-wrapper">
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="Enter your email address"
                    className={`form-input ${emailError ? 'has-error' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {emailError && <span className="field-error">{emailError}</span>}
              </div>

              <button
                type="submit"
                id="reset-submit-btn"
                className="primary-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <span>Send Recovery Instructions</span>
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => onNavigate('login')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <ArrowLeft size={16} />
                  <span>Back to Sign In</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
