const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    bookingNumber: {
        type: String,
        required: true,
    },
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', 
        required: true,
    },
    showID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show', 
        required: true,
    },
    promoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promo', 
    },
    totalAfterTax: {
        type: Number,
        required: true,
    },
    cardID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentCard',
        required: true,
    }
}, { collection: 'booking' });

module.exports = Booking = mongoose.model('Booking', BookingSchema);
