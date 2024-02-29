import Container from "react-bootstrap/Container";
import React, { useState, useContext } from "react";
import MovieList from "./MovieList.js"
import AddMovie from './AddMovie';
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
const DummyUpcomingMovies = [
    // add other movie details to this 
    {
        id: 'joker',
        title: 'Joker: Folie à Deux',
        director: 'Todd Phillips',
        img: "data:image/jpeg;base64,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",
        trailer: "03ymBj144ng",
    },
    {
        id: 'deadpool 3',
        title: 'Deadpool & Wolverine',
        director: 'Shawn Levy',
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr9T4mNLl7rYbIqjVDKnGViW9WuYsUpWg3WA&usqp=CAU",
        trailer: "lH-FEoOKIRc",
    },
    {
        id: 'io2',
        title: 'Inside Out 2',
        director: 'Kelsey Mann',
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Inside_Out_2_poster.jpg/220px-Inside_Out_2_poster.jpg",
        trailer: "VWavstJydZU",
    },
];

      
const MovieDisplay = ({ isAdmin })  => {
    const [movie, setMovies] = useState(DummyMovies);
    const [upcomingMovie, setUpcomingMovies] = useState(DummyUpcomingMovies);
   
    const addMovieHandler = (newMovie, type) => {
        if (type === 'nowPlaying') {
          setMovies(prevMovies => [newMovie, ...prevMovies]);
        } else if (type === 'upcoming') {
          setUpcomingMovies(prevUpcomingMovies => [newMovie, ...prevUpcomingMovies]);
        }
      };
    return(
        <div>
        <h1>Now Playing!</h1>
        <MovieList items={movie} />
        {isAdmin && <AddMovie onAddMovie={newMovie => addMovieHandler(newMovie, 'nowPlaying')} />}
        <br />
        <h1>Upcoming Movies!</h1>
        
      </div>
    )
}

export default MovieDisplay;
export { DummyMovies };