import React from 'react';
import { Event } from '../types/types';

interface EventMarkerProps {
  events: Event[];
  currentTimestamp: number;
}

const EventMarker: React.FC<EventMarkerProps> = ({ events, currentTimestamp }) => {
  return (
    <div>
      {events
        .filter(
          (event) =>
            event.timestamp <= currentTimestamp &&
            event.timestamp + event.duration * 1000 > currentTimestamp
        )
        .map((event, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${event.zone.left}px`,
              top: `${event.zone.top}px`,
              width: `${event.zone.width}px`,
              height: `${event.zone.height}px`,
              backgroundColor: 'rgba(0, 255, 0, 0.5)',
              border: '1px solid green',
            }}
          />
        ))}
    </div>
  );
};

export default EventMarker;