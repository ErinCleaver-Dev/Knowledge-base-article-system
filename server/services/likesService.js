const Likes = require('../models/Likes');


async function createLikes(user_id, article_id) {

    console.log(user_id, article_id);
    let likes = new Likes({
        user_id: user_id,
        article_id: article_id,
        liked: true,
    });
    let _id = '';

    let exists = true;
    let liked = ''
    liked = await Likes.find({$and: [{article_id: article_id}, {user_id: user_id}]}).then(result => {
        if(result.length > 0) {
            _id = result[0]._id
        } else {
            exists = false;
        }
    })
    
    

    if(!exists) {
        return await likes.save().then(result => {
            console.log('a like saved!! ')
        }) 
    } else {
        return _id
    }
}



async function deleteLike(like_id) {
    
    return await Likes.findOneAndDelete({_id: like_id}).then(result => {
        console.log("deleted like ", result)
    })
}

async function getLikes(articleId) {
    if(articleId) {
        return await Likes.count({ article_id: articleId }).then(result => {
            console.log("test count ", result)
        })
    } else {
        console.log('no article found')
    }
}



module.exports = {
    createLikes,
    deleteLike,
    getLikes
}