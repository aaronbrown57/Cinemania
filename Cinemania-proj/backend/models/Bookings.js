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
        type: String,
        ref: 'Show', 
        required: false,
    },
    promoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promo', 
        required: false,
    },
    seat: {
        type: String,
        required: true,
    },
    totalPaid: {
        type: Number,
        required: true,
    },
    cardID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentCard',
        required: false,
    }
}, { collection: 'booking' });

module.exports = Booking = mongoose.model('Booking', BookingSchema);
