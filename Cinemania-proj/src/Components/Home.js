import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import NavMenu from './Navigation/NavMenu.js';
import MovieDisplay from "./MovieDisplays/MovieDisplay.js"; // Assuming this is the correct path
import { DummyMovies } from "./MovieDisplays/MovieDisplay"; 
import './css/Home.css'

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
        <h1>Now Playing</h1>
        <hr />
        <Carousel>
          {DummyMovies.map((movie) => (
            <Carousel.Item key={movie.id} onClick={() => handleMovieSelect(movie)}>
              <img
                className="custom-carousel-img"
                src={movie.img}
                alt={movie.title}
              />
              <Carousel.Caption>
                <h3>{movie.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <MovieDisplay onMovieSelect={handleMovieSelect} />
      </Container>
    </div>
  );
}

export default Home;
