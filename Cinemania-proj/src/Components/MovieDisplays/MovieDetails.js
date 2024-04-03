import React from 'react';
const MovieDetails = ({ isOpen, onClose, title, category, cast, director, producer, reviews, synopsis, rating }) => {
    return (
      isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>{title}</h2>
            <p>
              <strong>Category:</strong> {category}<br />
              <strong>Cast:</strong> {cast}<br />
              <strong>Director:</strong> {director}<br />
              <strong>Producer:</strong> {producer}<br />
              <strong>Reviews:</strong> {reviews}<br />
              <strong>Synopsis:</strong> {synopsis}<br />
              <strong>Rating:</strong> {rating}
            </p>
          </div>
        </div>
      )
    );
  };
  
  export default MovieDetails;
  