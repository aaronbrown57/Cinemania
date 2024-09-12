import React, { useState, useEffect } from "react";
import MovieList from "./MovieList.js";

const MovieDisplay = ({ isAdmin }) => {
    const [movies, setMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/movies/AllMovies')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                // Check the "comingSoon" attribute of each movie
                const allMovies = data.filter(movie => !movie.comingSoon);
                const upcomingMovies = data.filter(movie => movie.comingSoon);
    
                setMovies(allMovies);
                setUpcomingMovies(upcomingMovies);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                // Attempt to log the response content if available
                if (error && error.response && error.response.text) {
                    error.response.text().then(text => console.log(text)).catch(err => console.error(err));
                } else {
                    console.log('No response content available.');
                }
            });
    }, []);
    
    

    return (
        <div>
            <h1>Now Playing!</h1>
            <MovieList items={movies} showing={true}/>
            <br />
            <h1>Upcoming Movies!</h1>
            <MovieList items={upcomingMovies}/>
        </div>
    );
}

export default MovieDisplay;
