const mongoose = require('mongoose');

const UserTypeSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required: true,
    },
    typeValue: {
        type: String,
        required: true,
    },
});

module.exports = UserType = mongoose.model('UserType', UserTypeSchema);
