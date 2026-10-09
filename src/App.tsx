import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { StaffDashboardPage } from './pages/StaffDashboardPage';
import { OwnerDashboardPage } from './pages/OwnerDashboardPage';

const AppRoutes: React.FC = () => {
  const { user, role, isLoading } = useAuth();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/login';
  });

  // Sync route changes
  const navigate = (path: string) => {
    let target = path;
    if (!target.startsWith('/')) {
      target = '/' + target;
    }
    window.history.pushState({}, '', target);
    setCurrentPath(target);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/login');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Automatic role-based redirection upon login
  useEffect(() => {
    if (!isLoading && user && role) {
      if (currentPath === '/login' || currentPath === '/register' || currentPath === '/forgot-password' || currentPath === '/') {
        if (role === 'owner') {
          navigate('/owner/dashboard');
        } else if (role === 'staff') {
          navigate('/staff/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    }
  }, [user, role, isLoading, currentPath]);

  // Loading Screen
  if (isLoading) {
    return (
      <div className="auth-page-container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <img
            src="/logo.png"
            alt="NovaCode"
            style={{ width: '80px', height: '80px', objectFit: 'contain' }}
          />
          <div className="spinner dark" style={{ width: '28px', height: '28px', borderWidth: '3px' }} />
          <div style={{ color: '#4B5563', fontSize: '0.875rem', fontWeight: 500 }}>
            Validating NovaCode session...
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Protected Views
  if (user && role) {
    if (currentPath.startsWith('/owner')) {
      if (role === 'owner') {
        return <OwnerDashboardPage />;
      }
      // Access Denied / Redirect to appropriate dashboard
      return role === 'staff' ? <StaffDashboardPage /> : <DashboardPage />;
    }

    if (currentPath.startsWith('/staff')) {
      if (role === 'staff' || role === 'owner') {
        return <StaffDashboardPage />;
      }
      return <DashboardPage />;
    }

    // Default authenticated is Customer Dashboard
    return <DashboardPage />;
  }

  // Public Authentication Views
  if (currentPath === '/register') {
    return <RegisterPage onNavigate={navigate} />;
  }

  if (currentPath === '/forgot-password' || currentPath === '/reset-password') {
    return <ForgotPasswordPage onNavigate={navigate} />;
  }

  // Default to Login Page
  return <LoginPage onNavigate={navigate} />;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
