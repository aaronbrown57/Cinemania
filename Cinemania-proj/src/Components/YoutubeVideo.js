import React from 'react';
const YouTubeVideo = ({ videoId }) => {

  return (
    <div className="video-container">
      {
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
        </div>
        }
    </div>
  );
}

export default YouTubeVideo;


