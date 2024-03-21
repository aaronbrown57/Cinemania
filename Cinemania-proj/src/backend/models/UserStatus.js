const mongoose = require('mongoose');

const UserStatusSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required: true,
    },
    typeValue: {
        type: Number,
        required: true,
    },
});

module.exports = UserStatus = mongoose.model('UserStatus', UserStatusSchema);
