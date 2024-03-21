const express = require('express');
const router = express.Router();

// const jwt = require("jsonwebtoken");
//const auth = require("../middleware/auth");
const bodyParser = require('body-parser')
const cors = require('cors');
const Movie = require('../models/Movie');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.use(cors({ origin: true, credentials: 'http://localhost:3000' }));
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

router.post('/newMovie', async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.json({ msg: 'Movie added successfully', movie: newMovie });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get all movies
router.get('/allMovies', async (req, res) => {
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



module.exports = router;