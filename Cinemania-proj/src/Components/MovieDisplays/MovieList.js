import React from 'react';
import Movie from './Movie'; // Assuming you have a Movie component

const MovieList = ({ items, isAdmin, showing, toggleModal }) => {
  return (
    <div className="movie-list">
      {items.map((movie) => (
        <Movie
          isAdmin={isAdmin}
          showing={showing}
          key={movie._id}
          toggleModal={toggleModal} // Pass toggleModal down to Movie component
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
  );
}

export default MovieList;
