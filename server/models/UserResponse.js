const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    userResponse_type: { type: String, required: true }, //['Issue', 'Comments', reply]
    post_content: { type: String, require: true },
    article_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', require: true },
    responseTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }
})

module.exports = mongoose.model('UserResponse', userResponseSchema);