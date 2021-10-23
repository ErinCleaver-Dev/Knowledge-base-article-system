const UserResponse = require('../models/UserResponse');

async function getAll() {
    return await UserResponse.find({}).lean();
}

//create Issue
async function createIssue(userId, articleId, postContent) {
    let userResponse = new UserResponse({ userResponse_type: 'Issue', post_content: postContent, article_id: articleId, user_id: userId });

    return await userResponse.save().then(result => {
        console.log('an issue saved!!')
    })
}

//create comment

async function createComment(userId, articleId, postContent, commentId = "") {
    let userResponse;
    if (commentId) {
        userResponse = new UserResponse({ userResponse_type: 'Comment', post_content: postContent, article_id: articleId, user_id: userId, comment_id: commentId })
    } else {
        userResponse = new UserResponse({ userResponse_type: 'Comment', post_content: postContent, article_id: articleId, user_id: userId })
    }

    return await userResponse.save().then(result => {
        console.log('an comment saved!!')
    })

}

module.exports = {
    getAll,
    createIssue
}