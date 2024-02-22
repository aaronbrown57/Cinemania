const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    cast: {
        type: Array,
        default: [],
    },
    director: {
        type: String,
        default: '',
    },
    producer: {
        type: String,
        default: '',
    },
    synopsis: {
        type: String,
        default: '',
    },
    reviews: {
        type: Array,
        default: [],
    },
    trailerPic: {
        type: String,
        default: '',
    },
    trailerVideo: {
        type: String,
        default: '',
    },
    rating: {
        type: String,
        default: '',
    }
});

module.exports = Item = mongoose.model('movies', MovieSchema);