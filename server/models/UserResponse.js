const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    userResponse_type: { type: String, required: true }, //['Issue', 'Comment']
    post_content: { type: String, require: true },
    comment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserResponse' },
    article_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', require: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }
})

module.exports = mongoose.model('UserResponse', userResponseSchema);