const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    published_date: {
        type: Date,
        require: true,
    },
    last_revised_date: {
        type: Date,
    }, 
    user_id: {
        type: Mongoose.Schema.Types.ObjectId,
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
        type: String,
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
    likes: { type: number, require: true}
})

module.exports = mongoose.model('Article', articleSchema);