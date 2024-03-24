const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show', // Assuming there is a Show model
        required: true,
    },
    status: {
        type: String,
        enum: ['Available', 'Reserved', 'Booked'], // Assuming these are the possible statuses
        default: 'Available',
    },
    title: {
        type: String,
        default: 'Seat', // Default title if not provided
    },
});

module.exports = Seat = mongoose.model('Seat', SeatSchema);
