import React, { useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchEventsRequest, updateTimestamp } from '../store/actions';
import { formatTime } from '../utils/helpers';

const EventList: React.FC = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.events);

  useEffect(() => {
    dispatch(fetchEventsRequest());
  }, [dispatch]);

  const handleEventClick = (timestamp: number) => {
    dispatch(updateTimestamp(timestamp * 1000));
  };

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const event = events[index];

    if (!event) return null;

    return (
      <div
        style={{
          ...style,
          cursor: 'pointer',
          padding: '5px',
          borderBottom: '1px solid #ccc',
        }}
        onClick={() => handleEventClick(event.timestamp)}
      >
        {formatTime(event.timestamp)} (Duration: {event.duration?.toFixed(2)} s)
      </div>
    );
  };

  return (
    <div className="events-container">
      <h2>Events</h2>
      <List height={400} itemCount={events.length} itemSize={30} width={300}>
        {Row}
      </List>
    </div>
  );
};

export default EventList;
