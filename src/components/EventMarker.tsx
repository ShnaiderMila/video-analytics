import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Event } from '../types/types';

interface EventMarkerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  events: Event[];
}

const EventMarker: React.FC<EventMarkerProps> = ({ videoRef, events }) => {
  const currentTimestamp = useSelector((state: RootState) => state.events.currentTimestamp);
  const [scale, setScale] = useState({ x: 1, y: 1 });

  // Теперь нам не нужен videoRect, т.к. родитель уже position: relative и занимает весь размер видео
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateScale = () => {
      const rect = video.getBoundingClientRect();
      const originalWidth = video.videoWidth;
      const originalHeight = video.videoHeight;
      if (originalWidth && originalHeight) {
        setScale({
          x: rect.width / originalWidth,
          y: rect.height / originalHeight,
        });
      }
    };

    video.addEventListener('loadedmetadata', updateScale);
    const observer = new ResizeObserver(updateScale);
    observer.observe(video);

    return () => {
      video.removeEventListener('loadedmetadata', updateScale);
      observer.disconnect();
    };
  }, [videoRef]);

  // Переводим timestamp и duration из секунд в миллисекунды
  const activeEvents = events.filter((event) => {
    const start = event.timestamp * 1000;
    const duration = event.duration > 0 ? event.duration * 1000 : 500; // минимум 500 мс
    const end = start + duration;
    return event.zone && start <= currentTimestamp && end > currentTimestamp;
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {activeEvents.map((event) => (
        <div
          key={event.id}
          style={{
            position: 'absolute',
            left: `${event.zone.left * scale.x}px`,
            top: `${event.zone.top * scale.y}px`,
            width: `${event.zone.width * scale.x}px`,
            height: `${event.zone.height * scale.y}px`,
            backgroundColor: 'rgba(0, 255, 0, 0.4)',
            border: '2px solid green',
            boxSizing: 'border-box',
            transition: 'all 0.1s linear',
          }}
        />
      ))}
    </div>
  );
};

export default EventMarker;
