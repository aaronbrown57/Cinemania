const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ShowTimes = require('../models/ShowTimes');
const Seat = require('../models/Seat');
const Room = require('../models/Room'); 

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Route to add a showtime
// Route to add a showtime
router.post('/addShowtime', async (req, res) => {
    try {
        console.log('Received POST request to add a showtime');
        const newShowtime = await ShowTimes.create(req.body);
        
        // Update the number of seats for the room
        const roomId = req.body.roomId;
        const room = await Room.findById(roomId);
        if (!room) {
            throw new Error('Room not found');
        }
        
        // Add seats to the room
        const numberOfSeatsToAdd = req.body.numberOfSeats;
        for (let i = 0; i < numberOfSeatsToAdd; i++) {
            await Seat.create({ roomId: roomId }); // Create a seat and associate it with the room
        }
        
        room.numberOfSeats += numberOfSeatsToAdd;
        await room.save();
        
        res.json({ msg: 'Showtime added successfully', showtime: newShowtime });
    } catch (error) {
        console.error('Error adding showtime:', error.message);
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
