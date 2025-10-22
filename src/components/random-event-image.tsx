import React from 'react';

interface RandomEventImageProps {
  eventName: string;
  className?: string;
}

const RandomEventImage: React.FC<RandomEventImageProps> = ({ 
  eventName, 
  className = "" 
}) => {
  // Generate a simple placeholder image based on event name
  const imageUrl = `https://via.placeholder.com/300x200/4f46e5/ffffff?text=${encodeURIComponent(eventName)}`;
  
  return (
    <img 
      src={imageUrl} 
      alt={eventName}
      className={className}
    />
  );
};

export default RandomEventImage;

