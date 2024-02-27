import { Link, useNavigate } from 'react-router-dom';
import NavMenu from "./Navigation/NavMenu";
import ConfirmAccountCreation from "./ConfirmAccountCreation";
function SignUp (){
    const x=8;
    const navigate = useNavigate();
   
    const handleSubmit=(e)=>{
        e.preventDefault();
        navigate('/ConfirmAccountCreation')
    }

                            return(
                            <div className="signupDiv">
                                <NavMenu></NavMenu>
                                <h1>This is the Sign-Up page</h1>


                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="email">Email:</label>
                                    <input type="text" id="email" name="email" />
                                    <br />
                                    <label htmlFor="fname">First name:</label>
                                    <input type="text" id="fname" name="fname" />
                                    <br />
                                    <label htmlFor="lname">Last name:</label>
                                    <input type="text" id="lname" name="lname" />
                                    <br />
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" id="username" name="username" />
                                    <br />
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" name="password" />
                                    <br />
                                    <input type="submit" value="Create Account" />
                                </form>
                            </div>
                            )
}

                            export default SignUp;