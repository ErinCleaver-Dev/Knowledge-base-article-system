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

module.exports = {
    getAll,
    createIssue
}