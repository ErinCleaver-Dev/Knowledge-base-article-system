const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    displayName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    uid: { type: String, required: true, unique: true },
    login_tries: { type: Number, default: 0 },
})

module.exports = mongoose.model('User', userSchema);