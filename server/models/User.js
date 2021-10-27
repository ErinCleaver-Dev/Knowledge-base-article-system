const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    displayName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    uid: { type: String, required: true, unique: true },
})

module.exports = mongoose.model('User', userSchema);