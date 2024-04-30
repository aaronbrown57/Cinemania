import React, { useState } from 'react';
import NavMenu from '../Navigation/NavMenu';
import MovieDisplay from '../MovieDisplays/MovieDisplay';
import Container from 'react-bootstrap/Container'; // Import Container from 'react-bootstrap/Container'
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AuthView = ( {loggedIn} ) => { // Modify the props destructuring to include loggedIn
  const { userId } = useParams();
  const location = useLocation();
  const isAuth = location.state && location.state.isAuth;
  const navigate = useNavigate();

  if(isAuth) {
    return (
      <div className="App">
        <NavMenu loggedIn={true} admin={false}></NavMenu>
        <h1>Welcome back {userId}!</h1>
        <Container>
          {/* Pass toggleModal down to MovieDisplay */}
          <MovieDisplay />
        </Container>
      </div>
    
    );
  }
  else {
    navigate('/');
    return null;
  }
}

export default AuthView;
