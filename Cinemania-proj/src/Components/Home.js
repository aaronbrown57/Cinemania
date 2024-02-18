import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useContext } from "react";
import AdminLogin from './AdminLogin';
function Home() {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  
  // On handleMouseOver, while the curor is over the video, it will play the video and 
  // pause when the cursor is removed from the trailer
  const handleMouseOver = () => {
    setIsPlaying(true);
  };

  const handleMouseOut = () => {
    setIsPlaying(false);
  };

  

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <h3>Cinemania</h3>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#edit">Edit Profile</Nav.Link>
            <br></br>
            <Link to='Login'>Login</Link>
            <Link to='Sign-up'>Sign-up</Link>
            <br></br>
            <Link to='AdminLogin'>Admin</Link>
            <Nav.Link href="#order-history">Order History</Nav.Link>
            <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
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
      <img src="https://upload.wikimedia.org/wikipedia/en/0/06/Mean_girls_2024_poster.jpg" alt="alternatetext"/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
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
      <img src="https://upload.wikimedia.org/wikipedia/en/f/f0/Madame_Web_%28film%29_poster.jpg" alt="alternatetext"/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Container>
    </div>
  );
}

export default Home;
