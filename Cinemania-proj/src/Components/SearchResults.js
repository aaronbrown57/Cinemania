import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from 'axios';
import "./css/Home.css";
import MovieDetails from "./MovieDisplays/MovieDetails";

const SearchResults = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected category
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/movies/AllMovies");
        const data = response.data;
        setMovieList(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleMovieSelect = async (event, value) => {
    if (value) {
      try {
        navigate(`/movie/${encodeURIComponent(value.movieTitle)}`);
      } catch (error) {
        console.error("Error navigating to movie:", error);
      }
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // Update selected category
  };

  // Filter movies based on selected category
  const filteredMovies = selectedCategory === 'All' ? movieList : movieList.filter(movie => movie.category === selectedCategory);

  return (
    <div>
      {/* Category dropdown */}
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        variant="outlined"
        className="CategoryDropdown"
      >
        <MenuItem value="All">All Categories</MenuItem>
        <MenuItem value="Action">Action</MenuItem>
        <MenuItem value="Comedy">Comedy</MenuItem>
        <MenuItem value="Horror">Horror</MenuItem>
        {/* Add more categories as needed */}
      </Select>
      
      {/* Autocomplete search box */}
      <Autocomplete
        style={{ width: 500, margin: "auto" }}
        freeSolo
        autoComplete
        autoHighlight
        options={filteredMovies} 
        getOptionLabel={(option) => option.movieTitle} // Specify the label for options
        onChange={handleMovieSelect}
        filterOptions={(options, state) => {
          if (state.inputValue === '') {
            return [];
          }
          const filterOptions = options.filter(option =>
            option.movieTitle.toLowerCase().includes(state.inputValue.toLowerCase())
          );
          return filterOptions.length > 0 ? filterOptions : [{ movieTitle: 'No movies found' }];
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Search Box"
            className="Search"
          />
        )}
      />
      {selectedMovie && <MovieDetails movieTitle={selectedMovie} />}
    </div>
  );
}

export default SearchResults;
