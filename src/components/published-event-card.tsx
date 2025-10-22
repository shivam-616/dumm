import React from 'react';

interface PublishedEventCardProps {
  event: {
    id: string;
    name: string;
    start: string;
    end: string;
    venue: string;
  };
}

const PublishedEventCard: React.FC<PublishedEventCardProps> = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>Start: {event.start}</p>
      <p>End: {event.end}</p>
      <p>Venue: {event.venue}</p>
    </div>
  );
};

export default PublishedEventCard;

