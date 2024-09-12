const express = require("express");
const router = express.Router();
const PaymentCard = require("../models/PaymentCard");
const bcryptjs = require("bcryptjs");

// Create a payment card
router.post("/addCard", async (req, res) => {
  try {
    const { userID, cardNo, expirationDate } = req.body;

    if (!cardNo) {
      return res.status(400).json({ error: "Card number is required" });
    }

    console.log("Card Number:", cardNo); // Log the card number
    const trimmedCardNo = cardNo.trim(); // Trim leading and trailing whitespace
    const last4OfPayment = cardNo.length >= 4 ? cardNo.slice(-4) : cardNo;
    console.log("Last 4 Digits:", last4OfPayment); // Log the extracted last 4 digits

    // Create a new PaymentCard instance with hashed card number and last 4 digits
    const paymentCard = new PaymentCard({
      userID,
      cardNo,
      expirationDate,
      last4OfPayment,
    });

    const hashedCardNo = await bcryptjs.hash(cardNo, 8);
    console.log("Hashed Card Number:", hashedCardNo); // Log the hashed card number

    paymentCard.cardNo = hashedCardNo;

    await paymentCard.save();

    res.status(201).json(paymentCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all payment cards
router.get("/allPayments", async (req, res) => {
  try {
    const paymentCards = await PaymentCard.find();
    res.json(paymentCards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read the users payment cards
router.get("/userPayments/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters
    const paymentCards = await PaymentCard.find({ userID: userId }); // Use the user ID in the filter object
    res.json(paymentCards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Delete a payment card
router.delete("/deletePayment/:id", async (req, res) => {
  try {
    console.log("Request received to delete payment card"); // Log when the request is received
    const paymentCardId = req.params.id; // Get the ID of the payment card to delete
    console.log("Payment Card ID to delete:", paymentCardId); // Log the ID of the payment card
    
    const paymentCard = await PaymentCard.findByIdAndDelete(paymentCardId); // Find and delete the payment card
    if (!paymentCard) {
      console.log("Payment card not found"); // Log if the payment card is not found
      return res.status(404).json({ message: "Payment card not found" });
    }

    console.log("Payment card deleted successfully"); // Log if the payment card is deleted successfully
    res.json({ message: "Payment card deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment card:", error); // Log any errors that occur during deletion
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
