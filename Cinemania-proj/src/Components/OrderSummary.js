import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticketAges } = location.state || {};

  // Ticket prices
  const ticketPrices = {
    Adult: 7,
    Senior: 6,
    Child: 5,
  };

  // Calculate subtotal
  const subtotal = Object.values(ticketAges).reduce((total, age) => total + ticketPrices[age], 0);

  // Sales tax rate
  const salesTaxRate = 0.07;

  // Calculate total with tax
  const total = subtotal + (subtotal * salesTaxRate);

  const handleSubmit = () => {
    navigate('/confirmation'); // Navigate to confirmation or payment page
  };

  if (!ticketAges) {
    return <div>No ticket information found.</div>;
  }

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
      <p className="mt-3">Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Sales Tax (7%): ${(subtotal * salesTaxRate).toFixed(2)}</p>
      <h5>Total: ${total.toFixed(2)}</h5>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={handleSubmit}>Confirm Order</button>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>

      </div>
    </div>
  );
};

export default OrderSummary;
