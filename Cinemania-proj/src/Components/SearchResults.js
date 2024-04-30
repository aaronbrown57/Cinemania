import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "./css/Home.css";
import MovieDetails from "./MovieDisplays/MovieDetails";
import MovieList from "./MovieDisplays/MovieList";

const SearchResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [noResults, setNoResults] = useState(false); // State to track no results found
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:5000/movies/AllMovies`);
        console.log("API response:", response.data);
        const data = response.data;

        // Check if data is an array and searchTerm is not empty
        if (Array.isArray(data) && searchTerm.trim() !== '') {
          // Filter movies based on search term
          const filteredMovies = data.filter(movie =>
            movie.movieTitle && typeof movie.movieTitle === 'string' &&
            movie.movieTitle.toLowerCase().includes(searchTerm.toLowerCase())
          );
          console.log("Filtered movies:", filteredMovies);
          setSearchResults(filteredMovies);

          // Set noResults state based on filteredMovies length
          setNoResults(filteredMovies.length === 0);
        } else {
          setSearchResults([]); // Clear search results if no searchTerm or invalid data
          setNoResults(false);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setNoResults(true); // Set noResults to true in case of error
      }
    };
    fetchData();
  }, [searchTerm]);

  const handleMovieSelect = async (movie) => {
    setSelectedMovie(movie);
    try {
      navigate(`/movie/${encodeURIComponent(movie.movieTitle)}`);
    } catch (error) {
      console.error("Error navigating to movie:", error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // Update selected category
  };

  // Filter movies based on selected category
  const filteredMovies = selectedCategory === 'All' ? searchResults : searchResults.filter(movie => movie.category === selectedCategory);

  return (
    <div className="Search">
      <input
       style={{ width: 500, margin: "auto" }}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Movies..."
      />
      {noResults && <p>No results found.</p>} {/* Display "No results found" message */}
      {/* <div className="movie-thumbnails">
      {filteredMovies.map((movie, index) => (
  <img
    key={index}
    src={movie.trailerPictureURL}
    alt={movie.title}
    onClick={() => handleMovieSelect(movie)}
  />
))}

      </div> */}
      <span>
        <Select
          style={{ width: 200, margin: "auto", color: "white" }}
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="outlined"
          className="Search"
        >
          <MenuItem value="All">All Categories</MenuItem>
          <MenuItem value="Action">Action</MenuItem>
          <MenuItem value="Animation">Animation</MenuItem>
          <MenuItem value="Comedy">Comedy</MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
          <MenuItem value="Horror">Horror</MenuItem>
          <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
        </Select>
      </span>
      {loading && <p>Loading...</p>}
      {selectedMovie && <MovieDetails movieTitle={selectedMovie} />}
      <MovieList items={filteredMovies} showing={!loading}/> {/* Pass filteredMovies to MovieList */}
    </div>
  );
};

export default SearchResultsPage;
