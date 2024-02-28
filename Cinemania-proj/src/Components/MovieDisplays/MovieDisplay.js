import Container from "react-bootstrap/Container";
import Argylle from "./Argylle.js"
import React, { useState, useContext } from "react";
import MovieList from "./MovieList.js"
const DummyMovies = [
    // add other movie details to this 
    {
        id: 'arg',
        title: 'Argylle',
        director: 'Matthew Vaughn',
        img: "https://upload.wikimedia.org/wikipedia/en/0/05/Argylle_poster.jpg",
    },
    {
        id: 'mdw',
        title: 'Madame Web',
        director: 'S. J. Clarkson',
        img: "https://upload.wikimedia.org/wikipedia/en/f/f0/Madame_Web_%28film%29_poster.jpg",
    },
    {
        id: 'mean girls',
        title: 'Mean Girls',
        director: 'Samantha Jayne , Arturo Perez Jr.',
        img: "https://upload.wikimedia.org/wikipedia/en/0/06/Mean_girls_2024_poster.jpg",
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
        
        <Container>
            <MovieList items={movie}></MovieList>
                <Argylle></Argylle>
        </Container>
    )
}

export default MovieDisplay;