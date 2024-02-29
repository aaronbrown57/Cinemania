import 'bootstrap/dist/css/bootstrap.min.css';
import './css/SelectSeats.css';
import React, { useState } from 'react';
// import SelectShowtime from './SelectShowtime'; // Remove if not used in this component
import { useNavigate, useLocation } from 'react-router-dom'; // Make sure to import useNavigate

const SelectSeats = () => {
  const location = useLocation(); 
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const chosenMovie = location.state?.chosenMovie || 'Unknown Movie';
  const { showtime } = location.state || { showtime: 'Unknown Showtime' };

  const toggleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleConfirmSeats = () => { // Renamed to avoid conflict with prop
    navigate('/select-ticket-age', { state: { chosenMovie, showtime, selectedSeats } });
  };

  // Placeholder for seat selection logic
  const seats = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", "D1", "D2", "D3", "D4"];

  return (
    <div>
    <h2>Select seats for {chosenMovie} at {showtime}</h2>
      <div className="seats-container">
        {seats.map((seat, index) => (
          <button
            key={index}
            className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
            onClick={() => toggleSeatSelection(seat)}>
            {seat}
          </button>
        ))}
        <button 
          disabled={selectedSeats.length === 0} // Ensures button is only clickable when at least one seat is selected
          className="confirm-button" 
          onClick={handleConfirmSeats}>Confirm Seats
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
      </div>
    </div>
  );
};

export default SelectSeats;
