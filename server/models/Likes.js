const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    article_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', require: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    liked: { type: Boolean }
})

module.exports = mongoose.model('Likes', likesSchema);