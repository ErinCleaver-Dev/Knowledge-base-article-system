const UserResponse = require('../models/UserResponse');

module.exports = {
    create: async function(data) {

        return await UserResponse.save().then(result => {
            console.log("Created Post")
        })
    },
    getComments: async function(comment_id = null, article_id) {
        if (comment_id == null) {
            return await UserResponse.find({ article_id: article_id })
        } else {
            return await UserResponse.find({ $and: [{ article_id: article_id }, { comment_id: comment_id }] })
        }
    },
    
}