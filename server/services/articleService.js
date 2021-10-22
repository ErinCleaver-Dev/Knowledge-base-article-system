const Article = require('../models/Article');

module.exports = {
    getAll : async function () {
        return await Article.find({}).lean();
    },
    create : async function (data) {
        let article = new Article(data); 

        return await article.save().then(result => {
            console.log('Added article');
        })
    },
    edit : async function (_id ,data) {
        return await Article.findByIdAndUpdate(_id, {
            last_revised_date: data.last_revised_date,
            title: data.title,
            category: data.category,
            key_terms: data.key_terms,
            video: data.video,
            post_content: data.post_content,
        }).then(result => {
            console.log('Updated article')
        })
    },
    delete: async function (_id) {
        return await Article.findByIdAndDelete(_id).then(result => {
            console.log('Article Deleted')
        })
    },
    getOneByid : async function (_id) {
        return await Article.findById(_id)
    },
    findPosts : async function (search) {
        return await Article.find({$or: [{title: search}, {keywords: search}, {post_content: search}]}).lean();
    },
    getByUserid : async function (user) {
        return await Article.find({user_id: user})
    },
    updateLike :  async function (_id ,like) {
        return await Article.findByIdAndUpdate(_id, {
            like: like,
        }).then(result => {
            console.log('Updated like counter')
        })
    },
}

