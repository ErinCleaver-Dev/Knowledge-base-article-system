const mongoose = require('mongoose');

const userHistorySchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    history_type: { type: String, required: true }, //[‘viewedArticle’, ‘savedArticle’, 'feedbackResponse']
    reason: { type: String },
    post_content: { type: String, require: true },
    article_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    date: { type: Date, default: Date.now, require: true }
})

module.exports = mongoose.model('UserHistory', userHistorySchema);