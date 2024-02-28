const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
});

module.exports = Movie = mongoose.model('movies', MovieSchema);