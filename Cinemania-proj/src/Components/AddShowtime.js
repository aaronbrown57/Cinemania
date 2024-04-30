import React, { useState, useEffect } from "react";
import { Form, Button, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/AddShowtime.css"; // Import custom CSS for styling


function AddShowtimeForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    movieName: "",
    roomName: "",
    period: "",
    date: "",
  });

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, date })); // Update date in formData
  };

  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toastMessage, setToastMessage] = useState(""); // State for dynamic toast message

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/movies/allMovies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const moviesData = await response.json();
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:5000/rooms/allRooms", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const roomsData = await response.json();
        setRooms(roomsData);
      } catch (error) {
        console.error("Error fetching rooms:", error.message);
      }
    };

    fetchMovies();
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if the selected date is in the past
    const currentDate = new Date();
    const selectedDate = new Date(formData.date);
    if (selectedDate < currentDate) {
      setToastMessage("Selected date must be in the future.");
      setShowToast(true);
      return;
    }

    if (!formData.date || !formData.roomName || !formData.movieName) {
      console.error("Error: Required fields are missing in form data");
      return;
    }

    try {
      const url = `http://localhost:5000/showtimes/allShowtimes?roomName=${formData.roomName}&date=${formData.date}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch showtimes");
      }

      let existingShowtimes = await response.json();

      console.log("Existing Showtimes:", existingShowtimes);

      // Update existingShowtimes with room names
      existingShowtimes = existingShowtimes.map((showtime) => {
        const roomID = showtime.roomID; // Debug: Log room ID
        console.log("Room ID:", roomID);

        const room = rooms.find((room) => room._id === roomID);
        const roomName = room ? room.Title : "Unknown Room"; // Debug: Log room name
        console.log("Room Name:", roomName);

        return {
          ...showtime,
          roomName: roomName,
        };
      });

      console.log("Existing Showtimes with Room Names:", existingShowtimes);

      // Inside the conflict check block
      console.log("Existing Showtimes with Room Names:", existingShowtimes);

      const conflict = existingShowtimes.some((showtime) => {
        console.log("Showtime:", showtime); // Log the entire showtime object
        console.log("Comparing:", showtime.roomName, formData.roomName);
        console.log("Periods:", showtime.period, formData.period);
        console.log("Dates: ", showtime.date, formData.date);

        /** for debugging
        console.log(
          "conflict gives us:",
          showtimeRoom === formDataRoom &&
          showtime.period.toString() === formData.period.toString() // Convert periods to strings for comparison
        );
        */

        const showtimeRoom = showtime.roomName.trim(); // Convert to string and trim excess spaces
        const formDataRoom = formData.roomName.trim(); // Convert to string and trim excess spaces

        return (
          showtimeRoom === formDataRoom &&
          showtime.period.toString() === formData.period.toString() && // Convert periods to strings for comparison
          showtime.date.toString() === formData.date.toString()
        );
      });

      console.log("Conflict:", conflict);

      if (conflict) {
        setToastMessage(
          "Another movie is already booked for this period, date, and room."
        );
        setShowToast(true);
        return;
      }

      const addResponse = await fetch(
        "http://localhost:5000/showtimes/addShowtime",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            roomName: formData.roomName,
            movieName: formData.movieName,
            date: formData.date,
            period: formData.period,
          }),
        }
      );

      if (!addResponse.ok) {
        throw new Error("Failed to add showtime");
      }

      // Success message
      setToastMessage("Showtime add success!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    } catch (error) {
      console.error("Error adding showtime:", error.message);
    }
  };

  return (
    <div className="add-showtime-form">
      <h2>Add Showtime</h2>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
      >
        <Toast.Body style={{ color: "white" }}>
          {toastMessage} {/* Display the dynamic toast message */}
        </Toast.Body>
      </Toast>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMovie">
          <Form.Label>Select Movie</Form.Label>
          <Form.Control
            as="select"
            value={formData.movieName}
            onChange={(e) =>
              setFormData({ ...formData, movieName: e.target.value })
            }
            required
            style={{ color: "black" }} // Add style to change text color
          >
            <option value="">Select Movie</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.movieTitle}>
                {movie.movieTitle}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formRoom">
          <Form.Label>Select Room</Form.Label>
          <Form.Control
            as="select"
            value={formData.roomName}
            onChange={(e) =>
              setFormData({ ...formData, roomName: e.target.value })
            }
            required
            style={{ color: "black" }} // Add style to change text color
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.Title}>
                {room.Title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formPeriod">
          <Form.Label>Select Time</Form.Label>
          <Form.Control
            as="select"
            value={formData.period}
            onChange={(e) =>
              setFormData({ ...formData, period: e.target.value })
            }
            required
            style={{ color: "black" }} // Add style to change text color
          >
            <option value="">Select Time</option>
            <option value="1">10:00am</option>
            <option value="2">1:00pm</option>
            <option value="3">4:00pm</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formDate">
          <Form.Label>Select Date</Form.Label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            required
            className="date-picker" // Add a custom class name
            calendarClassName="calendar-picker" // Add a custom class name for the calendar
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Showtime
        </Button>
      </Form>
    </div>
  );
}

export default AddShowtimeForm;
