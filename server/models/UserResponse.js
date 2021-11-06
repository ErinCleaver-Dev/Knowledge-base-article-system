const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    userResponse_type: 
    { 
        type: String, 
        required: true 
    }, //['Issue', 'Comments', reply]
    post_content: 
    { 
        type: String, 
        require: true 
    },
    post_date: {
        type: Date, 
        require: true, 
        default: new Date()
    },
    article_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Article', 
        require: true 
    },
    responseTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'comment' 
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', require: true 
    }
})

module.exports = mongoose.model('UserResponse', userResponseSchema);