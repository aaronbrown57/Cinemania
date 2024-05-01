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
    navigate('/select-showtime', { state: { chosenMovie: movie.title, isLoggedIn: true } });
  };
  
  const handleClick = () => {
    navigate('/');
  }
  return (
    <div className="App">
       <h1 className='web-name' onClick={handleClick}>Cinemania </h1>
      <NavMenu loggedOut={true}></NavMenu>
      <Container>
        <hr />
    
         
        <HeaderCarousel className="carousel"/>
        <MovieDisplay onMovieSelect={handleMovieSelect} />
      </Container>
    </div>
  );
}

export default Home;
