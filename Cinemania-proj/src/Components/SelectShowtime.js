import 'bootstrap/dist/css/bootstrap.min.css';
import './css/SelectShowtime.css';
import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

//I could not figure out how to fix this code so that the title is rendered properly.
const SelectShowtime = (props) => {
  const { movie } = props; // Access movie from props
  const [chosenMovie, setChosenMovie] = useState(props.movie);
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
    <div className="main-container"> {/* Wrapper div for centering content with margin */}
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
