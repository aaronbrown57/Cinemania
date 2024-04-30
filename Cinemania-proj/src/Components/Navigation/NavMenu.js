import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useContext } from "react";
import SearchResults from '../SearchResults';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./../css/Home.css";


function NavMenu({ loggedIn, loggedOut, admin }) {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [searchQuery, setSearchQuery] = useState(''); // state to store the query

  const handleSubmit = (e) => {
    e.preventDefault();
    // Goes to search results with the query
    // navigate(`/searchresults?query=${encodeURIComponent(searchQuery)}`);
    navigate("/search");
  };

  return (
    <Navbar expand="lg" className="nav-bar">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav">
            
            {loggedIn && admin === false && <button onClick={() => navigate("/edit")} className="nav-link">Edit Profile</button>}
            
            {admin && <button onClick={() => navigate("/manage-Users", { state: { isLoggedIn: true } })} className="nav-link">Manage Users</button>}
            
            {admin && <button onClick={() => navigate("/manage-Movies", { state: { isLoggedIn: true } })} className="nav-link">Manage Movies</button>}
            <br></br>
            
            {loggedIn && <button onClick={() => navigate("/Logout")} className="nav-link">Logout</button>}
            
            {loggedOut && <button onClick={() => navigate("/Login")} className="nav-link">Login</button>}
            <br></br>
            
            {loggedIn && admin === false && <button onClick={() => navigate("/order-history")} className="nav-link">Order History</button>}
            
            {admin && <button onClick={() => navigate("/manage-promos", { state: { isLoggedIn: true } })} className="nav-link">Manage Promotions</button>}
            
            {searchQuery !== '' && <SearchResults searchQuery={searchQuery} />}
            
            {!admin && (loggedIn || loggedOut) && <SearchResults />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMenu;
