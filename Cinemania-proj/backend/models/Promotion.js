const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    promoCode: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    sentToUsers: {
        type: Boolean,
        default: 'false'
    },
    isActive: {
        type: Boolean,
        default: 'false',
        required: true
    },
}, { collection: 'promotion' });


module.exports = Promotion = mongoose.model('Promotion', PromotionSchema);
