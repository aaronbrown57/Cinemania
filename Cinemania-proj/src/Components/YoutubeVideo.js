import React, { useState } from 'react';
import "./YoutubeVideo.css"

const YouTubeVideo = ({ videoId }) => {
  const [showVideo, setShowVideo] = useState(true);

  const handleCloseClick = () => {
    setShowVideo(false);
  };

  return (
    <div className="video-container">
      {showVideo && (
        <div className="video-modal">
          <iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button onClick={handleCloseClick}>Close Trailer</button>
        </div>
      )}
    </div>
  );
}

export default YouTubeVideo;


