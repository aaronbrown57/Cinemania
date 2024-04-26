import React from 'react';
import './css/CheckoutForm.css';
import { useNavigate, useLocation } from 'react-router-dom';

const CheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedSeats, showtime, chosenMovie, ticketAges, total } = location.state || {};

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    navigate('/order-confirmation', { state: { chosenMovie, showtime, selectedSeats, ticketAges, total } });
  };

  return (
    <div className='checkoutForm'>
      <form onSubmit={handleSubmit}>
        {/* Form fields for checkout information */}
        <div>
          <label htmlFor="card_number">Credit Card Number:</label>
          <input type="text" id="card_number" name="card_number" required />
        </div>
        <div>
          <label htmlFor="expiry_date">Expiry Date:</label>
          <input type="text" id="expiry_date" name="expiry_date" placeholder="MM/YY" required />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" required />
        </div>
        <div>
          <label htmlFor="zip_code">Zip Code:</label>
          <input type="text" id="zip_code" name="zip_code" required />
        </div>
        <div className='button-container'>
          <button className="confirm-button-checkout" type="submit">Submit</button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
