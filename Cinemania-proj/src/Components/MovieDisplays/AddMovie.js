import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import './Movie.css';

const AddMovie = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [trailer, setTrailer] = useState('');

  const navigate = useNavigate();

  const submitHandler = () => {
    if (title && img && trailer) {
      // Pass the details of the Bee Movie when the submit button is clicked
      addMovie({ 
        title: "Bee Movie",
        img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTxDF9D2njpnpIrsGC9BaRA06W-HLRZrypy8opr7EQ3r_Pt8iSi",
        trailer: "https://www.youtube.com/watch?v=VONRQMx78YI" // Example trailer ID
      });
      setTitle('');
      setImg('');
      setTrailer('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />
      <input
        type="text"
        placeholder="Trailer Video ID"
        value={trailer}
        onChange={(e) => setTrailer(e.target.value)}
      />
      <button  onClick={submitHandler} style={{ margin: "0 auto", display: "block" }}>Add Movie</button>
    </div>
  );
};

export default AddMovie;
