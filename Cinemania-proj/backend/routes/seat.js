const express = require('express');
const router = express.Router();
const Seat = require('../models/Seat');

// Route to add a new seat
router.post('/addSeat', async (req, res) => {
    try {
        const newSeat = await Seat.create(req.body);
        res.json({ msg: 'Seat added successfully', seat: newSeat });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to update seat to reserved
router.put('/updateSeat/:id', async (req, res) => {
    try {
        const seatId = req.params.id;
        const updatedSeat = await Seat.findByIdAndUpdate(
            seatId,
            { status: 'reserved' }, // Update the status to 'reserved'
            { new: true } // Return the updated document
        );
        if (!updatedSeat) {
            return res.status(404).json({ msg: 'Seat not found' });
        }
        res.json({ msg: 'Seat updated successfully', seat: updatedSeat });
    } catch (error) {
        console.error('Error updating seat:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Route to get all seats
router.get('/allSeats', async (req, res) => {
    try {
        console.log('Received GET request to fetch all seats');
        const seats = await Seat.find();
        console.log('Retrieved seats:', seats);
        res.json(seats);
    } catch (error) {
        console.error('Error fetching seats:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
