const UserResponse = require('../models/UserResponse');

module.exports = {
    create: async function(data) {

      let userResponse = new UserResponse(data);

      return await userResponse.save().then(result => {
          console.log("Created Post")
      })        
    },
    getComments : async function (article_id) {
      if(article_id)  {
        const comments = await UserResponse.find({article_id: article_id})
        .populate('user_id', {firstName: 1, lastName: 1}).exec() 

        let newCommentObject = []
        
          console.log
        return {
          comments: comments,
        }
      } 
    },
}
