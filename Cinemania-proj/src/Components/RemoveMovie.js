import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

const RemoveMovie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/movies/AllMovies');
        setMovies(response.data);
        console.log("API response:", response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const removeMovie = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5000/movies/deleteMovie/${selectedMovie}`);
      console.log('Movie removed:', response.data);
      const updatedMovies = movies.filter(movie => movie._id !== selectedMovie);
      setMovies(updatedMovies);
      setSelectedMovie('');
      alert('Movie successfully deleted');
      navigate("/manage-Movies")
    } catch (error) {
      console.error('Error removing movie:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedMovie(e.target.value);
    if (movies.length > 0) {
      const selectedMovieTitle = movies.find(movie => movie._id === e.target.value)?.movieTitle;
      console.log('Selected Movie Title:', selectedMovieTitle);
    }
  };
  

  return (
    <div>
      <h2>Remove Movie</h2>
    
        <div>
          <label>Select Movie to Remove:</label>
          <select value={selectedMovie} onChange={handleSelectChange}>
            <option value="">Select a movie</option>
            {movies.map(movie => (
              <option key={movie._id} value={movie._id}>{movie.movieTitle}</option>
            ))}
          </select>
          <button onClick={removeMovie} disabled={!selectedMovie || isLoading}>
            {isLoading ? 'Removing...' : 'Remove Movie'}
          </button>
        </div>
     
    </div>
  );
};

export default RemoveMovie;
