import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavMenu from "./Navigation/NavMenu";
import { Container, Form, Button } from "react-bootstrap";
import CreditCardInput from "react-credit-card-input";
import axios from "axios";

const Edit = () => {
  const navigate = useNavigate();
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [userId, setUserId] = useState(""); // Separate state for user ID
  const [userData, setUserData] = useState({
    firstName: "", // Initialize with empty string
    lastName: "", // Initialize with empty string
    email: "", // Initialize with empty string
    creditCard: {
      cardNumber: "",
      expiry: "",
    },
    password: "", // Initialize with empty string
    confirmPassword: "", // Initialize with empty string
    billingAddress: "", // Initialize with empty string
    homeAddress: "", // Initialize with empty string
    phoneNumber: "", // Initialize with empty string
    promoSubscription: false,
  });

  const [paymentData, setPaymentData] = useState({
    // Define paymentData state
    userID: "", // Assuming you have the user's ID available
    amount: 0, // Initialize with default amount
    paymentMethod: "", // Initialize with default payment method
  });

  useEffect(() => {
    // Fetch user data and set it to state
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const loginData = {
        email: currentEmail,
        password: currentPassword,
      };

      const loginRes = await axios.post(
        "http://localhost:5000/users/login",
        loginData
      );
      console.log("Login Response:", loginRes.data); // Log the response data for debugging

      const response = await fetch("http://localhost:5000/users/allUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      console.log("Fetched user data:", userData); // Log fetched user data

      const user = userData.find((user) => user.email === currentEmail);
      console.log("Found user:", user); // Log the found user

      if (user) {
        setUserId(user._id); // Set user ID
        setUserData((prevUserData) => ({
          ...prevUserData,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: currentPassword,
          promoSubscription: user.promoSubscription,
          creditCard: {
            cardNumber: user.creditCard ? user.creditCard.cardNumber : "", // Check if creditCard object exists
            expiry: user.creditCard ? user.creditCard.expiry : "", // Check if creditCard object exists
          },
        }));
      } else {
        console.error("Current user not found"); // Log if current user is not found
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmitCurrentInfo = async (e) => {
    e.preventDefault();
    console.log("Submit Current Info Button clicked"); // Debug log for button click
    // Fetch current user data based on entered email and password
    fetchUserData();
  };

  const handleSubmitUpdateUser = async (e) => {
    e.preventDefault();
    console.log("Button clicked"); // Debug log for button click

    try {
      console.log("Starting user update request..."); // Debug log for starting request

      // Create a new userData object without the password field
      const updatedUserData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        billingAddress: userData.billingAddress,
        homeAddress: userData.homeAddress,
        phoneNumber: userData.phoneNumber,
        promoSubscription: userData.promoSubscription,
      };

      // Log updatedUserData before sending update request
      console.log("Updated User Data:", updatedUserData);

      if (userData.creditCard.cardNumber !== "") {
        console.log("Card number present. Calling addCard..."); // Debug log for calling addCard method

        // Call the addCard method if the card number is not empty
        const paymentData = {
          userID: userId,
          cardNo: userData.creditCard.cardNumber, // Include cardNo in paymentData
          expirationDate: userData.creditCard.expiry, // Assuming expirationDate comes from creditCard.expiry
        };

        console.log("Payment Data:", paymentData); // Log payment data

        // Print out paymentData before sending to addCard endpoint
        console.log("Sending paymentData to addCard:", paymentData);

        const response = await fetch(
          "http://localhost:5000/paymentMethods/addCard",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(paymentData), // Send paymentData for adding card
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add card");
        }

        const responseData = await response.json();
        console.log("Response Data:", responseData); // Log response data
      } else {
        console.log("No card number present. Skipping addCard..."); // Debug log if no card number is present
      }

      // Update user data in the database
      const updateUserRes = await axios.put(
        `http://localhost:5000/users/updateUser/${userId}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Update User Response:", updateUserRes.data); // Log the response data

      // Check if the update was successful
      if (updateUserRes.status === 200) {
        console.log("User data updated successfully");
        // Update the user data in the state
        setUserData(updatedUserData);

        // Show a success message to the user
        alert("Profile updated successfully!");
      } else {
        console.log("Failed to update user data");
        // Show an error message to the user
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Show an error message to the user
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: newValue,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevPaymentData) => ({
      ...prevPaymentData,
      [name]: value,
    }));
  };

  return (
    <div>
      <NavMenu />
      <Container>
        <h1>Edit Profile</h1>
        <Form onSubmit={handleSubmitCurrentInfo}>
          <Form.Group controlId="formBasicCurrentEmail">
            <Form.Label>Current Email</Form.Label>
            <Form.Control
              type="email"
              name="currentEmail"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              placeholder="Enter your current email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicCurrentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Current Info
          </Button>
        </Form>

        <Form onSubmit={handleSubmitUpdateUser}>
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={userData.firstName || ""}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={userData.lastName || ""}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Billing Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
          <p>Add payment method</p>
          <CreditCardInput
            cardNumberInputProps={{
              value: userData.creditCard ? userData.creditCard.cardNumber : "", // Check if userData.creditCard exists
              onChange: (e) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  creditCard: {
                    ...prevUserData.creditCard,
                    cardNumber: e.target.value,
                  },
                }));
              },
            }}
            cardExpiryInputProps={{
              value: userData.creditCard ? userData.creditCard.expiry : "", // Check if userData.creditCard exists
              onChange: (e) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  creditCard: {
                    ...prevUserData.creditCard,
                    expiry: e.target.value,
                  },
                }));
              },
            }}
            fieldClassName="input"
          />

          <Form.Group controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={userData.password || ""}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              placeholder="Enter new password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Subscribe to Promotional Content"
              checked={userData.promoSubscription} // Bind checked prop to promoSubscription state
              onChange={(e) =>
                setUserData({
                  ...userData,
                  promoSubscription: e.target.checked,
                })
              } // Handle checkbox change
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Edit;
