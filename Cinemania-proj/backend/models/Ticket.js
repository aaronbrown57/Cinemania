const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    bookingID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking', // Assuming there is a Booking model
        required: true,
    },
    seatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat', // Assuming there is a Seat model
        required: true,
    },
});

module.exports = Ticket = mongoose.model('Ticket', TicketSchema);
