import Card from "react-bootstrap/Card";
import YoutubeVideo from "../YoutubeVideo";
import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
const Movie = (props) => {
    const navigate = useNavigate();
    const clickHandler = () => {
        
    }

    const [trailer, setTrailer] = useState(null);

    const trailerClickHandler = (videoLink) => {
    setTrailer(videoLink);
  };
  const bookingClickHandler = () => {
    navigate("/select-showtime")
  }
    return (
        <>
        <Card className='Movie'>
          <img src={props.img} className="movie-img" alt={props.title} />
          <div className='Movie__description'>
            <h4>{props.title}</h4>
            {/* <div className='Director'>{props.director}</div> */}
          </div>
          <button onClick={clickHandler}>Details</button>
          <button onClick={bookingClickHandler}>Book Tickets</button>
          <button onClick={() => trailerClickHandler(props.trailer)}>View Trailer</button>
        </Card>
        {trailer && <YoutubeVideo videoId={trailer} />}
      </>      
      );
}

export default Movie;