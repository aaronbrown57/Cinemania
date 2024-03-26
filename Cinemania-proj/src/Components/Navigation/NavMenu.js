import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useContext } from "react";
import SearchResults from '../SearchResults';
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink and useNavigate



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
            {loggedIn && admin === false && <NavLink to="/edit" className="nav-link">Edit Profile</NavLink>}
            {admin && <NavLink to="/manage-Users" className="nav-link">Manage Users</NavLink>}
            {admin && <NavLink to="/manage-Movies" className="nav-link">Manage Movies</NavLink>}
            <br></br>
            {loggedIn && <NavLink to='/Logout' className="nav-link">Logout</NavLink>}
            {loggedOut && <NavLink to='/Login' className="nav-link">Login</NavLink>}
            <br></br>
            {loggedIn && admin === false &&<NavLink to="/order-history" className="nav-link">Order History</NavLink>}
            {admin && <NavLink to="/manage-promos" className="nav-link">Manage Promotions</NavLink>}
            {/* <Form inline onSubmit={handleSubmit}>
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
            </Form> */}
            {admin === false && <SearchResults/>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavMenu;