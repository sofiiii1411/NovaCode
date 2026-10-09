import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../lib/supabase';
import { LogOut, ShieldAlert, ShieldCheck, User } from 'lucide-react';

interface DashboardHeaderProps {
  currentRole: UserRole;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentRole }) => {
  const { user, logout, switchDemoRole } = useAuth();

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'owner':
        return {
          label: 'Super Admin / Owner',
          bg: '#FEF2F2',
          text: '#991B1B',
          border: '#F87171',
          icon: <ShieldAlert size={14} />,
        };
      case 'staff':
        return {
          label: 'Staff / Admin',
          bg: '#EFF6FF',
          text: '#1E40AF',
          border: '#60A5FA',
          icon: <ShieldCheck size={14} />,
        };
      case 'customer':
      default:
        return {
          label: 'Customer Account',
          bg: '#F5F3FF',
          text: '#6B21A8',
          border: '#C084FC',
          icon: <User size={14} />,
        };
    }
  };

  const badge = getRoleBadge(currentRole);

  return (
    <header style={{
      background: '#FFFFFF',
      borderBottom: '1px solid #E5E7EB',
      padding: '0.875rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <img
          src="/logo.png"
          alt="NovaCode Logo"
          style={{ width: '42px', height: '42px', objectFit: 'contain' }}
        />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 800, fontFamily: 'var(--font-heading)', fontSize: '1.125rem', color: '#111827' }}>
              NovaCode
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '0.15rem 0.5rem',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 600,
              background: badge.bg,
              color: badge.text,
              border: `1px solid ${badge.border}`,
            }}>
              {badge.icon}
              {badge.label}
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
            QR + NFC Solutions Platform
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Sandbox Role Switcher for instant testing */}
        {switchDemoRole && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#F3F4F6', padding: '0.25rem 0.5rem', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: 500 }}>Demo Role:</span>
            {(['customer', 'staff', 'owner'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => switchDemoRole(r)}
                style={{
                  border: 'none',
                  background: currentRole === r ? '#FFFFFF' : 'transparent',
                  color: currentRole === r ? '#087CFF' : '#4B5563',
                  fontWeight: currentRole === r ? 700 : 500,
                  boxShadow: currentRole === r ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                  borderRadius: '4px',
                  padding: '0.15rem 0.4rem',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {r}
              </button>
            ))}
          </div>
        )}

        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{ textAlign: 'right', display: 'none', lineHeight: 1.2 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827' }}>
              {user?.full_name || user?.email}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>
              {user?.email}
            </div>
          </div>

          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #087CFF 0%, #7025FF 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.875rem',
            overflow: 'hidden',
          }}>
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              (user?.full_name?.[0] || user?.email?.[0] || 'N').toUpperCase()
            )}
          </div>

          <button
            type="button"
            onClick={() => logout()}
            title="Sign Out"
            style={{
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '0.5rem',
              color: '#4B5563',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.8125rem',
              fontWeight: 500,
            }}
          >
            <LogOut size={16} />
            <span style={{ display: 'inline' }}>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
