import { Form } from "react-router-dom";
import { Link } from 'react-router-dom';
const Login = () => {
    const x = 8;
    return (
        <div>
            <h1>This is the log in page</h1>

            <form>
                <label for="fname">Username:</label>
                <input type="text" id="Username" name="Username"></input>
                <br></br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password"></input>
                <br></br>
                <input type="submit"></input>
                
            </form>
            <p>Or</p>
           <Link to="/SignUp">Signup</Link>
            {/* <Form>  
                <label for="fname">First name:</label>
                <input type="text" id="fname" name="fname"></input>
                <label for="lname">Last name:</label><br></br>
                <input type="text" id="lname" name="lname"></input>
            </Form>  */}
        </div>


    )
}

export default Login;