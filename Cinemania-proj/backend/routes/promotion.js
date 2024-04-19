const express = require('express');
const router = express.Router();
const Room = require('../models/Promotion');
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

router.put('/sendPromo/:promotionId', async (req, res) => {
    const { promotionId } = req.params;
    const { email } = req.body;

    console.log('Received request to send promo:', promotionId, email); // Debugging statement
  
    try {
      // Send the promo email
      const mailOptions = {
        from: 'cinemaniateam@gmail.com',
        to: email,
        subject: 'New Promotion Available!',
        text: `Thank you for signing up for email promotions. A new promotion code is available to you! ${promotionId}`,
      };

      console.log('Sending promo email to:', email); // Debugging statement
      await transporter.sendMail(mailOptions);

      console.log('Promo email sent successfully to:', email); // Debugging statement
  
      // Update sentToUsers status
      // Assuming you have a MongoDB or similar database
      const updatedPromotion = await Promotion.findOneAndUpdate(
        { _id: promotionId },
        { sentToUsers: true },
        { new: true }
      );

      if (!updatedPromotion) {
        console.error('Promotion not found:', promotionId); // Debugging statement
        return res.status(404).json({ error: 'Promotion not found.' });
      }

      console.log('Promotion sent to users successfully:', updatedPromotion); // Debugging statement

      res.status(200).json({ message: 'Promotion sent to users successfully.', updatedPromotion });
    } catch (error) {
      console.error('Error sending promotion to users:', error.message); // Debugging statement
      res.status(500).json({ error: 'Failed to send promotion to users.' });
    }
  });



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

router.put('/updatePromotion/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const updatedPromotion = await Promotion.findByIdAndUpdate(movieId, req.body, { new: true });
        if (!updatedPromotion) {
            return res.status(404).json({ error: 'Promotion not found' });
        }
        res.json({ msg: 'Promotion updated successfully', updatedPromotion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
