import React, { useState } from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { QrCode, Radio, BarChart3, Plus, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [createdCount, setCreatedCount] = useState(3);
  const [qrName, setQrName] = useState('');
  const [qrTarget, setQrTarget] = useState('');
  const [showModal, setShowModal] = useState(false);

  const mockQrCodes = [
    { id: 'qr-1', name: 'Product Landing Page', scans: 1420, type: 'Dynamic URL', status: 'Active' },
    { id: 'qr-2', name: 'Wi-Fi Guest Access Tag', scans: 530, type: 'Wi-Fi Network', status: 'Active' },
    { id: 'qr-3', name: 'Summer Promotion vCard', scans: 890, type: 'vCard Contact', status: 'Active' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <DashboardHeader currentRole="customer" />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Welcome Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-heading)' }}>
              Customer Portal
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.9375rem' }}>
              Create dynamic QR codes, configure NFC tags, and track scan telemetry.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            style={{
              background: 'linear-gradient(135deg, #087CFF 0%, #7025FF 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '0.625rem 1.25rem',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(8, 124, 255, 0.3)',
            }}
          >
            <Plus size={16} />
            <span>Generate New QR</span>
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#EFF6FF', color: '#087CFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <QrCode size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 500 }}>Active QR Codes</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A' }}>{createdCount}</div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#F5F3FF', color: '#7025FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Radio size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 500 }}>Provisioned NFC Cards</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A' }}>4</div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart3 size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 500 }}>Total Real-time Scans</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A' }}>2,840</div>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A' }}>
              My QR &amp; NFC Deployments
            </h2>
            <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>
              Standard Customer Entitlements Active
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', color: '#475569', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Asset Name</th>
                  <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Type</th>
                  <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Total Scans</th>
                  <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '0.875rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockQrCodes.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#0F172A' }}>{item.name}</td>
                    <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>{item.type}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#087CFF' }}>{item.scans.toLocaleString()}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: '#DCFCE7',
                        color: '#15803D',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}>
                        <CheckCircle2 size={12} /> {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <button
                        type="button"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#087CFF',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.8125rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '2px',
                        }}
                      >
                        Analytics <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Simple Create QR Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          zIndex: 100,
        }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '440px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0F172A' }}>Generate Dynamic QR Code</h3>
            <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.25rem' }}>Enter the asset label and target destination URL.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>QR Code Label</label>
                <input
                  type="text"
                  placeholder="e.g. My Website"
                  value={qrName}
                  onChange={(e) => setQrName(e.target.value)}
                  style={{ width: '100%', height: '42px', padding: '0 0.75rem', border: '1px solid #CBD5E1', borderRadius: '8px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Destination URL</label>
                <input
                  type="url"
                  placeholder="https://yourbrand.com/link"
                  value={qrTarget}
                  onChange={(e) => setQrTarget(e.target.value)}
                  style={{ width: '100%', height: '42px', padding: '0 0.75rem', border: '1px solid #CBD5E1', borderRadius: '8px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '0.5rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#F8FAFC', cursor: 'pointer', fontWeight: 500 }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCreatedCount((c) => c + 1);
                    setShowModal(false);
                    setQrName('');
                    setQrTarget('');
                  }}
                  style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', background: 'linear-gradient(135deg, #087CFF 0%, #7025FF 100%)', color: '#FFFFFF', fontWeight: 600, cursor: 'pointer' }}
                >
                  Generate Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
