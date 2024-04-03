import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import MovieDetails from "./MovieDetails"; // Import the MovieDetails component
import YoutubeVideo from "../YoutubeVideo";
import './Movie.css';
import './../css/Home.css';

const Movie = (props) => {
  const navigate = useNavigate();
  const [trailer, setTrailer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const trailerClickHandler = (videoLink) => {
    setTrailer(videoLink);
  };

  const bookingClickHandler = () => {
    navigate("/select-showtime", { state: { chosenMovie: props.title } });
  };

  const editMovieHandler = () => {
    // Implement functionality with movie form to edit the details of the movie
  };

  // Toggle modal open/close
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Card className="movie-card">
        <img
          src={props.img}
          className="movie-img"
          alt={props.title}
          onClick={toggleModal} // Call toggleModal when image is clicked
        />
        <div className="movie-description">
          <h4>{props.title}</h4>
          <div className="movie-info">
            {props.showing && (
              <button
                className="book-tickets-button"
                onClick={bookingClickHandler}
              >
                Book Tickets
              </button>
            )}
            <h6
              className="play-trailer"
              onClick={() => trailerClickHandler(props.trailer)}
            >
              View Trailer
            </h6>
          </div>
        </div>
        {props.isAdmin && <button onClick={editMovieHandler}>Edit Movie</button>}
      </Card>
      {/* Render modal */}
      <MovieDetails
        isOpen={isModalOpen}
        onClose={toggleModal}
        title={props.title}
        category={props.category}
        cast={props.cast}
        director={props.director}
        producer={props.producer}
        reviews={props.reviews}
        synopsis={props.synopsis}
        rating={props.rating}
      />
      {trailer && <YoutubeVideo videoId={trailer} />}
    </>
  );
};

export default Movie;
