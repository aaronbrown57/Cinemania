const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ShowTimes = require('../models/ShowTimes');
const Seat = require('../models/Seat');
const Room = require('../models/Room');
const mongoose = require('mongoose');
const fetch = require('node-fetch'); // Import node-fetch for making HTTP requests



router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/addShowtime', async (req, res) => {
    try {
        console.log('Received POST request to add a showtime');
        console.log('Request Body:', req.body); // Log the entire request body
        // Get the room name and movie name from the request body
        const { roomName, movieName, date, period } = req.body; // Remove numberOfSeats

        // Find the room by name
        const room = await Room.findOne({ Title: roomName });
        console.log('Found Room:', room);
        if (!room) {
            throw new Error('Room not found');
        }

        // Find the movie by name
        const movie = await Movie.findOne({ movieTitle: movieName });
        console.log('Found Movie:', movie);
        if (!movie) {
            throw new Error('Movie not found');
        }

        // Use the number of seats from the room object
        const numberOfSeats = room.numberOfSeats;

        const newShowtime = await ShowTimes.create({
            roomID: room._id,
            movieID: movie._id,
            date,
            period,
            numberOfSeats,
        });

        console.log('Showtime added successfully!'); // Log success message

        // Add seats to the room based on the preset number of seats
        for (let i = 0; i < numberOfSeats; i++) {
            await Seat.create({ roomId: room._id, show: newShowtime._id });
        }

        res.json({ msg: 'Showtime added successfully', showtime: newShowtime });
    } catch (error) {
        console.error('Error adding showtime:', error.message);
        // Send error response
        res.status(400).json({ error: error.message });
    }
});








// Route to get all showtimes
router.get('/allShowtimes', async (req, res) => {
    try {
        console.log('Received GET request to fetch all showtimes');
        const showtimesQuery = ShowTimes.find(); // Capture the query without executing it
        console.log('Showtimes query:', showtimesQuery.getQuery());
        const showtimes = await showtimesQuery.exec(); // Execute the query
        console.log('Retrieved showtimes:', showtimes);
        res.json(showtimes);
    } catch (error) {
        console.error('Error fetching showtimes:', error.message);
        res.status(500).json({ error: error.message });
    }
});


// Route to delete a showtime by ID
router.delete('/deleteShowtime/:id', async (req, res) => {
    try {
        console.log('Received DELETE request to delete a showtime');
        const showtimeId = req.params.id;
        const deletedShowtime = await ShowTimes.findByIdAndDelete(showtimeId);
        if (!deletedShowtime) {
            return res.status(404).json({ error: 'Showtime not found' });
        }
        res.json({ msg: 'Showtime deleted successfully', deletedShowtime });
    } catch (error) {
        console.error('Error deleting showtime:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Route to update a showtime by ID
router.put('/updateShowtime/:id', async (req, res) => {
    try {
        console.log('Received PUT request to update a showtime');
        const showtimeId = req.params.id;
        const updatedShowtime = await ShowTimes.findByIdAndUpdate(showtimeId, req.body, { new: true });
        if (!updatedShowtime) {
            return res.status(404).json({ error: 'Showtime not found' });
        }
        res.json({ msg: 'Showtime updated successfully', updatedShowtime });
    } catch (error) {
        console.error('Error updating showtime:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
