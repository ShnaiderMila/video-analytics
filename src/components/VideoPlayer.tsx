import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onTimeUpdate: (currentTime: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoRef, onTimeUpdate }) => {
  const currentTimestamp = useSelector((state: RootState) => state.events.currentTimestamp);
  const lastTimestampRef = useRef<number | null>(null);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    onTimeUpdate(video.currentTime * 1000);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
  
    const targetTime = currentTimestamp / 1000;
  
    if (Math.abs(video.currentTime - targetTime) > 0.2) {
      video.currentTime = targetTime;
  
      if (!video.paused) {
        video
          .play()
          .catch((e) => console.warn('Автовоспроизведение заблокировано', e));
      }
    }
  }, [currentTimestamp, videoRef]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        onClick={handleVideoClick}
        onTimeUpdate={handleTimeUpdate}
        controls
        style={{ width: '100%', maxWidth: '800px' }}
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
