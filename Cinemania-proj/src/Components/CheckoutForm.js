import React from 'react';
import {navigate} from 'react-router-dom'

const handleSubmit = () => {
  // navigate('/order-confirmation', { state: { chosenMovie, showtime, selectedSeats, ticketAges, total } });
};
const CheckoutForm = ({ onSubmit }) => {
  return (
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
      <button onClick={handleSubmit} type="submit">Submit</button>
    </form>
  );
};

export default CheckoutForm;
