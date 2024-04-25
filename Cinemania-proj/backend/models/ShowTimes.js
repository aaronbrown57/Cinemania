const mongoose = require('mongoose');

const ShowtimeSchema = new mongoose.Schema({
    movieID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', 
        required: true,
    },
    roomID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room', 
        required: true,
    },
    period: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: 'Showtimes', 
    },
});

module.exports = Showtime = mongoose.model('Showtime', ShowtimeSchema);
