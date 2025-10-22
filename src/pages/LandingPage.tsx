import React, { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { getPublishedEvents } from '../lib/api';
import { PublishedEventSummary } from '../domain/domain';

const LandingPage: React.FC = () => {
  const { isAuthenticated, user, signinRedirect } = useAuth();
  const [events, setEvents] = useState<PublishedEventSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getPublishedEvents(0, 10);
      setEvents(response.content);
    } catch (err) {
      setError('Failed to load events. Please check if the backend is running.');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    signinRedirect();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
        <h1 style={{ color: '#333', margin: 0 }}>Event Management Platform</h1>
        <div>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span>Welcome, {user?.profile?.email || 'User'}</span>
              <a 
                href="/dashboard" 
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  textDecoration: 'none', 
                  borderRadius: '4px' 
                }}
              >
                Dashboard
              </a>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Login
            </button>
          )}
        </div>
      </header>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Upcoming Events</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading events...</p>
          </div>
        ) : error ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '4px',
            border: '1px solid #f5c6cb'
          }}>
            <h3>⚠️ Backend Connection Error</h3>
            <p>{error}</p>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>
              Make sure your Spring Boot backend is running on <code>http://localhost:8080</code>
            </p>
            <button 
              onClick={fetchEvents}
              style={{ 
                marginTop: '10px',
                padding: '8px 16px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Retry
            </button>
          </div>
        ) : events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>No events found.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {events.map((event) => (
              <div 
                key={event.id} 
                style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  padding: '20px', 
                  backgroundColor: '#f9f9f9',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{event.name}</h3>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Start:</strong> {formatDate(event.start)}
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>End:</strong> {formatDate(event.end)}
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Venue:</strong> {event.venue}
                </p>
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
                  onClick={() => window.location.href = `/event/${event.id}`}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ 
        backgroundColor: '#e9ecef', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '30px'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>About This Platform</h3>
        <p style={{ margin: 0, color: '#666' }}>
          This is a full-stack event management platform built with React, Spring Boot, and Keycloak authentication.
          Features include event creation, ticket management, and role-based access control.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
