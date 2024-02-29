import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { selectedSeats, movieTime, chosenMovie, ticketAges, total } = location.state || {};

  if (!location.state) {
    return <div>No order details found. Please start your order again.</div>;
  }

  return (
    <div className="container mt-3">
      <h2>Order Confirmation</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Thank you for your purchase!</h5>
          <p className="card-text">Here are your order details:</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Movie: {chosenMovie}</li>
            <li className="list-group-item">Showtime: {movieTime}</li>
            {Object.entries(selectedSeats).map(([seat, age], index) => (
              <li key={index} className="list-group-item">Seat {seat}: {age}</li>
            ))}
            <li className="list-group-item">Total Paid: ${total.toFixed(2)}</li>
          </ul>
          <Link to="/" className="btn btn-primary mt-3">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
