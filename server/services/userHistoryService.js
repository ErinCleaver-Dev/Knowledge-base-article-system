const UserHistory = require('../models/UserHistory');
// viewedArticle
async function createViewedArticle(userId, articleId) {
    await UserHistory.findOneAndDelete({ history_type: 'viewedArticle', article_id: articleId, user_id: userId }).then(result => {
        console.log("Deleted old duplicated viewedArticle : ", result);
        return;
    });
    let userHistory = new UserHistory({ history_type: 'viewedArticle', article_id: articleId, user_id: userId });
    return await userHistory.save().then(result => {
        console.log('an viewedArticle saved!!')
    }).catch(e => {
        console.log(e)
    })
}
async function getViewedArticle(userId) {
    return await UserHistory.find({ user_id: userId, history_type: 'viewedArticle' })
        .populate('article_id')
        .select('article_id date')
        .populate({ path: "article_id", populate: "user_id" })
        .then(results => {
            let viewedArticleArray = [];
            results.map(result => {
                viewedArticleArray.push({ article: result.article_id, date: result.date })
            })
            return viewedArticleArray;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
}
// Saved Article
async function createSavedArticle(userId, articleId) {
    let userHistory = new UserHistory({ history_type: 'savedArticle', article_id: articleId, user_id: userId });
    console.log(userHistory)
    return await userHistory.save().then(result => {
        console.log('an savedArticle saved!!')
    })
}
async function deleteSavedArticle(userId, articleId) {
    return await UserHistory.findOneAndDelete({ history_type: 'savedArticle', article_id: articleId, user_id: userId }).then((result) => {
        console.log("Deleted savedArticle : ", result);
        return true;
    }).catch(e => {
        console.log(e)
    })
}
async function getSavedArticle(userId) {
    return await UserHistory.find({ user_id: userId, history_type: 'savedArticle' })
        .populate('article_id')
        .select('article_id date')
        .populate({ path: "article_id", populate: "user_id" })
        .then(results => {
            let savedArticleArray = [];
            results.map(result => {
                savedArticleArray.push({ article: result.article_id, date: result.date })
            })
            return savedArticleArray;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
}
//create Feedback
async function createFeedback(userId, reason, postContent) {
    let userHistory = new UserHistory({ user_id: userId, history_type: 'feedback', reason: reason, post_content: postContent });
    return await userHistory.save().then(result => {
        console.log('an feedback saved!!')
    })
}
module.exports = {
    createViewedArticle,
    getViewedArticle,
    createSavedArticle,
    deleteSavedArticle,
    getSavedArticle,
    createFeedback
}