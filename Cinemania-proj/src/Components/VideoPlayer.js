import React from 'react';

const VideoPlayer = (props) => {
  return (
    <div>
      <video width="640" height="360" controls>
        <source src={props.trailer} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
