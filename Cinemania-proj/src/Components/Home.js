import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminLogin from './AdminLogin';
function App() {
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
    </Container>
    </div>
  );
}

export default App;
