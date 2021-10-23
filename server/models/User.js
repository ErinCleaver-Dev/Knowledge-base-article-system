const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    uid: { type: String, required: true, unique: true },
    login_tries: { type: Number, default: 0 },
})

module.exports = mongoose.model('User', userSchema);