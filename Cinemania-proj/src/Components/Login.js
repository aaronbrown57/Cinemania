import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthView from './AuthView/AuthView';
import Nav from 'react-bootstrap/Nav';
import NavMenu from './Navigation/NavMenu';
import { Container } from 'react-bootstrap';
import "./css/Home.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const handleSubmit = (event) => {

        event.preventDefault(); // Prevent default form submission behavior
        if (email === 'admin@example.com' && password === 'admin123') {
            // Redirect to admin page
            navigate('/admin');
          } else {
        // Navigate to a different route
        navigate('/AuthView');
    };
    }
    return (
        <div >
        <Form className='login-form'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
         
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Signin
          </Button>
<br></br>

          <Form.Text className="sign-up">
             Or Sign Up <a href="/Signup">here</a>
            </Form.Text>

        </Form>
        </div>
      );
};

export default Login;
