import 'bootstrap/dist/css/bootstrap.min.css';
import './css/SelectShowtime.css'
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SelectShowtime = () => {
  const { movieId } = useParams(); // To access the movieId passed in the URL
  const navigate = useNavigate(); // Hook to enable programmatic navigation
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    // Fetch showtimes for the selected movie using movieId
    // Replace this with your actual data fetching logic
    const fetchedShowtimes = ["10:00 AM", "1:00 PM", "4:00 PM"]; // Example showtimes
    setShowtimes(fetchedShowtimes);
  }, [movieId]);

  const handleSelectShowtime = (showtime) => {
    // Navigate to the SelectSeats page, passing movieId and the selected showtime
    navigate(`/select-seats/`);
  };
  

  return (
    <div>
      <h2>Select a Showtime</h2>
        <div className="showtime-container">
            {showtimes.map((time, index) => (
                <button key={index} className="showtime-button" onClick={() => handleSelectShowtime(time)}>
                    {time}
                </button>
            ))}
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
    </div>
  );
};

export default SelectShowtime;
