import React, { useState } from 'react';
import NavMenu from './Navigation/NavMenu';

const ManageMovies = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState('');
  const [producer, setProducer] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [reviews, setReviews] = useState('');
  const [trailerPicture, setTrailerPicture] = useState('');
  const [trailerVideo, setTrailerVideo] = useState('');
  const [rating, setRating] = useState('');
  const [comingSoon, setComingSoon] = useState(false);
  const [showDate, setShowDate] = useState('');
  const [showTime, setShowTime] = useState('');

  const addMovie = () => {
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can implement logic to add the movie with all the form fields
    console.log('Adding movie:', {
      title,
      category,
      cast,
      director,
      producer,
      synopsis,
      reviews,
      trailerPicture,
      trailerVideo,
      rating,
      comingSoon,
      showDate,
      showTime,
    });
    // Reset form state and hide the form after submission
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setCategory('');
    setCast([]);
    setDirector('');
    setProducer('');
    setSynopsis('');
    setReviews('');
    setTrailerPicture('');
    setTrailerVideo('');
    setRating('');
    setComingSoon(false);
    setShowDate('');
    setShowTime('');
    setShowForm(false);
  };

  const handleCastChange = (event) => {
    const castArray = event.target.value.split(',').map((item) => item.trim());
    setCast(castArray);
  };

  return (
    <div>
      <NavMenu loggedIn={true} admin={true}></NavMenu>
      <h2>Manage Movies</h2>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Image:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </label>
          
          <label>
            Trailer Video ID:
            <input
              type="text"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              required
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <button onClick={addMovie}>Add Movie</button>
      )}
    </div>
  );
};

export default ManageMovies;
