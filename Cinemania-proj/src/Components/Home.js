import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import NavMenu from './Navigation/NavMenu.js'
import React, { useState, useContext } from "react";
import MovieDisplay from "./MovieDisplays/MovieDisplay.js"
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


function Home( loggedOut) {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  
  // On handleMouseOver, while the curor is over the video, it will play the video and 
  // pause when the cursor is removed from the trailer
  const handleMouseOver = () => {
    setVideoIsPlaying(true);
  };

  const handleMouseOut = () => {
    setVideoIsPlaying(false);
  };

  // Function to handle movie selection
  const handleMovieSelect = (movieId) => {
    // Here you could navigate to a showtime selection page and pass the movieId
    // For demonstration, replace '/select-showtime' with your actual route
    // and pass the movieId as state or parameter as needed
    navigate(`/select-showtime/`);
  };

  return (
    <div className="App">
      <NavMenu loggedOut={true}></NavMenu>
    <Container>
      <hr></hr>

      {/* Carousel that spins the available moves around */}
      
    <MovieDisplay></MovieDisplay>
    </Container>
    </div>
  );
}

export default Home;
