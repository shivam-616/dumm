import React from 'react';
import { useAuth } from 'react-oidc-context';

const LoginPage: React.FC = () => {
  const { signinRedirect, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/dashboard';
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    signinRedirect();
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      flexDirection: 'column',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Login</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Please log in to access the Event Management Platform
        </p>
        <button 
          onClick={handleLogin}
          style={{ 
            padding: '12px 24px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%'
          }}
        >
          Login with Keycloak
        </button>
        <p style={{ 
          fontSize: '14px', 
          color: '#666', 
          marginTop: '20px' 
        }}>
          You will be redirected to Keycloak for authentication
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
