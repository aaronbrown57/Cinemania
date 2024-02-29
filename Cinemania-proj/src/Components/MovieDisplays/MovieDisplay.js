import Container from "react-bootstrap/Container";
import React, { useState, useContext } from "react";
import MovieList from "./MovieList.js"
const DummyMovies = [
    // add other movie details to this 
    {
        id: 'arg',
        title: 'Argylle',
        director: 'Matthew Vaughn',
        img: "https://upload.wikimedia.org/wikipedia/en/0/05/Argylle_poster.jpg",
        trailer: "7mgu9mNZ8Hk",
    },
    {
        id: 'mdw',
        title: 'Madame Web',
        director: 'S. J. Clarkson',
        img: "https://upload.wikimedia.org/wikipedia/en/f/f0/Madame_Web_%28film%29_poster.jpg",
        trailer: "s_76M4c4LTo",
    },
    {
        id: 'mean girls',
        title: 'Mean Girls',
        director: 'Samantha Jayne , Arturo Perez Jr.',
        img: "https://upload.wikimedia.org/wikipedia/en/0/06/Mean_girls_2024_poster.jpg",
        trailer: "fFtdbEgnUOk",
    },
    
];

      
const MovieDisplay = ()  => {
    const [movie, setMovies] = useState(DummyMovies);
    const addMovieHandler = movie => {
        setMovies((prevMovies) => {
          return [movie, ...prevMovies];
        });
      };
    return(
        <MovieList items={movie}></MovieList>
    )
}

export default MovieDisplay;
export { DummyMovies };