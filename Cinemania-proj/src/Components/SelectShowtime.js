import 'bootstrap/dist/css/bootstrap.min.css';
import './css/SelectShowtime.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SelectShowtime = () => {
  const location = useLocation();
  // Safely access `chosenMovie` from `location.state` or set a fallback value
  const chosenMovie = location.state?.chosenMovie || 'Unknown Movie';
  const navigate = useNavigate();
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    // Simulate fetching showtimes based on the chosenMovie
    const fetchedShowtimes = ["10:00 AM", "1:00 PM", "4:00 PM"];
    setShowtimes(fetchedShowtimes);
  }, [chosenMovie]);

  const handleSelectShowtime = (showtime) => {
    // Example navigation, adjust according to your app's routes and required state
    navigate(`/select-seats`, { state: { chosenMovie, showtime } });
  };

  return (
    <div>
      <h2>Select a Showtime for {chosenMovie}</h2>
      <div className="showtime-container">
        {showtimes.map((time, index) => (
          <button key={index} className="showtime-button" onClick={() => handleSelectShowtime(time)}>
            {time}
          </button>
        ))}
      </div>
      <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>Cancel</button>
    </div>
  );
};

export default SelectShowtime;
