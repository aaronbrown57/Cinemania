import { useState, useContext } from 'react'; // Import useState to use state variables
import { Link, useNavigate } from "react-router-dom";
import NavMenu from "./Navigation/NavMenu";
import ConfirmAccountCreation from "./ConfirmAccountCreation";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CreditCardInput from "react-credit-card-input";
import { UserContext } from '../context/UserContext';
import axios from 'axios';
function SignUp() {
  const [datastate, setData] = useState({
   
   firstName: "",
    lastName: "",
    email:"",
    phone:"",
    password:"",
    confirmPassword:"",
    creditCard:{
      cardNumber: "",
      expiry: "",
    },
    billingAddress:"",
    homeAddress: "",
    promoSubscription:false,
});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);



  // Handler for updating credit card information
  const handleCreditCardChange = ({ target }) => {
    setData({
      ...datastate,
      creditCard: {
        ...datastate.creditCard,
        [target.name]: target.value
      }
    });
  };

  const handleSubmit= async (e)=> {
      e.preventDefault();
      setLoading(true);
      try {
        const newUser = {...datastate};
        
          // Check if correct axios stuff
       
        console.log("New User Data:", newUser);
          await axios.post("http://localhost:5000/users/signup", newUser);

          const loginRes = await axios.post("http://localhost:5000/users/login", {
            email: newUser.email, // needed for login
            password: newUser.password
          });

          console.log("Login Response:", loginRes);


      setUserData({
          token:loginRes.data.token,
          user:loginRes.data.user,
      });
      localStorage.setItem("auth-token",loginRes.data.token);
      setLoading(false);
      navigate('/authView')
        }catch (err) {
          console.error("Error:", err);
          setLoading(false);
          err.response.data.msg && setError(err.response.data.msg);
      }
  }
  return (
    <div className="signupDiv">
      <NavMenu></NavMenu>
      <h1>Become a Cinemaniac!</h1>
      <Form className="login-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control 
          type="text"
           placeholder="Enter your first name" 
           name="firstName"
           value={datastate.firstName} 
           onChange={(e) => setData({ ...datastate, firstName: e.target.value })} 
           required
           />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Enter your last name" 
          name="lastName"
          value={datastate.lastName} 
           onChange={(e) => setData({ ...datastate, lastName: e.target.value })} 
           required
           />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
          type="email"
          placeholder="Enter your email" 
          name="email"
          value={datastate.email} 
           onChange={(e) => setData({ ...datastate, email: e.target.value })} 
           required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control 
          type="tel" 
          placeholder="Enter phone number" 
          name="phoneNumber"
          value={datastate.phone} 
           onChange={(e) => setData({ ...datastate, phone: e.target.value })} 
           required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Enter a password" 
          name="password"
          value={datastate.password} 
          onChange={(e) => setData({ ...datastate, password: e.target.value })} 
          required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
          type="password"
           placeholder="Confirm password" 
           name="confirmPassword"
           value={datastate.confirmPassword} 
           onChange={(e) => setData({ ...datastate, confirmPassword: e.target.value })} 
           required
           />
        </Form.Group>

        <br></br>

        <CreditCardInput
  cardNumberInputProps={{
    value: datastate.creditCard.cardNumber,
    onChange: (e) => {
      setData({
        ...datastate,
        creditCard: {
          ...datastate.creditCard,
          cardNumber: e.target.value
        }
      });
    }
  }}
  cardExpiryInputProps={{
    value: datastate.creditCard.expiry, 
    onChange: (e) => {
      setData({
        ...datastate,
        creditCard: {
          ...datastate.creditCard,
          expiry: e.target.value
        }
      });
    }
  }}
  fieldClassName="input"
/>


        <Form.Group className="mb-3" controlId="formBasicBillingAddress">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control 
          type="address" 
          placeholder="Enter your Billing Address" 
          name="billingAddress"
          value={datastate.billingAddress} 
        onChange={(e) => setData({ ...datastate, billingAddress: e.target.value })} 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicHomeAddress">
          <Form.Label>Home Address</Form.Label>
          <Form.Control 
          type="address"
           placeholder="Enter your Home Address" 
           name="homeAddress"
           value={datastate.homeAddress} 
        onChange={(e) => setData({ ...datastate, homeAddress: e.target.value })} 
        required
           />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Check
    type="checkbox"
    label="Subscribe to Promotional Content"
    checked={datastate.promoSubscription} // Bind checked prop to promoSubscription state
    onChange={(e) => setData({ ...datastate, promoSubscription: e.target.checked })} // Handle checkbox change
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