import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from 'axios';

const SearchResults = () => {
  const [movieList, setMovielist] = useState([]);


 const getDataFromAPI = async () => {
    try {
      console.log("Options Fetched from API");
  
      const response = await axios.get("http://127.0.0.1:5000/movies/allMovies");
      const data = response.data;
  
      console.log(data);
      
      const movieList = data.map(movie => movie.title);
      setMovielist(movieList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

 return (
   <div
    
   >
         <Autocomplete
       style={{ width: 500, margin: "auto" }}
       freeSolo
       autoComplete
       autoHighlight
       options={movieList}
       renderInput={(params) => (
         <TextField
           {...params}
           onChange={getDataFromAPI}
           variant="outlined"
           label="Search Box"
         />
       )}
     />
   </div>
 );
}

export default SearchResults;
