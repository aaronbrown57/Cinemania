import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/SelectTicketAge.css'; // Ensure you have the correct path to your CSS file

const SelectTicketAge = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ticketAges, setTicketAges] = useState({});
  const chosenMovie = location.state?.chosenMovie || 'Unknown Movie';
  const { showtime } = location.state || { showtime: 'Unknown Showtime' };
  const selectedSeats = location.state?.selectedSeats;
  
  useEffect(() => {
    if (selectedSeats) {
      setTicketAges(selectedSeats.reduce((acc, seat) => ({ ...acc, [seat]: 'Adult' }), {}));
    } else {
      navigate('/select-seats'); // Navigate back if no seats were selected
    }
  }, [location.state, navigate]);

  // Define ticket prices
  const ticketPrices = {
    Adult: 7,
    Senior: 6,
    Child: 5,
  };

  const handleAgeChange = (seat, age) => {
    setTicketAges(prevAges => ({ ...prevAges, [seat]: age }));
  };

  const handleSubmit = () => {
    navigate('/order-summary', { state: { chosenMovie, showtime, selectedSeats, ticketAges } });
  };

  return (
    <div className="container mt-3">
      <h2>Select Ticket Age</h2>
      {Object.entries(ticketAges).map(([seat, age]) => (
        <div key={seat} className="row mb-3">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="form-label">{seat}</label>
              <select 
                className="form-select"
                value={age} 
                onChange={(e) => handleAgeChange(seat, e.target.value)}>
                {Object.entries(ticketPrices).map(([ageKey, price]) => (
                  <option key={ageKey} value={ageKey}>{ageKey} (${price})</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
      <div className='button-container'>
      <button 
        className="btn btn-primary" 
        onClick={handleSubmit} 
        disabled={Object.keys(ticketAges).length === 0}>
        Confirm Selections
      </button>
      <button className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
      </div>
    </div>
  );
};

export default SelectTicketAge;
