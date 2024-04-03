import React, { useState } from 'react';
import NavMenu from '../Navigation/NavMenu';
import MovieDisplay from '../MovieDisplays/MovieDisplay';
import Container from 'react-bootstrap/Container'; // Import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router-dom';

const AuthView = ({ loggedIn }) => { // Modify the props destructuring to include loggedIn
  const { userId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  // Function to toggle the modal open/close
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="App">
      <NavMenu loggedIn={true} admin={false}></NavMenu>
      <h1>Welcome back {userId}!</h1>
      <Container>
        {/* Pass toggleModal down to MovieDisplay */}
        <MovieDisplay toggleModal={toggleModal} />
      </Container>
    </div>
  );
}

export default AuthView;
