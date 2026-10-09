import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { GoogleButton } from '../components/GoogleButton';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (route: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { register, signInWithGoogle, isLoading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Validation errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const validate = () => {
    let valid = true;
    if (!fullName.trim()) {
      setNameError('Full name is required.');
      valid = false;
    } else {
      setNameError('');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match.');
      valid = false;
    } else {
      setConfirmError('');
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    setSuccessMessage('');

    if (!validate()) return;

    const result = await register(email, password, fullName);
    if (result.error) {
      setGeneralError(result.error);
    } else if (result.successMessage) {
      setSuccessMessage(result.successMessage);
    }
  };

  const handleGoogleRegister = async () => {
    setGeneralError('');
    setIsGoogleLoading(true);
    const result = await signInWithGoogle();
    setIsGoogleLoading(false);
    if (result.error) {
      setGeneralError(result.error);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card-wrapper">
        <div className="auth-card">
          <Logo size={94} />

          <div className="auth-header">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join NovaCode to start deploying smart QR &amp; NFC assets.</p>
          </div>

          {generalError && (
            <div className="alert-banner error" role="alert">
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>{generalError}</div>
            </div>
          )}

          {successMessage && (
            <div className="alert-banner success" role="status">
              <CheckCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>{successMessage}</div>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="reg-name" className="form-label">
                FULL NAME
              </label>
              <div className="input-wrapper">
                <input
                  id="reg-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className={`form-input ${nameError ? 'has-error' : ''}`}
                  disabled={isLoading}
                />
              </div>
              {nameError && <span className="field-error">{nameError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="reg-email" className="form-label">
                EMAIL ADDRESS
              </label>
              <div className="input-wrapper">
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={`form-input ${emailError ? 'has-error' : ''}`}
                  disabled={isLoading}
                />
              </div>
              {emailError && <span className="field-error">{emailError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="reg-password" className="form-label">
                PASSWORD
              </label>
              <div className="input-wrapper">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password (6+ chars)"
                  className={`form-input ${passwordError ? 'has-error' : ''}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordError && <span className="field-error">{passwordError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="reg-confirm" className="form-label">
                CONFIRM PASSWORD
              </label>
              <div className="input-wrapper">
                <input
                  id="reg-confirm"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className={`form-input ${confirmError ? 'has-error' : ''}`}
                  disabled={isLoading}
                />
              </div>
              {confirmError && <span className="field-error">{confirmError}</span>}
            </div>

            <button
              type="submit"
              id="signup-submit-btn"
              className="primary-button"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading && !isGoogleLoading ? (
                <>
                  <span className="spinner" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Customer Account</span>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <GoogleButton
            onClick={handleGoogleRegister}
            isLoading={isGoogleLoading}
            disabled={isLoading}
            text="Sign Up with Google"
          />

          <div className="auth-footer">
            Already have an account?{' '}
            <button
              type="button"
              className="link-btn"
              onClick={() => onNavigate('login')}
              id="back-to-login-link"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
