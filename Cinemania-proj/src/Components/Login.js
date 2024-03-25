import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavMenu from './Navigation/NavMenu';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:5000/users/allUsers');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const users = await response.json();

      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        // Handle successful login
        console.log('Login successful');
        const userId = user.firstName;
        navigate(`/AuthView/${userId}`); // Redirect to the home page after successful login
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to login. Please try again later.');
    }
  };

  return (
    <div>
      <NavMenu loggedOut={true} />
      <Container>
        <Form className="login-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {error && <div>{error}</div>}
          <Button variant="primary" type="submit">
            Signin
          </Button>
          <br />
          <Form.Text className="sign-up">
            Or Sign Up <Link to="/Signup">here</Link>
          </Form.Text>
        </Form>
      </Container>
    </div>
  );
};

export default Login;

