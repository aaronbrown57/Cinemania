import React from 'react';
import './css/CheckoutForm.css'
import {useNavigate, useLocation} from 'react-router-dom'

const CheckoutForm = ({ onSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedSeats, showtime, chosenMovie, ticketAges, total } = location.state || {};

  const handleSubmit = () => {
    navigate('/order-confirmation', { state: { chosenMovie, showtime, selectedSeats, ticketAges, total } });
  };

  return (
    <div className='checkoutForm'>
    <form onSubmit={onSubmit}>
      {/* Form fields for checkout information */}
      <div>
    <label for="card_number">Credit Card Number:</label>
    <input type="text" id="card_number" name="card_number" required></input>
  </div>
  <div>
    <label for="expiry_date">Expiry Date:</label>
    <input type="text" id="expiry_date" name="expiry_date" placeholder="MM/YY" required></input>
  </div>
  <div>
    <label for="cvv">CVV:</label>
    <input type="text" id="cvv" name="cvv" required></input>
  </div>
  <div>
    <label for="zip_code">Zip Code:</label>
    <input type="text" id="zip_code" name="zip_code" required></input>
  </div>
    <div className='button-container'>
      <button className="confirm-button-checkout" onClick={handleSubmit} type="submit">Submit</button>
      <button className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
    </div>
    </form>
    </div>
  );
};

export default CheckoutForm;
