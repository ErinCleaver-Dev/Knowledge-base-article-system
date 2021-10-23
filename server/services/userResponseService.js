const UserResponse = require('../models/UserResponse');

module.exports = { 
    create : async function (data) {

      let userResponse = new UserResponse(data);

      return await userResponse.save().then(result => {
          console.log("Created Post")
      })        
    },
    getComments : async function (article_id) {
      if(article_id)  {
        return await UserResponse.find({article_id: article_id}).then(result => {
          console.log("Comments", result)
        })
      } 
    },
}