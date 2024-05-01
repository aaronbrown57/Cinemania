import React from 'react';
import Movie from './Movie';
import "./MovieList.css"; // Import CSS file for styling

const MovieList = ({ items, isAdmin, showing }) => {
  return (
    <div className="movie-list-container"> {/* Container for horizontal scrolling */}
      <div className="movie-list"> {/* Wrapper for movie items */}
        {items.map((movie) => (
          <Movie
            isAdmin={isAdmin}
            showing={showing}
            key={movie._id}
            title={movie.movieTitle}
            director={movie.director}
            img={movie.trailerPictureURL}
            trailer={movie.trailerVideoURL}
            category={movie.category}
            cast={movie.cast.join(', ')}
            producer={movie.producer}
            reviews={movie.reviews.join(', ')}
            synopsis={movie.synopsis}
            rating={movie.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
