// import { Carousel } from "bootstrap";
import { Carousel } from 'react-bootstrap';


function HeaderCarousel () {
    return (
        <Carousel>
      <Carousel.Item> {/* Pass the movie's ID or any identifier */}
        <img src="https://djmzubtjl6upi.cloudfront.net/wp-content/uploads/sites/3/2018/03/Roxy-Cinema-Tribeca1.jpg" alt="alternatetext" style={{ width: '650px', height: '400px' }} />
      </Carousel.Item>

      <Carousel.Item> {/* Pass the movie's ID or any identifier */}
        <img src="https://image.cnbcfm.com/api/v1/image/107291045-1692823231778-gettyimages-1478374885-cinema_7d5a6663.jpeg?v=1692975601&w=929&h=523&vtcrop=y" alt="alternatetext" style={{ width: '650px', height: '400px' }}/>
      </Carousel.Item>

      <Carousel.Item> {/* Pass the movie's ID or any identifier */}
      <img src="https://media.istockphoto.com/id/1363352866/photo/friends-enjoying-a-comedy-movie-at-the-cinema.jpg?s=612x612&w=0&k=20&c=j95E4hnsXQ2OEtNfJx9ct2t1bo8mTvYwW2hicZVYl9Q=" alt="alternatetext"style={{ width: '650px', height: '400px' }}/>       
      </Carousel.Item>

      <Carousel.Item> {/* Pass the movie's ID or any identifier */}
      <img src="https://www.shutterstock.com/image-photo/cinema-blank-wide-screen-people-600nw-2314929885.jpg" alt="alternatetext"style={{ width: '650px', height: '400px' }}/>
      </Carousel.Item>

      <Carousel.Item > {/* Pass the movie's ID or any identifier */}
      <img src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-136326,resizemode-75,msid-103828489/industry/media/entertainment/national-cinema-day-cinema-enthusiasts-can-be-a-part-of-a-movie-marathon-at-just-rs-99.jpg" alt="alternatetext"style={{ width: '650px', height: '400px' }}/>
      </Carousel.Item>

    </Carousel>
    )
}

export default HeaderCarousel;