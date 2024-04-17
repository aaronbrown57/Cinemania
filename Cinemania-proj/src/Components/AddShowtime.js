import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'; // Import Form and Button components from react-bootstrap

function AddShowtimeForm() {
  const [formData, setFormData] = useState({
    movieName: "", // State for selected movie name
    roomName: "", // State for selected room name
    period: "", // State for selected period
    date: "", // State for selected date
  });

  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch movies data
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

    // Fetch rooms data
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
    console.log("Form Data before submission:", formData); // Log form data

    // Check if required fields are populated
    if (!formData.date || !formData.roomName || !formData.movieName) {
      console.error("Error: Required fields are missing in form data");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/showtimes/addShowtime", {
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
      });
      if (!response.ok) {
        throw new Error("Failed to add showtime");
      }
      console.log("Showtime added successfully!");
      // Optionally, you can redirect the user or perform any other action upon successful addition of showtime
    } catch (error) {
      console.error("Error adding showtime:", error.message);
    }
  };

  return (
    <div className="add-showtime-form">
      <h2>Add Showtime</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMovie">
          <Form.Label>Select Movie</Form.Label>
          <Form.Control
            as="select"
            value={formData.movieName}
            onChange={(e) => setFormData({ ...formData, movieName: e.target.value })}
            required
            style={{ color: 'black' }} // Add style to change text color
          >
            <option value="">Select Movie</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.movieTitle}>{movie.movieTitle}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formRoom">
          <Form.Label>Select Room</Form.Label>
          <Form.Control
            as="select"
            value={formData.roomName}
            onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
            required
            style={{ color: 'black' }} // Add style to change text color
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.Title}>{room.Title}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formPeriod">
          <Form.Label>Select Period</Form.Label>
          <Form.Control
            as="select"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            required
            style={{ color: 'black' }} // Add style to change text color
          >
            <option value="">Select Period</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formDate">
          <Form.Label>Select Date</Form.Label>
          <Form.Control
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
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
