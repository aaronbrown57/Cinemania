const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    type: {
        type: Number,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    promoSubscription: {
        type: String,
        enum: ['YES', 'NO'], 
        default: 'NO',
    },
    status: {
        type: Number,
        required: true,
    },
});

module.exports = User = mongoose.model('User', UserSchema);
