import React, { useRef } from 'react'

interface VideoPlayerProps {
    onTimeUpdate: (currentTime: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({onTimeUpdate}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

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
    )
}

export default VideoPlayer;