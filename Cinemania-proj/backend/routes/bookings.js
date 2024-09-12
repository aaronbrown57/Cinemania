const express = require('express');
const router = express.Router();
const Bookings = require('../models/Bookings'); // Import the Bookings model
const Room = require('../models/Room'); // Import the Room model

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    secureConnection:false,
    debug:true,
    logger:true,
        auth: {
            user: 'cinemaniateam@gmail.com',
            pass: 'balx bias kmmh btku'
        },
    tls:{
        rejectUnauthorized:true
    }
});

router.post('/addBooking/:customerId', async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const newBooking = await Booking.create({ ...req.body, customerID: customerId });
        res.json({ msg: 'Booking added successfully', booking: newBooking });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(400).json({ error: 'Failed to add booking' });
    }
});



// Route to get all seat
router.get('/allBookings', async (req, res) => {
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


// GET Route to Fetch Bookings by Customer ID
router.get('/allBookings/:customerId', async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const bookings = await Booking.find({ customerID: customerId }).lean();
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});




router.put('/sendBookingConfirmation', async (req, res) => {
    const { email, movie, showtime, seat, ticketType, totalPaid } = req.body;

    console.log('Received request to send booking confirmation to:', email); // Debugging statement
  
    try {
      // Send the booking confirmation email
      const mailOptions = {
        from: 'cinemaniateam@gmail.com',
        to: email,
        subject: 'Booking Confirmation',
        text: `Here are your order details:\n\nMovie: ${movie}\nShowtime: ${showtime}\nSeat: ${seat} (${ticketType})\nTotal Paid: $${totalPaid}`,
      };

      console.log('Sending booking confirmation email to:', email); // Debugging statement
      await transporter.sendMail(mailOptions);

      console.log('Booking confirmation email sent successfully to:', email); // Debugging statement
  
      res.status(200).json({ message: 'Booking confirmation email sent successfully.' });
    } catch (error) {
      console.error('Error sending booking confirmation email:', error.message); // Debugging statement
      res.status(500).json({ error: 'Failed to send booking confirmation email.' });
    }
  });

  // Endpoint to fetch bookings for a specific user
router.get('/bookings/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const bookings = await Booking.find({ userId }); // Query the database to find bookings associated with the provided user ID
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
