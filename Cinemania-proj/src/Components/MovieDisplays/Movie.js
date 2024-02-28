import Card from "react-bootstrap/Card";
import VideoPlayer from "../VideoPlayer";
import React, {useState} from "react"
const Movie = (props) => {

    const clickHandler = () => {
        
    }

    const [trailer, setTrailer] = useState(null);

    const trailerClickHandler = (videoLink) => {
    setTrailer(videoLink);
  };
    return (
        <>
        <Card className='Movie'>
          <img src={props.img} className="movie-img" alt={props.title} />
          <div className='Movie__description'>
            <h2>{props.title}</h2>
            {/* <div className='Director'>{props.director}</div> */}
          </div>
          <button onClick={clickHandler}>Details</button>
          <button onClick={clickHandler}>Book Tickets</button>
          <button onClick={() => trailerClickHandler(props.trailer)}>View Trailer</button>
        </Card>
        {trailer && <VideoPlayer trailer={trailer} />}
      </>      
      );
}

export default Movie;