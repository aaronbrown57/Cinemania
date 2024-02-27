import { Link, useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import AuthView from './AuthView/AuthView';
const ConfirmAccountCreation = () => {
    const [formData, setFormData] = useState({
        code: ''
    });

    const navigate = useNavigate();
    // in the future will need a number generator to randomly generate 4 digit numbers
    //  but for now this is good

    const confirmCode=()=>{
        navigate('/authView');
        return(
            alert('You are now a Cinemania member! CLick here to return to he home screen') 
        )
    }

    const handleInput=(e)=>{
        const inputValue = e.target.value;
        // Check if input value is a number and has 4 digits
        if (/^\d{0,4}$/.test(inputValue)) {
            setFormData(inputValue);
        }
    }

    return (
        
        <div className="confirmationDiv">
            <h1>Thank you valued user for creating your account</h1>
            <h4>Please confirm the 4 digit code sent to your email</h4>
            <form onSubmit={confirmCode}>
                <label htmlFor="code">Enter 4 digit code:</label>
                <input type="number" name="code" />
                <br /><br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}  
export default ConfirmAccountCreation;