import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/SelectSeats.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const SelectSeats = () => {
  const location = useLocation();
<<<<<<< HEAD
=======
  const [selectedSeats, setSelectedSeats] = useState([]);
>>>>>>> 57018b83c376cbf381ab8013226a4cd31747df6d
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const chosenMovie = location.state?.movieTitle || 'Unknown Movie';
  const showtime = location.state?.period || 'Unknnown showtime';
  const date = location.state?.date || 'Unknown date';
  const roomID = location.state?.roomID || 'Unknown room ID';
  const movieID = location.state?.movieID || 'Unknown Movie ID';

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const roomResponse = await axios.get(`http://localhost:5000/rooms/${roomID}`);
        console.log("Room response data:", roomResponse.data);  // Debugging the room response
  
        const seatsResponse = await axios.get('http://localhost:5000/seat/allSeats');
        console.log("Seats response data:", seatsResponse.data);  // Debugging the seats response
  
        // Filter seats based on availability and matching roomID and movieID
        const availableRoom = roomResponse.data.filter(room =>
          room._id === roomID);
        const availableSeats = seatsResponse.data.filter(seat => 
          seat.status === 'Available' && 
          seat.show === roomID && 
          seat.movieID === movieID
        );
  
        setSeats(availableSeats);
      } catch (error) {
        console.error('Error fetching seats:', error);
        setSeats([]);
      }
    };
  
    fetchRoomDetails();
  }, [roomID, movieID]);  
  

  const toggleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleConfirmSeats = () => { // Renamed to avoid conflict with prop
    navigate('/select-ticket-age', { state: { chosenMovie, showtime, selectedSeats, isLoggedIn: true } });
  };
  
  if (isLoggedIn) {
    return (
      <div>
          <h2 className='movie-select'>Select seats for {chosenMovie} on {date} at {actTime}</h2>
        <div className="seats-container">
          {seats.length > 0 ? (
          seats.map(seat => (
              <button
                key={seat._id}
                className={`seat ${selectedSeats.includes(seat._id) ? "selected" : ""}`}
                onClick={() => toggleSeatSelection(seat._id)}
              disabled={seat.status !== 'available'}>
                Seat {seat._id}
              </button>
            ))
        ) : (
          <p>No seats available for this showtime.</p>
        )}
      </div>
        <div className='button-container'>
            <button
              disabled={selectedSeats.length === 0}
              className="confirm-button"
              onClick={handleConfirmSeats}>Confirm Seats
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
          </div>
      </div>
    );
    
  }
  else {
    navigate('/');
    return null;
  }
};

export default SelectSeats;
