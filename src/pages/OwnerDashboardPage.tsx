import React, { useState } from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { ShieldAlert, Users, Activity, Key, Database, Lock, CheckCircle2 } from 'lucide-react';

export const OwnerDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'security'>('overview');

  const registeredUsers = [
    { name: 'Alex Vance', email: 'owner@novacode.io', role: 'Owner', lastLogin: 'Just now', status: 'Active' },
    { name: 'Marcus Chen', email: 'staff@novacode.io', role: 'Staff', lastLogin: '10 mins ago', status: 'Active' },
    { name: 'Sarah Connor', email: 'customer@novacode.io', role: 'Customer', lastLogin: '1 hour ago', status: 'Active' },
    { name: 'David Miller', email: 'david@enterprise.com', role: 'Customer', lastLogin: '3 hours ago', status: 'Active' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <DashboardHeader currentRole="owner" />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FEF2F2', color: '#991B1B', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <ShieldAlert size={14} /> Super Admin &amp; Owner Master Console
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-heading)' }}>
            NovaCode Governance &amp; Platform Control
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.9375rem' }}>
            Full authorized administrative control over users, staff allocations, database security policies, and platform telemetry.
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #E2E8F0', marginBottom: '2rem' }}>
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '0.75rem 1.25rem',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'overview' ? '2px solid #087CFF' : '2px solid transparent',
              color: activeTab === 'overview' ? '#087CFF' : '#64748B',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Platform Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            style={{
              padding: '0.75rem 1.25rem',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'users' ? '2px solid #087CFF' : '2px solid transparent',
              color: activeTab === 'users' ? '#087CFF' : '#64748B',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            User &amp; Role Management
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            style={{
              padding: '0.75rem 1.25rem',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'security' ? '2px solid #087CFF' : '2px solid transparent',
              color: activeTab === 'security' ? '#087CFF' : '#64748B',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            RLS &amp; OAuth Security
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Owner Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>Total Accounts</span>
                  <Users size={18} color="#087CFF" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A' }}>1,489</div>
                <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: '0.25rem' }}>+12% this month</div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>Global QR Dispatches</span>
                  <Activity size={18} color="#7025FF" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A' }}>148,200</div>
                <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: '0.25rem' }}>99.99% Uptime</div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>Provisioned NFC Chips</span>
                  <Database size={18} color="#00D9FF" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A' }}>28,450</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>Hardware certified</div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>Security Status</span>
                  <Lock size={18} color="#16A34A" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16A34A' }}>Protected</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>RLS &amp; OAuth Guard active</div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A' }}>
                System Users &amp; Role Assignments
              </h2>
              <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>
                Backend Role Hierarchy Enforced
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', color: '#475569', borderBottom: '1px solid #E2E8F0' }}>
                    <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>User</th>
                    <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Email Address</th>
                    <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Assigned Role</th>
                    <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Last Active</th>
                    <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Permissions</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredUsers.map((u) => (
                    <tr key={u.email} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#0F172A' }}>{u.name}</td>
                      <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>{u.email}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{
                          padding: '0.2rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          background: u.role === 'Owner' ? '#FEF2F2' : u.role === 'Staff' ? '#EFF6FF' : '#F5F3FF',
                          color: u.role === 'Owner' ? '#991B1B' : u.role === 'Staff' ? '#1E40AF' : '#6B21A8',
                        }}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>{u.lastLogin}</td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <button
                          type="button"
                          style={{
                            background: 'none',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '0.3rem 0.6rem',
                            color: '#334155',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                          }}
                        >
                          Modify Role
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.75rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Key size={20} color="#087CFF" />
              Row Level Security (RLS) &amp; Google OAuth Governance
            </h2>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              NovaCode enforces multi-tenant zero-trust database security. The PostgreSQL schema executes automatic triggers upon user signup:
            </p>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#334155' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#16A34A" />
                <span><strong>Role Isolation:</strong> Customers can never elevate themselves to Staff or Owner.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#16A34A" />
                <span><strong>Row Level Security:</strong> Customers can only query their own QR and NFC telemetry data.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#16A34A" />
                <span><strong>Google OAuth Verification:</strong> Public Google sign-in accounts are strictly bound to customer role on first sign-in.</span>
              </li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};
