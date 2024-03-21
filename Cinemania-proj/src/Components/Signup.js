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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
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

    navigate("/ConfirmAccountCreation");
  };

  return (
    <div className="signupDiv">
      <NavMenu></NavMenu>
      <h1>Become a Cinemaniac!</h1>
      <Form className="login-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First name</Form.Label>
          <Form.Control type="firstname" placeholder="First name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last name</Form.Label>
          <Form.Control type="lastname" placeholder="last name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="textarea" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <br></br>

        <CreditCardInput />

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control type="address" placeholder="Billing Address" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Home Address</Form.Label>
          <Form.Control type="address" placeholder="Home Address" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Subscribe to Promotional Content"
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;