import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import NavMenu from './Navigation/NavMenu.js'
import React, { useState, useContext } from "react";
import MovieDisplay from "./MovieDisplays/MovieDisplay.js"

function Home( loggedOut) {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  
  // On handleMouseOver, while the curor is over the video, it will play the video and 
  // pause when the cursor is removed from the trailer
  const handleMouseOver = () => {
    setVideoIsPlaying(true);
  };

  const handleMouseOut = () => {
    setVideoIsPlaying(false);
  };

  

  return (
    <div className="App">
      <NavMenu loggedOut={true}></NavMenu>
    <Container>
      <hr></hr>
      <h1>Now Playing</h1> <hr></hr>

      {/* Carousel that spins the available moves around */}
      <Carousel>
      <Carousel.Item>
      <img src="https://upload.wikimedia.org/wikipedia/en/5/5b/Pearl_theatricalposter.jpg" alt="alternatetext"
       />
      
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://upload.wikimedia.org/wikipedia/en/0/06/Bob_Marley_One_Love.jpg" alt="alternatetext"/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://upload.wikimedia.org/wikipedia/en/0/06/Mean_girls_2024_poster.jpg" alt="alternatetext"/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://upload.wikimedia.org/wikipedia/en/0/05/Argylle_poster.jpg" alt="alternatetext"/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://upload.wikimedia.org/wikipedia/en/a/a1/Dune_2_poster.jpg" alt="alternatetext"/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://upload.wikimedia.org/wikipedia/en/f/f0/Madame_Web_%28film%29_poster.jpg" alt="alternatetext"/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <MovieDisplay></MovieDisplay>
    </Container>
    </div>
  );
}

export default Home;
