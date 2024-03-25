import { useState } from 'react'; // Import useState to use state variables
import { Link, useNavigate } from "react-router-dom";
import NavMenu from "./Navigation/NavMenu";
import ConfirmAccountCreation from "./ConfirmAccountCreation";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CreditCardInput from "react-credit-card-input";
import CreditCardIntake from "./CreditCardIntake";


function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(''); // Define error state variable with initial value ''

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if the event target is an HTMLFormElement
    if (e.target instanceof HTMLFormElement) {
      const formData = new FormData(e.target); // Access form data directly from the event target
      const requiredFields = [
        "firstname",
        "lastname",
        "email",
        "password",
        "confirmPassword",
        "billingAddress",
        "homeAddress",
      ];
  
      const allFieldsFilled = requiredFields.every((field) => formData.get(field));
  
      if (!allFieldsFilled) {
        setError("Please fill out all required fields.");
        return;
      }
  
      // Convert formData to JSON object
      const userData = {};
      formData.forEach((value, key) => {
        userData[key] = value;
      });
  
      try {
        const response = await fetch('./../backend/routes/users/newUser', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          throw new Error("Failed to create account");
        }
  
        console.log("Account created successfully!");
        navigate("/ConfirmAccountCreation");
      } catch (error) {
        setError("Error creating account: " + error.message);
      }
    } else {
      setError("Invalid form submission.");
    }
  };

  return (
    <div className="signupDiv">
      <NavMenu></NavMenu>
      <h1>Become a Cinemaniac!</h1>
      <Form className="login-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" placeholder="Enter your first name" name="firstname" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control type="lastname" placeholder="Enter your last name" name="lastname"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="firstname" placeholder="Enter your email" name="email"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="tel" placeholder="Enter phone number" name="phoneNumber"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter a password" name="password"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm password" name="confirmPassword"/>
        </Form.Group>

        <br></br>

        <CreditCardInput />

        <Form.Group className="mb-3" controlId="formBasicBillingAddress">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control type="address" placeholder="Enter your Billing Address" name="billingAddress"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicHomeAddress">
          <Form.Label>Home Address</Form.Label>
          <Form.Control type="address" placeholder="Enter your Home Address" name="homeAddress"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Subscribe to Promotional Content"
          />
        </Form.Group>

        <Button variant="primary" type="submit" >
          Register
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;