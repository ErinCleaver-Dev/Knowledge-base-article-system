const mongoose = require('mongoose');
const Likes = require('../models/Likes');
const UserHistory = require('../models/UserHistory');
const UserResponse = require('../models/UserResponse');

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
    category: {
        type: String,
        require: true,
    },
    key_terms: {
        type: Array,
        require: true,
        lowercase: true, 
        trim: true 
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

articleSchema.pre('findOneAndDelete', async function(next) {
    //console.log(this._conditions._id)
    let articleId = this._conditions._id
    await Likes.deleteOne({ article_id: articleId });
    console.log('test2')
    await UserHistory.deleteMany({ article_id: articleId });
    console.log('test3')
    await UserResponse.deleteMany({ article_id: articleId });
    console.log('test3')
    next();
})

module.exports = mongoose.model('Article', articleSchema);