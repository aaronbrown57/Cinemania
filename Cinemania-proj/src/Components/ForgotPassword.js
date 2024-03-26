import React, { useState, useContext } from 'react'; // Import useContext hook
import { Link, useNavigate } from 'react-router-dom';
import NavMenu from './Navigation/NavMenu';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserContext } from "../context/UserContext"; // Import UserContext
import axios from 'axios';

const ForgotPassword = () => {
  
  const [enteredEmail, setEnteredEmail] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext); // Use useContext hook to access UserContext

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/users/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: enteredEmail }),
      });

      if (!response.ok) {
        throw new Error('Failed to check email existence');
      }

      const responseData = await response.json();

      setUserData({
        exists: responseData.exists,
        email: enteredEmail,
      });

      if (responseData.exists) {
        // Display message to check email for login information
        setError('Check your email for login information.');
      } else {
        // Display message that email does not exist
        setError('Email does not exist.');
      }
    } catch (error) {
      console.error('Error checking email existence:', error.message);
      setError('An error occurred while checking email existence');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <NavMenu loggedOut={true} />
      <Container>
        <Form className="forgot-password-form" onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
          </Form.Group>

          {error && <div>{error}</div>}
          <Button variant="primary" type="submit">
            Send Email
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ForgotPassword;
