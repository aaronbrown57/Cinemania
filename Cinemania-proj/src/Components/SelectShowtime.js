import 'bootstrap/dist/css/bootstrap.min.css';
import './css/SelectShowtime.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const SelectShowtime = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movieTitle = location.state?.movie;  // Access movie title passed from MovieDetail
  const movieID = location.state?.id;
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    const organizeShowtimesByDate = (showtimes) => {
      return showtimes.reduce((acc, showtime) => {
        const date = showtime.date; // Assuming 'date' holds the date
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(showtime);
        return acc;
      }, {});
    };
    
    console.log("Received movie title from MovieDetail:", movieTitle);
    if (movieTitle) {
      const url = `http://localhost:5000/showtimes/allShowtimes`;
      axios.get(url)
        .then(response => {
          const filteredShowtimes = response.data.filter(showtime => showtime.movieID === movieID);
          const groupedShowtimes = organizeShowtimesByDate(filteredShowtimes);
          setShowtimes(groupedShowtimes);
        })
        .catch(error => {
          console.error('Error fetching showtimes:', error);
          setShowtimes({});
        });
    }
  }, [movieTitle, movieID]);
  
  

  const handleSelectShowtime = (showtime) => {
    // Navigate to the select-seats page and pass the necessary showtime details
    navigate('/select-seats', {
      state: {
        movieTitle, // Pass other necessary details as needed
        date: showtime.date,
        period: showtime.period
      }
    });
  };  

  return (
    <div className="main-container">
      <h2>Select a Showtime for {movieTitle}</h2>
      <div className="showtime-container">
        {Object.keys(showtimes).length > 0 ? (
          Object.entries(showtimes).map(([date, times]) => (
            <div key={date}>
              <h3>{date}</h3>
              {times.map((time, index) => (
                <button key={index} className="showtime-button" onClick={() => handleSelectShowtime(time)}>
                  {time.period}
                </button>
              ))}
            </div>
          ))
        ) : (
          <p>No showtimes available.</p>
        )}
      </div>
      <div className="cancel-container">
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  );
  
};

export default SelectShowtime;
