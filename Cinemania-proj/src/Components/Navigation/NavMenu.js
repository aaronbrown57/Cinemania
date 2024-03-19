import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';


function NavMenu({ loggedIn, loggedOut, admin }) {
  const history = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // state to store the query

  const handleSubmit = (e) => {
    e.preventDefault();
    //goes to search results withthe query
    history(`/searchresults?query=${encodeURIComponent(searchQuery)}`);
  };
  return (
    <Navbar expand="lg" className="nav-bar">
      <Container>
        <h1 className='web-name'>Cinemania </h1>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav">
            {loggedIn && admin === false && <Nav.Link href="/Edit">Edit Profile</Nav.Link>}
            {admin && <Nav.Link href="/manage-Users">Manage Users</Nav.Link>}
            {admin && <Nav.Link href="/manage-Movies">Manage Movies</Nav.Link>}
            <br></br>
            {loggedIn && <Nav.Link href='/Logout'>Logout</Nav.Link>}
            {loggedOut && <Nav.Link href='/Login'>Login</Nav.Link>}

            <br></br>

            {loggedIn && <Nav.Link href="/order-history">Order History</Nav.Link>}
            {admin && <Nav.Link href="/manage-promos">Manage Promotions</Nav.Link>}
            <Form inline onSubmit={handleSubmit}>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="search-box"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit" className='search-btn'>Search</Button>
                </Col>
              </Row>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavMenu;