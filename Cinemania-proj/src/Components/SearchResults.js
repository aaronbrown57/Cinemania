import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from 'axios';

const SearchResults = () => {
  const [movieList, setMovielist] = useState([]);
  const [loading, setLoading] = useState(true); // Define loading state

  useEffect(() => {
    const getDataFromAPI = async () => {
      try {
        console.log("Options Fetched from API");
  
        const response = await axios.get("http://127.0.0.1:5000/movies/allMovies");
        const data = response.data;
  
        console.log(data);
  
        const movieList = data.map(movie => movie.movieTitle).filter(movieTitle => movieTitle); // Filter out undefined titles
        setMovielist(movieList);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };
  
    getDataFromAPI(); // Fetch data when component mounts
  
  }, []); // Empty dependency array to ensure effect runs only once
  
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Autocomplete
          style={{ width: 500, margin: "auto" }}
          freeSolo
          autoComplete
          autoHighlight
          options={movieList}
          filterOptions={(options, state) => {
            if (state.inputValue === '') {
              return [];
            }
            return options.filter(option =>
              option.toLowerCase().includes(state.inputValue.toLowerCase())
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Search Box"
            />
          )}
        />
      )}
    </div>
  );
}

export default SearchResults;
