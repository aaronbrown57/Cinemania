import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import YoutubeVideo from "../YoutubeVideo";
import "./Movie.css";
import "./../css/Home.css";

const Movie = (props) => {
  const navigate = useNavigate();
  const [trailer, setTrailer] = useState(null);

  const trailerClickHandler = (videoLink) => {
    setTrailer(videoLink);
  };

  const bookingClickHandler = () => {
    navigate("/select-showtime", { state: { chosenMovie: props.title } });
  };

  const editMovieHandler = () => {
    // Implement functionality with movie form to edit the details of the movie
  };

  const imageClickHandler = () => {
    navigate(`/movie/${props.title}`);
  };

  return (
    <>
      <Card className="movie-card">
        <img
          src={props.img}
          className="movie-img"
          alt={props.title}
          onClick={imageClickHandler} // Added image click handler
        />
        <div className="movie-description">
          <h4>{props.title}</h4>
        </div>
        {/* {props.isAdmin && <button onClick={editMovieHandler}>Edit Movie</button>} */}
      </Card>
    </>
  );
};

export default Movie;
