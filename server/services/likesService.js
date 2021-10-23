const Likes = require('../models/Likes');


async function createLikes(userId, articleId) {
    let likes = new Likes({
        user_id: userId,
        article_id: articleId,
        liked: true,
    });

    let exists = true;

    await Likes.findOne({$and : [{user_id: userId}, {article_id: articleId}]}).then ((result) => {
        if(result) {
            console.log("Article already liked.")
        } else {
            exists = false;
        }
    })

    if(!exists) {
        return await likes.save().then(result => {
            console.log('a like saved!! ', result)
        })
    }
}



async function deleteLike(userId, articleId) {
    return await Likes.findOneAndDelete({$and : [{user_id: userId}, {article_id: articleId}]}), (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            console.log(doc + 'this data was deleted');
        }
    }
}

async function getLikes(articleId) {
    if(articleId) {
        return await Likes.count({$and : [{ article_id: articleId }, {liked: true }]})
    } else {
        console.log('no article found')
    }
}



module.exports = {
    createLikes,
    deleteLike,
    getLikes
}