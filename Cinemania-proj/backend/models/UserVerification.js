const mongoose = require('mongoose');

const UserVerificationSchema = new mongoose.Schema({

    userId: { type: String, required: true },
    verificationCode: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
   
});

module.exports = UserVerification = mongoose.model('UserStatus', UserVerificationSchema);
