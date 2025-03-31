import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import EventsList from './components/EventList';
import EventMarker from './components/EventMarker';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import './App.css';

const App: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.events);
  const currentTimestamp = useSelector((state: RootState) => state.events.currentTimestamp);

  return (
    <div className="app-container">
      <h1 className="overlay-text">Test task for frontend developer at Netris</h1>
      <div className="video-and-events">
        <VideoPlayer onTimeUpdate={(time) => console.log('Current Time:', time)} />
        <EventsList />
      </div>
      <EventMarker events={events} currentTimestamp={currentTimestamp} />
    </div>
  );
};

export default App;