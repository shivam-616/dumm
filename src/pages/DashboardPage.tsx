import React from 'react';
import { useAuth } from 'react-oidc-context';

const DashboardPage: React.FC = () => {
  const { user, signoutRedirect } = useAuth();

  const handleLogout = () => {
    signoutRedirect();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px',
        borderBottom: '1px solid #eee',
        paddingBottom: '20px'
      }}>
        <h1 style={{ color: '#333', margin: 0 }}>Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span>Welcome, {user?.profile?.email || 'User'}</span>
          <button 
            onClick={handleLogout}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ 
        backgroundColor: '#e9ecef', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>Welcome to Your Dashboard</h2>
        <p style={{ margin: 0, color: '#666' }}>
          You are successfully logged in! This is where you can manage your events, 
          tickets, and other platform features.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '20px', 
          backgroundColor: '#f9f9f9' 
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>My Events</h3>
          <p style={{ margin: 0, color: '#666' }}>Manage your created events</p>
          <button 
            style={{ 
              marginTop: '15px', 
              padding: '8px 16px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            View Events
          </button>
        </div>

        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '20px', 
          backgroundColor: '#f9f9f9' 
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Create Event</h3>
          <p style={{ margin: 0, color: '#666' }}>Create a new event</p>
          <button 
            style={{ 
              marginTop: '15px', 
              padding: '8px 16px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Create Event
          </button>
        </div>

        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '20px', 
          backgroundColor: '#f9f9f9' 
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Tickets</h3>
          <p style={{ margin: 0, color: '#666' }}>Manage tickets and validation</p>
          <button 
            style={{ 
              marginTop: '15px', 
              padding: '8px 16px', 
              backgroundColor: '#ffc107', 
              color: 'black', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            View Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
