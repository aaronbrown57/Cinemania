import React, { useState, useContext } from 'react'; // Import useContext hook
import { Link, useNavigate } from 'react-router-dom';
import NavMenu from './Navigation/NavMenu';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserContext } from "../context/UserContext"; // Import UserContext
import axios from 'axios';

const Login = () => {
  
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext); // Use useContext hook to access UserContext

  async function submitHandler(event){
    event.preventDefault();
    setLoading(true);
    try {
      const loginData={
        email:enteredEmail,
        password:enteredPassword,
      };

      console.log(loginData);

      const loginRes = await axios.post("http://localhost:5000/users/login", loginData)
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      
      localStorage.setItem("auth-token", loginRes.data.token);
      setLoading(false);
      navigate(`/AuthView/${loginRes.data.user.firstName}`);

    } catch (err) {
      setLoading(false);
      err.response.data.msg && setError(err.response.data.msg);
    }
    setEnteredEmail('');
    setEnteredPassword('');
  }

  return (
    <div>
      <NavMenu loggedOut={true} />
      <Container>
        <Form className="login-form" onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
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
