import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthView from './AuthView/AuthView';
const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        // Navigate to a different route
        navigate('/AuthView');
    };

    return (
        <div>
            <h1>This is the log in page</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="Username">Username:</label>
                <input type="text" id="Username" name="Username" />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
                <br />
                <button type="submit">Login</button>
            </form>

            <p>Or</p>
            <Link to="/SignUp">Signup</Link>
        </div>
    );
};

export default Login;
