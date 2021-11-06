const UserResponse = require('../models/UserResponse');

module.exports = {
    create: async function(data) {

      let userResponse = new UserResponse(data);

      return await userResponse.save().then(result => {
          console.log("Created Post")
      })        
    },
    getComments : async function (article_id) {
      console.log("Testing getComments service", article_id)
      if(article_id)  {
        const comments = await UserResponse.find({$and: [{article_id: article_id}, {userResponse_type: {$ne: "reply"}}]})
        .populate('user_id', {firstName: 1, lastName: 1}).exec() 

        const replys = await UserResponse.find({article_id: article_id}).where('userResponse_type').equals('reply')
        .populate('user_id', {firstName: 1, lastName: 1}).exec() 

        console.log(replys)

        return {
          comments: comments,
          replys: replys
        }
      } 
    },
}
