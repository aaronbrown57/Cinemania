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
      {error && <div className="error-message">{error}</div>}
      <Form className="login-form" onSubmit={handleSubmit}>
        {/* Form fields here */}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;
