const Likes = require('../models/Likes');


async function createLikes(userId, articleId) {
    let likes = new Likes({
        user_id: userId,
        article_id: articleId,
        liked: true,
    });
    return await likes.save().then(result => {
        console.log('a like saved!!')
    })
}

async function deleteLikes(userId, articleId) {
    await Likes.findOneAndDelete({ user_id: userId, article_id: articleId }, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            console.log(doc + 'this data was deleted');
        }
    })
}

async function getLikesResult(userId, articleId) {
    return await Likes.findOne({ user_id: userId, article_id: articleId }).then(result => {
        return result.liked;
    })
}

module.exports = {
    createLikes,
    deleteLikes,
    getLikesResult
}