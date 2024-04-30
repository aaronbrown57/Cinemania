import 'bootstrap/dist/css/bootstrap.min.css';
import './css/SelectShowtime.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SelectShowtime = () => {
  const location = useLocation(); // Use useLocation to access the location object
  const navigate = useNavigate();
  const [chosenMovie, setChosenMovie] = useState(location.state?.movie); // Access movie from location state
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    // Simulate fetching showtimes based on the chosenMovie
    const fetchedShowtimes = ["10:00 AM", "1:00 PM", "4:00 PM"];
    setShowtimes(fetchedShowtimes);
  }, [chosenMovie]);

  const handleSelectShowtime = (showtime) => {
    navigate(`/select-seats`, { state: { chosenMovie, showtime } });
  };

  return (
    <div className="main-container">
      <h2>Select a Showtime for {chosenMovie}</h2>
      <div className="showtime-container">
        {showtimes.map((time, index) => (
          <button key={index} className="showtime-button" onClick={() => handleSelectShowtime(time)}>
            {time}
          </button>
        ))}
      </div>
      <div className="cancel-container">
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>Cancel</button>
      </div>
    </div>
  );
};

export default SelectShowtime;
