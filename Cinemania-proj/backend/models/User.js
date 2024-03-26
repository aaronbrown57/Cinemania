const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    type: {
        type: Number,
        required: true,
        default: 0
       //0=web 1=registered, 2=admin
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
         //0 means inactive
    },
    verified:{
        type:Boolean,
        default:false
    }
});

module.exports = User = mongoose.model('User', UserSchema);
