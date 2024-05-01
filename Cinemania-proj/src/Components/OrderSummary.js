import React, { useState } from 'react';
import './css/OrderSummary.css'
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticketAges } = location.state || {};
  const chosenMovie = location.state?.chosenMovie || 'Unknown Movie';
  const { showtime } = location.state || { showtime: 'Unknown Showtime' };
  const isLoggedIn = location.state && location.state.isLoggedIn;
  const selectedSeats = location.state?.selectedSeats;

  const [email, setEmail] = useState('');
  const [promoId, setPromoId] = useState(""); // State to store promo ID


  // Ticket prices
  const ticketPrices = {
    Adult: 7,
    Senior: 6,
    Child: 5,
  };

  // Function to handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Calculate subtotal
  const subtotal = Object.values(ticketAges).reduce((total, age) => total + ticketPrices[age], 0);

  // Sales tax rate
  const salesTaxRate = 0.07;

  // Calculate total with tax
  const total = subtotal + (subtotal * salesTaxRate);

  const handleSubmit = () => {
    navigate('/checkout', { state: { chosenMovie, showtime, selectedSeats, ticketAges, total, userEmail: email, promoId, isLoggedIn: true } });
  };

  // Handler function to update promo ID state
  const handlePromoIdChange = (e) => {
    setPromoId(e.target.value);
  };
/*
  if (!ticketAges) {
    return <div>No ticket information found.</div>;
  }
*/
  if (isLoggedIn) {
    return (
      <div className="container mt-3">
        <h2>Order Summary</h2>
        <ul className="list-group">
          {Object.entries(ticketAges).map(([seat, age]) => (
            <li key={seat} className="list-group-item">
              Seat {seat}: {age} ticket (${ticketPrices[age]})
            </li>
          ))}
        </ul>
        <div className="form-group mt-3">
          <label htmlFor="emailInput">Confirm Email:</label>
          <input
            type="email"
            id="emailInput"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="promoId">Enter Promo ID:</label>
          <input
            type="text"
            className="form-control"
            id="promoId"
            value={promoId}
            onChange={handlePromoIdChange}
          />
        </div>
        <div className='order'>
          <p className="mt-3">Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Sales Tax (7%): ${(subtotal * salesTaxRate).toFixed(2)}</p>
          <h5>Total: ${total.toFixed(2)}</h5>
        </div>
        <div className="mt-3">
          <div className='button-container'>
            <button className="btn btn-primary" onClick={handleSubmit}>Confirm Order</button>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
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

export default OrderSummary;
