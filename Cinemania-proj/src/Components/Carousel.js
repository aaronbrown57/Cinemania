import { Carousel } from "bootstrap";

const handleMovieSelect = (movieId) => {
    // Here you could navigate to a showtime selection page and pass the movieId
    // For demonstration, replace '/select-showtime' with your actual route
    // and pass the movieId as state or parameter as needed
  };
function NewCarousel () {
    return (
        <Carousel>
      <Carousel.Item onClick={() => handleMovieSelect(1)}> {/* Pass the movie's ID or any identifier */}
        <img src="https://upload.wikimedia.org/wikipedia/en/5/5b/Pearl_theatricalposter.jpg" alt="alternatetext" style={{ width: '250px', height: '400px' }}/>
      
        <Carousel.Caption>
          {/* <h3>First slide label</h3> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item onClick={() => handleMovieSelect(1)}> {/* Pass the movie's ID or any identifier */}
        <img src="https://upload.wikimedia.org/wikipedia/en/0/06/Bob_Marley_One_Love.jpg" alt="alternatetext" style={{ width: '250px', height: '400px' }}/>
        <Carousel.Caption>
          {/* <h3>First slide label</h3> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item onClick={() => handleMovieSelect(1)}> {/* Pass the movie's ID or any identifier */}
      <img src="https://upload.wikimedia.org/wikipedia/en/0/06/Mean_girls_2024_poster.jpg" alt="alternatetext"style={{ width: '250px', height: '400px' }}/>
        <Carousel.Caption>
          {/* <h3>First slide label</h3> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item onClick={() => handleMovieSelect(1)}> {/* Pass the movie's ID or any identifier */}
      <img src="https://upload.wikimedia.org/wikipedia/en/0/05/Argylle_poster.jpg" alt="alternatetext"style={{ width: '250px', height: '400px' }}/>
        <Carousel.Caption>
          {/* <h3>First slide label</h3> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item onClick={() => handleMovieSelect(1)}> {/* Pass the movie's ID or any identifier */}
      <img src="https://upload.wikimedia.org/wikipedia/en/a/a1/Dune_2_poster.jpg" alt="alternatetext"style={{ width: '250px', height: '400px' }}/>
        <Carousel.Caption>
          {/* <h3>First slide label</h3> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item onClick={() => handleMovieSelect(1)}> {/* Pass the movie's ID or any identifier */}
      <img src="https://upload.wikimedia.org/wikipedia/en/f/f0/Madame_Web_%28film%29_poster.jpg" alt="alternatetext"style={{ width: '250px', height: '400px' }}/>
        <Carousel.Caption>
          {/* <h3>First slide label</h3> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    )
}

export default NewCarousel;