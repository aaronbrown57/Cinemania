const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    movieTitle: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    cast: {
        type: Array,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    producer: {
        type: String,
        required: true,
    },
    synopsis: {
        type: String,
        required: true,
    },
    reviews: {
        type: Array,
        required: true,
    },
    trailerPictureURL: {
        type: String,
        required: true,
    },
    trailerVideoURL: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    comingSoon: {
        type: Boolean,
        required: true,
    },
    showDate: {
        type: String,
        required: function () {
            //to ask if it is required, if coming soon doesnt need it
            return this.comingSoon === false;
        }
    },
    showTime: {
        type: String,
        required: function () {
            //to ask if it is required, if coming soon doesnt need it
            return this.comingSoon === false;
        }
    }
});

module.exports = Movie = mongoose.model('Movie', MovieSchema);