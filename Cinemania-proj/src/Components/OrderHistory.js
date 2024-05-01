import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
    const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const { selectedSeats, showtime, chosenMovie, ticketAges, total, userEmail } =
  location.state || {};

  const navigate = useNavigate();
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
  const fetchBookings = async (userId) => {
    try {
      // Make a GET request to the backend endpoint to fetch bookings
      const response = await axios.get(`http://localhost:5000/bookings/${userId}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div>
      <h2>Order History</h2>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            <p>Booking ID: {booking._id}</p>
            <p>Movie: {booking.movie}</p>
            <p>Showtime: {booking.showtime}</p>
            {/* Add more booking details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
