import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthView from './AuthView/AuthView';
import NavMenu from './Navigation/NavMenu';
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
        <div>
            <NavMenu loggedOut={true}></NavMenu>
            <h1>This is the log in page</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="Username">Email:</label>
                <input type="email" value={email} name="Username" onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">Login</button>
            </form>

            <p>Or</p>
            <Link to="/SignUp">Signup</Link>
        </div>
    );
};

export default Login;
