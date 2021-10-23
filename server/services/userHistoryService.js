const UserHistory = require('../models/UserHistory');





async function getAll() {
    return await UserHistory.find({}).lean();
}



// viewedArticle
async function createViewedArticle(userId, articleId) {
    User.findOneAndDelete({ history_type: 'viewedArticle', article_id: articleId, user_id: userId }, function(err, doc) {
        if (err) {
            console.log(err)
        } else {
            console.log("Deleted old duplicated viewedArticle : ", doc);
        }
    });
    let userHistory = new UserHistory({ history_type: 'viewedArticle', article_id: articleId, user_id: userId });
    return await userHistory.save().then(result => {
        console.log('an viewedArticle saved!!')
    })
}


async function getViewedArticle(userId) {
    return await UserHistory.find({ user_id: userId, history_type: 'viewedArticle' })
        .populate('article_id')
        .select('article_id date')
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
    return await userHistory.save().then(result => {
        console.log('an savedArticle saved!!')
    })
}

async function deleteSavedArticle(userId, articleId) {
    await UserHistory.findOneAndDelete({ history_type: 'savedArticle', article_id: articleId, user_id: userId }, (err, doc) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Deleted savedArticle : ", doc);
        }
    })
}

async function getSavedArticle(userId) {
    return await UserHistory.find({ user_id: userId, history_type: 'SavedArticle' })
        .populate('article_id')
        .select('article_id date')
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
async function createFeedback(userId, postContent) {
    let userHistory = new UserHistory({ user_id: userId, history_type: 'feedback', post_content: postContent });
    return await userHistory.save().then(result => {
        console.log('an feedback saved!!')
    })
}


module.exports = {
    getAll,
    createViewedArticle,
    getViewedArticle,
    createSavedArticle,
    deleteSavedArticle,
    getSavedArticle,
    createFeedback
}