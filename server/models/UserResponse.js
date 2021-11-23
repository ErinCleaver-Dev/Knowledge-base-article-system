const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    userResponse_type: {
        type: String,
        required: true
    }, //['Issue', 'comment', reply]
    post_content: {
        type: String,
        require: true
    },
    post_date: {
        type: Date,
        require: true,
        default: Date.now,
    },
    article_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        require: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserResponse'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
})

module.exports = mongoose.model('UserResponse', userResponseSchema);