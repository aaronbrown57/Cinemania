import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavMenu from '../Navigation/NavMenu';
import YoutubeVideo from '../YoutubeVideo';
import "./../css/MovieDetails.css";
import {useNavigate} from "react-router-dom";

const MovieDetail = (props) => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const { title } = useParams();

  const bookingClickHandler = (movieTitle) => {
    console.log("Booking for:", movieTitle); // This will show what title is being passed to the function
    navigate('/select-showtime', { state: { movie: movieTitle } });
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/movies/${title}`);
        const movieData = response.data;
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetail();
  }, [title]);

  if (!movie) {
    return <div className="movie-detail">Loading...</div>;
  }

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h1 className='web-name' onClick={handleClick}>Cinemania </h1>
      <NavMenu></NavMenu>
      <div className="movie-detail">
        <div className="movie-detail-header">
          {movie.trailerPictureURL && (
            <img src={movie.trailerPictureURL} alt={movie.title} />
          )}
          <div className="movie-detail-info">
            {movie.movieTitle && <h2>{movie.movieTitle}</h2>}
            {movie.category && <p><strong>Category:</strong> {movie.category}</p>}
            {movie.director && <p><strong>Director:</strong> {movie.director}</p>}
            {movie.cast && <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>}
            {movie.producer && <p><strong>Producer:</strong> {movie.producer}</p>}
            {movie.rating && <p><strong>Rating:</strong> {movie.rating}</p>}
            {movie.reviews && <p><strong>Reviews:</strong> {movie.reviews}</p>}
            {movie.synopsis && <p><strong>Synopsis:</strong> {movie.synopsis}</p>}
          </div>
        </div>
        <div className="movie-detail-booking">
          {movie.comingSoon === true ? (
            <div>
              <p>Please check back with us soon for more booking updates!</p>
            </div>
          ) : (
            <button
              className="book-tickets-button"
              onClick={() => bookingClickHandler(movie.movieTitle)}
            >
              Book Tickets for {movie.movieTitle}
            </button>
          )}
        </div>
      </div>
      <div className="trailer-container">
        <div className="trailer-wrapper">
          <YoutubeVideo videoId={movie.trailerVideoURL} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
