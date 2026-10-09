import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck, UserCheck, Shield } from 'lucide-react';

interface DemoNoticeProps {
  onFillCredentials?: (email: string, password: string) => void;
}

export const DemoNotice: React.FC<DemoNoticeProps> = ({ onFillCredentials }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      width: '100%',
      maxWidth: '440px',
      margin: '0 auto 1.25rem auto',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      padding: '0.75rem 1rem',
      fontSize: '0.8125rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      zIndex: 10,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
      onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.15rem 0.5rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            background: '#FEF3C7',
            color: '#B45309',
            border: '1px solid #FCD34D',
          }}>
            <CheckCircle2 size={12} /> Firebase novacode-2de9f
          </span>
          <span style={{ color: '#4B5563', fontWeight: 500 }}>
            Quick Roles &amp; Console Setup
          </span>
        </div>
        <button
          type="button"
          style={{
            background: 'none',
            border: 'none',
            color: '#6B7280',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Toggle notice details"
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {isOpen && (
        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #F3F4F6' }}>
          <p style={{ color: '#4B5563', marginBottom: '0.5rem', fontSize: '0.78rem' }}>
            Click below to instantly autofill test credentials for any of the 3 required access levels:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.375rem' }}>
            <button
              type="button"
              onClick={() => onFillCredentials?.('owner@novacode.io', 'NovaOwner2026!')}
              style={{
                padding: '0.4rem 0.25rem',
                borderRadius: '6px',
                border: '1px solid #FEE2E2',
                background: '#FEF2F2',
                color: '#991B1B',
                fontWeight: 600,
                fontSize: '0.72rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              <ShieldCheck size={13} />
              <span>Owner</span>
            </button>
            <button
              type="button"
              onClick={() => onFillCredentials?.('staff@novacode.io', 'NovaStaff2026!')}
              style={{
                padding: '0.4rem 0.25rem',
                borderRadius: '6px',
                border: '1px solid #E0F2FE',
                background: '#F0F9FF',
                color: '#0369A1',
                fontWeight: 600,
                fontSize: '0.72rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              <Shield size={13} />
              <span>Staff</span>
            </button>
            <button
              type="button"
              onClick={() => onFillCredentials?.('customer@novacode.io', 'NovaCustomer2026!')}
              style={{
                padding: '0.4rem 0.25rem',
                borderRadius: '6px',
                border: '1px solid #F3E8FF',
                background: '#FAF5FF',
                color: '#6B21A8',
                fontWeight: 600,
                fontSize: '0.72rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              <UserCheck size={13} />
              <span>Customer</span>
            </button>
          </div>
          <p style={{ marginTop: '0.625rem', color: '#6B7280', fontSize: '0.72rem', lineHeight: 1.4 }}>
            • <strong>Continue with Google</strong> triggers the real Google Auth popup using your project <code>novacode-2de9f.firebaseapp.com</code>.
            <br />
            • In your Firebase Console, make sure <strong>Email/Password</strong> and <strong>Google</strong> are toggled on in <em>Authentication → Sign-in method</em>.
          </p>
        </div>
      )}
    </div>
  );
};
