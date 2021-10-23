const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    published_date: {
        type: Date,
        default: Date.now,
    },
    last_revised_date: {
        type: Date,
    }, 
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }, 
    title: {
        type: String,
        require: true,
    },
    catagory: {
        type: String,
        require: true,
    },
    key_terms: {
        type: Array,
        require: true,
    }, 
    video: {
        type: String,
        require: false,
    },
    post_content: {
        type: String,
        require: true,
    },
    likes: { 
        type: Number, 
        default: 0,
    }
})

module.exports = mongoose.model('Article', articleSchema);