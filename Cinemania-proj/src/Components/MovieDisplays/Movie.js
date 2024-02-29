import Card from "react-bootstrap/Card";
import YoutubeVideo from "../YoutubeVideo";
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
            <h4>{props.title}</h4>
            {/* <div className='Director'>{props.director}</div> */}
          </div>
          <button onClick={clickHandler}>Details</button>
          <button onClick={clickHandler}>Book Tickets</button>
          <button onClick={() => trailerClickHandler(props.trailer)}>View Trailer</button>
        </Card>
        {trailer && <YoutubeVideo videoId={trailer} />}
      </>      
      );
}

export default Movie;