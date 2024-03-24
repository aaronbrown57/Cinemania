import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie'; // Assuming you have a Movie component

const MovieList = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/movies/allMovies');
        setMovies(response.data); // Assuming your API returns an array of movies
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array to only run the effect once when the component mounts

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <Movie
          isAdmin={props.isAdmin}
          key={movie.id}
          title={movie.title}
          pieces={movie.director}
          img={movie.img}
          trailer={movie.trailer}
        />
      ))}
    </div>
  );
};

export default MovieList;
