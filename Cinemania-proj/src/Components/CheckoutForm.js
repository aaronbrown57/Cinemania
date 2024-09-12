import React, { useEffect, useState } from "react";
import "./css/CheckoutForm.css";
import { useLocation, Link } from "react-router-dom";
import axios from "axios"; // Import Axios for HTTP requests
import { useNavigate } from 'react-router-dom';


const CheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = location.state && location.state.isLoggedIn;
  const { selectedSeats, showtime, chosenMovie, ticketAges, total, userEmail } =
    location.state || {};
  const [userPayments, setUserPayments] = useState([]); // State to store user payment methods

  const [promoId, setPromoId] = useState(""); // State to store promo ID
  const [discount, setDiscount] = useState(0); // State to store discount amount
  const [updatedTotal, setUpdatedTotal] = useState(total); // State to store updated total


  useEffect(() => {
    console.log("Starting useEffect...");
    console.log("User email received:", userEmail); // Print the user's email received
    // Function to get user ID based on email
    // Function to fetch all users and filter by email

    const fetchAndFilterUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/users/allUsers"
        );
        console.log("All users response:", response.data);

        // Filter users by email
        const filteredUsers = response.data.filter(
          (user) => user.email === userEmail
        );
        console.log("Filtered users:", filteredUsers);

        if (filteredUsers.length > 0) {
          const userId = filteredUsers[0]._id; // Assuming the API returns the first user's ID
          console.log("User ID:", userId);
          getUserPayments(userId); // Call function to get user payments based on ID
        } else {
          console.warn("No user found with email:", userEmail);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error (e.g., display error message to user)
      }
    };

    // Function to get user payments based on ID
    // Inside the useEffect for fetching user payments
    const getUserPayments = async (userId) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/paymentMethods/userPayments/${userId}`
        );

        console.log("User payments response:", response.data);

        if (response.data.length < 1) {
          console.warn('No payment methods found for user ID:', userId);
        }

        setUserPayments(response.data);

      } catch (error) {
        console.error("Error getting user payments:", error);
        // Handle error (e.g., display error message to user)
      }
    };

    if (userEmail) {
      fetchAndFilterUsers(); // Call function to get user ID when userEmail is available
    }
  }, [userEmail]);

  const handlePromoIdChange = (e) => {
    setPromoId(e.target.value);
  };

  const checkPromoValidity = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/promotion/allPromotion`
      );
      const filteredPromos = response.data.filter(
        (promotion) => promotion.promoCode === promoId
      );

      console.log("Filtered Promos:", filteredPromos);

      if (filteredPromos.length > 0) {
        const validPromo = filteredPromos[0]; // Assuming there's only one valid promo with the given code
        const discountPercentage = validPromo.percentage; // Get the discount percentage from the promotion
        const discountAmount = (total * discountPercentage) / 100; // Calculate the discount amount
        setDiscount(discountAmount); // Set the discount amount if promo is valid
        const updatedTotal = total - discountAmount; // Calculate the updated total after applying the discount
        setUpdatedTotal(updatedTotal); // Update the state with the updated total
      } else {
        console.warn("Invalid promo code");
        setDiscount(0); // Reset discount amount if promo is invalid
        setUpdatedTotal(total); // Reset the updated total
      }

    } catch (error) {
      console.error("Error checking promo validity:", error);
      // Handle error (e.g., display error message to user)
    }
  };

  const handlePaymentMethodClick = (paymentMethod) => {
    // Redirect to OrderConfirmation screen with payment method details
    navigate('/order-confirmation', { state: { chosenMovie, showtime, selectedSeats, ticketAges, total: total - discount, userEmail, isLoggedIn: true } });
  };
/*
  if (!location.state) {
    console.log("No order details found.");
    return <div>No order details found. Please start your order again.</div>;
  }
*/
  // Inside the OrderConfirmation component

  if (isLoggedIn) {
    return (
      <div className="container mt-3">
        <h2>Checkout</h2>
        <div className="card">
          <div className="card-body">
            <div className="order">
              <p className="card-text">Here are your order details:</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Movie: {chosenMovie}</li>
              <li className="list-group-item">Showtime: {showtime}</li>
              {Object.entries(ticketAges).map(([seat, age], index) => (
                <li key={index} className="list-group-item">
                  Seat {seat}: {age}
                </li>
              ))}
              <li className="list-group-item">
                Total to Pay: ${updatedTotal.toFixed(2)}
              </li>
            </ul>
            <div className="form-group">
              <label htmlFor="promoId">Enter Promo ID:</label>
              <input
                type="text"
                className="form-control"
                id="promoId"
                value={promoId}
                onChange={handlePromoIdChange}
              />
              <button className="btn btn-primary" onClick={checkPromoValidity}>
                Apply Promo
              </button>
            </div>
            <h5 className="mt-3">Payment Methods:</h5>
            <div className="payment-buttons">
              {userPayments && userPayments.length > 0 ? (
                userPayments.map((paymentMethod, index) => (
                  <div key={index} className="payment-method">
                    <button
                      className="btn btn-primary"
                      onClick={() => handlePaymentMethodClick(paymentMethod)}
                    >
                      {paymentMethod.cardType}Card Ending in{" "}
                      {paymentMethod.last4OfPayment}
                    </button>
                  </div>
                ))
              ) : (
                <p>No payment methods found.</p>
              )}
            </div>
            <Link to="/" className="btn btn-primary mt-3">
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  else {
    navigate('/');
    return null;
  }
};

export default CheckoutForm;
