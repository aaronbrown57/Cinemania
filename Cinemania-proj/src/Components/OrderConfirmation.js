import React, { useEffect, useState } from "react";
import "./css/OrderConfirmation.css";
import { useLocation, Link } from "react-router-dom";
import axios from "axios"; // Import Axios for HTTP requests
import { useNavigate } from 'react-router-dom';

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId from mongoose


const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showtime, chosenMovie, ticketAges, total } = location.state || {};
  const isLoggedIn = location.state && location.state.isLoggedIn;
  const [emailSent, setEmailSent] = useState(false); // State to track if email is already sent
  const userEmail = location.state?.userEmail; // Set userEmail to dummy email if not provided

  useEffect(() => {
    console.log("User email:", userEmail);
    if (userEmail && !emailSent) {
      sendConfirmationEmail(userEmail);
      setEmailSent(true); // Mark email as sent
    }
  }, [userEmail, emailSent]);

  const fetchAndFilterUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/allUsers");
      console.log("All users response:", response.data);

      // Filter users by email
      const filteredUsers = response.data.filter(
        (user) => user.email === userEmail
      );
      console.log("Filtered users:", filteredUsers);

      if (filteredUsers.length > 0) {
        const userId = filteredUsers[0]._id; // Assuming the API returns the first user's ID
        console.log("User ID:", userId);
        return userId; // Return the userId value
      } else {
        console.warn("No user found with email:", userEmail);
        return null; // Return null if no user is found
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle error (e.g., display error message to user)
      return null; // Return null in case of an error
    }
  };

  const sendConfirmationEmail = async (email) => {
    console.log("Sending confirmation email to:", email);
    try {
      await axios.put(
        "http://localhost:5000/bookings/sendBookingConfirmation",
        {
          email,
          movie: chosenMovie,
          showtime,
          seat: Object.keys(ticketAges).join(", "), // Combine all selected seats
          ticketType: Object.values(ticketAges).join(", "), // Combine all ticket types
          totalPaid: total.toFixed(2),
        }
      );
      console.log("Confirmation email sent successfully to:", email);
    } catch (error) {
      console.error("Error sending booking confirmation email:", error);
      // Handle error (e.g., display error message to user)
    }

    const bookingNumber = 1234;

    try {
      // Fetch and filter users to get customer ID
      const customerID = await fetchAndFilterUsers(email);
      console.log("Customer ID:", customerID);

      // Make the POST request with the correct customerID as a string
      const response = await axios.post(
        `http://localhost:5000/bookings/addBooking/${customerID}`,
        {
          bookingNumber,
          customerID, // Use customerID as a string
          seat: Object.keys(ticketAges).join(", "), // Combine all selected seats
          totalPaid: total.toFixed(2),
        }
      );
      console.log(response.bookingNumber)
      console.log("Confirmation email sent successfully to:", email);
      bookingNumber++;
    } catch (error) {
      console.error("Error sending booking confirmation email:", error);
      // Handle error (e.g., display error message to user)
    }
  };
/*
  if (!location.state) {
    console.log("No order details found.");
    return <div>No order details found. Please start your order again.</div>;
  }
  */
 
  if(isLoggedIn) {
  return (
    <div className="container mt-3">
      <h2>Order Confirmation</h2>
      <div className="card">
        <div className="card-body">
          <div className="order">
            <h5 className="card-title">Thank you for your purchase!</h5>
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
            <li className="list-group-item">Total Paid: ${total.toFixed(2)}</li>
          </ul>
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

export default OrderConfirmation;
