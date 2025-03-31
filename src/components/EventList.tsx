import React, { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Event } from '../types/types';
import { formatTime } from '../utils/helpers';

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('/events.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setEvents(data))
      .catch((error) => {
        console.error('Error loading events:', error);
        setEvents([]);
      });
  }, []);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const event = events[index];
    return (
      <div style={style}>
        {formatTime(event.timestamp)} (Duration: {event.duration.toFixed(2)} s)
      </div>
    );
  };

  return (
    <div className="events-container">
      <h2>Events</h2>
      <List
        height={400}
        itemCount={events.length}
        itemSize={30}
        width={300}
      >
        {Row}
      </List>
    </div>
  );
};

export default EventsList;