import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavMenu from './Navigation/NavMenu.js';
import MovieDisplay from "./MovieDisplays/MovieDisplay.js"; // Assuming this is the correct path
import './css/Home.css'
import HeaderCarousel from './HeaderCarousel.js';
function Home() {
  const navigate = useNavigate();

  const handleMovieSelect = (movie) => {
    navigate('/select-showtime', { state: { chosenMovie: movie.title } });
  };
  
  return (
    <div className="App">
      <NavMenu loggedOut={true}></NavMenu>
      <Container>
        <hr />
    
         
        <HeaderCarousel/>
        <MovieDisplay onMovieSelect={handleMovieSelect} />
      </Container>
    </div>
  );
}

export default Home;
