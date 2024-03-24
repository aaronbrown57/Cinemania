import Card from "react-bootstrap/Card";
import YoutubeVideo from "../YoutubeVideo";
import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import './Movie.css';
import './../css/Home.css';
const Movie = (props) => {
    const navigate = useNavigate();
    const clickHandler = () => {
        
    }

    const [trailer, setTrailer] = useState(null);

    const trailerClickHandler = (videoLink) => {
    setTrailer(videoLink);
  };
  
  const bookingClickHandler = () => {
    navigate("/select-showtime", { state: { chosenMovie: props.title } });
  };
  const editMovieHandler = () => {
    // Implement functionality with movie form to edit the details of the movie
  }
    return (
        <>
        <Card className='movie-card'>
          <img src={props.img} className="movie-img" alt={props.title} />
          <div className='movie-description'>
            <h4>{props.title}</h4>
            {/* <div className='Director'>{props.director}</div> */}
            <div className="movie-info">
            <h6 onClick={clickHandler}>Details</h6>
          {props.showing && <button onClick={bookingClickHandler}>Book Tickets</button>}
          <h6 className='play-trailer' onClick={() => trailerClickHandler(props.trailer)}>View Trailer</h6>
          </div>
          </div>
         
          {props.isAdmin && <button onClick={editMovieHandler}>Edit Movie</button>}
        </Card>
        {trailer && <YoutubeVideo videoId={trailer} />}
      </>      
      );
}

export default Movie;