const express = require('express');
const router = express.Router();
const Room = require('../models/Seat');

// Route to get all seat
router.get('/allSeats', async (req, res) => {
    try {
        console.log('Received GET request to fetch all seat');
        const seatQuery = Room.find(); // Capture the query without executing it
        console.log('Rooms query:', seatQuery.getQuery());
        const seat = await seatQuery.exec(); // Execute the query
        console.log('Retrieved seat:', seat);
        res.json(seat);
    } catch (error) {
        console.error('Error fetching seat:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
