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
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </label>
          <label>
            Cast (Separate by comma):
            <input
              type="text"
              value={cast.join(', ')}
              onChange={handleCastChange}
              required
            />
          </label>
          <label>
            Director:
            <input
              type="text"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              required
            />
          </label>
          <label>
            Producer:
            <input
              type="text"
              value={producer}
              onChange={(e) => setProducer(e.target.value)}
              required
            />
          </label>
          <label>
            Synopsis:
            <input
              type="text"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              required
            />
          </label>
          <label>
            Reviews:
            <input
              type="text"
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
              required
            />
          </label>
          <label>
            Trailer Picture:
            <input
              type="text"
              value={trailerPicture}
              onChange={(e) => setTrailerPicture(e.target.value)}
              required
            />
          </label>
          <label>
            Trailer Video:
            <input
              type="text"
              value={trailerVideo}
              onChange={(e) => setTrailerVideo(e.target.value)}
              required
            />
          </label>
          <label>
            Rating:
            <input
              type="text"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </label>
          <label>
            Coming Soon:
            <input
              type="checkbox"
              checked={comingSoon}
              onChange={(e) => setComingSoon(e.target.checked)}
            />
          </label>
          {!comingSoon && (
            <>
              <label>
                Show Date:
                <input
                  type="text"
                  value={showDate}
                  onChange={(e) => setShowDate(e.target.value)}
                  required={!comingSoon}
                />
              </label>
              <label>
                Show Time:
                <input
                  type="text"
                  value={showTime}
                  onChange={(e) => setShowTime(e.target.value)}
                  required={!comingSoon}
                />
              </label>
            </>
          )}

          <button type="submit">Submit</button>
        </form>
      ) : (
        <button onClick={addMovie}>Add Movie</button>
      )}
    </div>
  );
};

export default ManageMovies;
