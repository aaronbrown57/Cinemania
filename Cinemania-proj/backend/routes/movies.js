const express = require('express');
const router = express.Router();

// const jwt = require("jsonwebtoken");
//const auth = require("../middleware/auth");
const bodyParser = require('body-parser')
const Movie = require('../models/Movie');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/addMovie', async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.json({ msg: 'Movie added successfully', movie: newMovie });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Route to get all movies
router.get('/AllMovies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/deleteMovie/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        if (!deletedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ msg: 'Movie deleted successfully', deletedMovie });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/updateMovie/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ msg: 'Movie updated successfully', updatedMovie });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:title', async (req, res) => {
    const title = req.params.title;
  
    try {
      // Search for the movie in the database based on the provided title
      const movie = await Movie.findOne({ movieTitle: title });
  
      if (!movie) {
        // If movie with the provided title is not found, return a 404 status code
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      // If movie is found, return it as a response
      res.json(movie);
    } catch (error) {
      // If an error occurs during database query, return a 500 status code
      console.error('Error finding movie:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    // Perform search based on the query
    const results = await performSearch(query);
    res.json(results);
  });
  


module.exports = router;