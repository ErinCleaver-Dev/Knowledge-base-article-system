const UserResponse = require('../models/UserResponse');

module.exports = {
    create: async function(data) {

        let userResponse = new UserResponse(data);

        return await userResponse.save().then(result => {
            console.log("Created Post")
        })
    },
    getComments: async function(article_id) {
        if (article_id) {

            console.log("check get comments by id", article_id)
            return await UserResponse.find({ article_id: article_id })
                .populate('user_id', { firstName: 1, lastName: 1 }).exec()
        }
    },
    getCommentsByUserId: async function(user_id) {
        return await UserResponse.find({
                $and: [{
                        $or: [
                            { userResponse_type: 'comment' }, { userResponse_type: 'reply' }
                        ]
                    },
                    { user_id: user_id }
                ]
            })
            .populate({ path: 'article_id', select: 'title published_date user_id likes', populate: 'user_id' })



    }
}