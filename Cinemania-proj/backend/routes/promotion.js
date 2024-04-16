const express = require('express');
const router = express.Router();
const Room = require('../models/Promotion');


router.post('/addPromotion', async (req, res) => {
    try {
        const newPromotion = await Promotion.create(req.body);
        res.json({ msg: 'Promotion added successfully', movie: newPromotion });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get all promotion
router.get('/allPromotion', async (req, res) => {
    try {
        console.log('Received GET request to fetch all promotion');
        const promotionQuery = Room.find(); // Capture the query without executing it
        console.log('Rooms query:', promotionQuery.getQuery());
        const promotion = await promotionQuery.exec(); // Execute the query
        console.log('Retrieved promotion:', promotion);
        res.json(promotion);
    } catch (error) {
        console.error('Error fetching promotion:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
