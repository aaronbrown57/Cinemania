import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from 'axios';
import "./css/Home.css";
import MovieDetails from "./MovieDisplays/MovieDetails";

const SearchResults = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/movies/AllMovies");
        const data = response.data;
        const titles = data.map(movie => movie.movieTitle);
        setMovieList(titles);
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
        navigate(`/movie/${encodeURIComponent(value)}`);
      } catch (error) {
        console.error("Error navigating to movie:", error);
      }
    }
  };

  return (
    <div>
      <Autocomplete
        style={{ width: 500, margin: "auto" }}
        freeSolo
        autoComplete
        autoHighlight
        options={movieList}
        onChange={handleMovieSelect}
        filterOptions={(options, state) => {
          if (state.inputValue === '') {
            return [];
          }
          const filterOptions = options.filter(option =>
            option.toLowerCase().includes(state.inputValue.toLowerCase())
          );
          return filterOptions.length > 0 ? filterOptions : ['No results found'];
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
