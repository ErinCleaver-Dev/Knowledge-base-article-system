const mongoose = require('../config/mongoose');

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    uid: { type: String, required: true },
})

module.exports = mongoose.model('User', userSchema);