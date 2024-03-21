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
    title: {
        type: String,
        default: 'Promotion', 
    },
});

module.exports = Promotion = mongoose.model('Promotion', PromotionSchema);
