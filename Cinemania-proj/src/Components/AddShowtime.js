import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // Import Form and Button components from react-bootstrap

function AddShowtimeForm() {
  const [formData, setFormData] = useState({
    movie: "", // State for selected movie
    room: "", // State for selected room
    period: "", // State for selected period
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to backend for adding showtime to the database
    console.log("Form Data:", formData);
    // You can use axios or fetch to send the formData to your backend API
  };

  return (
    <div className="add-showtime-form">
      <h2>Add Showtime</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMovie">
          <Form.Label>Select Movie</Form.Label>
          <Form.Control
            as="select"
            value={formData.movie}
            onChange={(e) => setFormData({ ...formData, movie: e.target.value })}
            required
          >
            <option value="">Select Movie</option>
            {/* Map over movie options from backend and render them as <option> elements */}
            {/* Example option: <option value="movieId">Movie Title</option> */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formRoom">
          <Form.Label>Select Room</Form.Label>
          <Form.Control
            as="select"
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            required
          >
            <option value="">Select Room</option>
            {/* Map over room options from backend and render them as <option> elements */}
            {/* Example option: <option value="roomId">Room Title</option> */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formPeriod">
          <Form.Label>Select Period</Form.Label>
          <Form.Control
            as="select"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            required
          >
            <option value="">Select Period</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Showtime
        </Button>
      </Form>
    </div>
  );
}

export default AddShowtimeForm;
