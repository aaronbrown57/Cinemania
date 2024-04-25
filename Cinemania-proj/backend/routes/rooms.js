const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Route to get all rooms
router.get('/allRooms', async (req, res) => {
    try {
        console.log('Received GET request to fetch all rooms');
        const roomsQuery = Room.find(); // Capture the query without executing it
        console.log('Rooms query:', roomsQuery.getQuery());
        const rooms = await roomsQuery.exec(); // Execute the query
        console.log('Retrieved rooms:', rooms);
        res.json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
