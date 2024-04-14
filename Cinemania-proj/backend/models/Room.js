const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    numberOfSeats: {
        type: Number,
        required: true
    },
    Title: {
        type: String,
        required: true
    }
}, { collection: 'room' }); // Specify the collection name here

module.exports = mongoose.model('Room', RoomSchema);
