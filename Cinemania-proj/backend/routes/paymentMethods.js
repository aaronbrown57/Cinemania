const express = require('express');
const router = express.Router();
const PaymentCard = require('../models/PaymentCard');

// Create a payment card
router.post('/addCard', async (req, res) => {
  try {
    const { userID, cardNo, expirationDate } = req.body;
    const paymentCard = new PaymentCard({ userID, cardNo, nameOnCard, expirationDate });
    await paymentCard.save();
    res.status(201).json(paymentCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all payment cards
router.get('/', async (req, res) => {
  try {
    const paymentCards = await PaymentCard.find();
    res.json(paymentCards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a payment card by ID
router.get('/:id', async (req, res) => {
  try {
    const paymentCard = await PaymentCard.findById(req.params.id);
    if (!paymentCard) {
      return res.status(404).json({ message: 'Payment card not found' });
    }
    res.json(paymentCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a payment card
router.put('/:id', async (req, res) => {
  try {
    const { userID, cardNo, nameOnCard, expirationDate } = req.body;
    const paymentCard = await PaymentCard.findByIdAndUpdate(
      req.params.id,
      { userID, cardNo, nameOnCard, expirationDate },
      { new: true }
    );
    if (!paymentCard) {
      return res.status(404).json({ message: 'Payment card not found' });
    }
    res.json(paymentCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a payment card
router.delete('/:id', async (req, res) => {
  try {
    const paymentCard = await PaymentCard.findByIdAndDelete(req.params.id);
    if (!paymentCard) {
      return res.status(404).json({ message: 'Payment card not found' });
    }
    res.json({ message: 'Payment card deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
