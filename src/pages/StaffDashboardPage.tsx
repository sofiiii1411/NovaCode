import React from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { ShieldCheck, Layers, Users, Cpu, FileCheck2, ArrowUpRight } from 'lucide-react';

export const StaffDashboardPage: React.FC = () => {
  const staffTasks = [
    { id: 'PRJ-101', client: 'Acme Logistics', type: 'NFC Batch 500x', status: 'In Production', date: '2026-10-09' },
    { id: 'PRJ-102', client: 'Metro Hospital Systems', type: 'Dynamic Hospital Badges', status: 'Quality Approved', date: '2026-10-08' },
    { id: 'PRJ-103', client: 'Zenith Retail', type: 'Smart Shelf QR Campaign', status: 'Telemetry Active', date: '2026-10-07' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <DashboardHeader currentRole="staff" />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFF6FF', color: '#1E40AF', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <ShieldCheck size={14} /> Staff Operations Console
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-heading)' }}>
            Staff &amp; Operations Dashboard
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.9375rem' }}>
            Manage assigned QR code enterprise batches, hardware provisioning, and customer service requests.
          </p>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#EFF6FF', color: '#087CFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 500 }}>Assigned Client Projects</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A' }}>18</div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cpu size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 500 }}>NFC Encodings Today</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A' }}>1,250</div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#FAF5FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 500 }}>Active Managed Customers</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A' }}>42</div>
            </div>
          </div>
        </div>

        {/* Assigned Projects Table */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileCheck2 size={20} color="#087CFF" />
              Active Project Allocations
            </h2>
            <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>
              Staff Level Authorization
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', color: '#475569', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Project ID</th>
                  <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Client Organization</th>
                  <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Deployment Type</th>
                  <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Assigned Date</th>
                  <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {staffTasks.map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: '#087CFF' }}>{t.id}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#0F172A' }}>{t.client}</td>
                    <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>{t.type}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{
                        background: '#EEF2FF',
                        color: '#4338CA',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}>
                        {t.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>{t.date}</td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <button
                        type="button"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#087CFF',
                          cursor: 'pointer',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '2px',
                        }}
                      >
                        Inspect <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
