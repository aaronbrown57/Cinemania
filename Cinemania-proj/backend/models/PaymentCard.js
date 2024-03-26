const mongoose = require('mongoose');

const PaymentCardSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    cardNo: {
        type: String,
        required: true,
    },
    
    expirationDate: {
        type: String,
        required: true,
    },
});

module.exports = PaymentCard = mongoose.model('PaymentCard', PaymentCardSchema);
