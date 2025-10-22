import React, { useState, useEffect } from 'react';

const BackendStatus: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/published-events?page=0&size=1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setStatus('connected');
        setMessage('Backend is running and accessible');
      } else {
        setStatus('disconnected');
        setMessage(`Backend responded with status: ${response.status}`);
      }
    } catch (error) {
      setStatus('disconnected');
      setMessage('Backend is not running or not accessible');
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return '#28a745';
      case 'disconnected':
        return '#dc3545';
      default:
        return '#ffc107';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return '✅';
      case 'disconnected':
        return '❌';
      default:
        return '⏳';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      padding: '10px 15px',
      backgroundColor: 'white',
      border: `2px solid ${getStatusColor()}`,
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 1000,
      fontSize: '14px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>{getStatusIcon()}</span>
        <span style={{ fontWeight: 'bold' }}>
          Backend: {status.toUpperCase()}
        </span>
      </div>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
        {message}
      </div>
      {status === 'disconnected' && (
        <button 
          onClick={checkBackendStatus}
          style={{
            marginTop: '8px',
            padding: '4px 8px',
            fontSize: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default BackendStatus;
