const Article = require('../models/Article');

module.exports = {
    getAll : async function () {
        return await Article.find({}).lean();
    },
    create : async function (data) {
        let article = new Article(data); 

        return await article.save().then(result => {
            console.log('Added job to list');
        })
    },
    getOneByid : async function (_id) {
        return await Article.findById(_id)
    },
    findPosts : async function (search) {
        return await Article.find({$or: [{title: search}, {keywords: search}, {post_content: search}]}).lean();
    }
}

