import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { GoogleButton } from '../components/GoogleButton';
import { DemoNotice } from '../components/DemoNotice';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (route: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, signInWithGoogle, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Validation & error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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

  const validatePassword = (val: string) => {
    if (!val) {
      return 'Password is required.';
    }
    if (val.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passErr);

    if (emailErr || passErr) {
      return;
    }

    const result = await login(email, password, rememberMe);
    if (result.error) {
      setGeneralError(result.error);
    }
  };

  const handleGoogleSignIn = async () => {
    setGeneralError('');
    setIsGoogleLoading(true);
    const result = await signInWithGoogle();
    setIsGoogleLoading(false);
    if (result.error) {
      setGeneralError(result.error);
    }
  };

  const handleAutofill = (testEmail: string, testPass: string) => {
    setEmail(testEmail);
    setPassword(testPass);
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
  };

  return (
    <div className="auth-page-container">
      {/* Quick Role Tester helper banner */}
      <DemoNotice onFillCredentials={handleAutofill} />

      <div className="auth-card-wrapper">
        <div className="auth-card">
          {/* 1. Official NovaCode Logo */}
          <Logo size={100} />

          {/* 2. Welcome Heading & Subtitle */}
          <div className="auth-header">
            <h1 className="auth-title">Welcome to NovaCode</h1>
            <p className="auth-subtitle">Your gateway to smarter QR &amp; NFC solutions.</p>
          </div>

          {/* Error Banner */}
          {generalError && (
            <div className="alert-banner error" role="alert">
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>{generalError}</div>
            </div>
          )}

          {/* 3. Email & Password Form */}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                EMAIL ADDRESS
              </label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  onBlur={() => setEmailError(validateEmail(email))}
                  placeholder="Enter your email address"
                  className={`form-input ${emailError ? 'has-error' : ''}`}
                  disabled={isLoading}
                />
              </div>
              {emailError && <span className="field-error">{emailError}</span>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                PASSWORD
              </label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  onBlur={() => setPasswordError(validatePassword(password))}
                  placeholder="Enter your password"
                  className={`form-input ${passwordError ? 'has-error' : ''}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={0}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordError && <span className="field-error">{passwordError}</span>}
            </div>

            {/* Options Row: Remember Me & Forgot Password */}
            <div className="form-options-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox-input"
                  id="remember-me"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="link-btn"
                onClick={() => onNavigate('forgot-password')}
                id="forgot-password-link"
              >
                Forgot password?
              </button>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              id="signin-submit-btn"
              className="primary-button"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading && !isGoogleLoading ? (
                <>
                  <span className="spinner" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* 4. Subtle OR Divider */}
          <div className="auth-divider">
            <span>OR</span>
          </div>

          {/* 5. Google Sign-In Button */}
          <GoogleButton
            onClick={handleGoogleSignIn}
            isLoading={isGoogleLoading}
            disabled={isLoading}
            text="Continue with Google"
          />

          {/* 6. Account Registration Link */}
          <div className="auth-footer">
            Don't have an account?{' '}
            <button
              type="button"
              className="link-btn"
              onClick={() => onNavigate('register')}
              id="create-account-link"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
