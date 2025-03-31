import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store/store'
import { updateTimestamp } from './store/actions'
import VideoPlayer from './components/VideoPlayer'
import EventList from './components/EventList'
import EventMarker from './components/EventMarker'
import './App.css'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const currentTimestamp = useSelector(
    (state: RootState) => state.events.currentTimestamp
  )
  const events = useSelector((state: RootState) => state.events.events)

  const videoRef = useRef<HTMLVideoElement>(null)

  const handleTimeUpdate = (timestamp: number) => {
    dispatch(updateTimestamp(timestamp))
  }

  return (
    <>
      <h1 className="overlay-text">
        Test task for frontend developer at Netris
      </h1>
      <div className="video-and-events">
        <div className="video-container">
          <VideoPlayer videoRef={videoRef} onTimeUpdate={handleTimeUpdate} />
          <EventMarker videoRef={videoRef} events={events} />
        </div>
        <div className="events-container">
          <EventList />
        </div>
      </div>
    </>
  )
}

export default App
