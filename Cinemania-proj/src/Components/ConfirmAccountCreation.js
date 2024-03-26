import { Link, useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import AuthView from './AuthView/AuthView';
import axios from 'axios';
const ConfirmAccountCreation =  ({ userEmail, userName })=> {
    const [formData, setFormData] = useState({
        email: userEmail,
        verificationCode: ''
    });


    const handleInput = (e) => {
        const inputValue = e.target.value;
        // Check if input value is a number and has 4 digits
        if (/^\d{0,4}$/.test(inputValue)) {
            setFormData(prevState => ({ ...prevState, verificationCode: inputValue }));
        }
    }
    

    const navigate = useNavigate();
    // in the future will need a number generator to randomly generate 4 digit numbers
    //  but for now this is good

    const confirmCode= async (e)=>{
        e.preventDefault();
        try{
            console.log(formData)
        const response = await axios.post('http://localhost:5000/users/confirm-account', formData);
        navigate(`/AuthView/${userName}`);

            alert('You are now a Cinemania member! Click here to return to the home screen') 
        }    
            catch (error) {
                // Handle errors
                console.error('Error confirming account:', error);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    alert(error.response.data.msg);
                } else if (error.request) {
                    // The request was made but no response was received
                    alert('No response from the server');
                } else {
                    // Something happened in setting up the request that triggered an error
                    alert('Error sending request');
                }
            }
    }

  

    return (
        
        <div className="confirmationDiv">
            <h1>Thank yo {userName} for creating your account</h1>
            <h4>Please confirm the 4 digit code sent to your email</h4>
            <form onSubmit={confirmCode}>
                <label htmlFor="code">Enter 4 digit code:</label>
                <input type="number" name="code" onChange={handleInput}/>
                <br /><br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}  
export default ConfirmAccountCreation;