const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    type: {
        type: Number,
        required: true,
        default: 0
        //0 means inactive
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
        type: Boolean, 
        default: false 
    },
    status: {
        type: Number,
        required: true,
    },
    verified:{
        type:Boolean,
        default:false
    }
});

module.exports = User = mongoose.model('User', UserSchema);
