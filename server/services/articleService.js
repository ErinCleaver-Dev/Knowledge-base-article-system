const Article = require('../models/Article');

module.exports = {
    getAll: async function() {
        return await Article.find({}).lean();
    },
    create: async function(data) {
        console.log("checking for data: ", data)
        let article = new Article(data);

        return await article.save().then(result => {
            //console.log(result)
            console.log('Added article');
            return result;
        })
    },
    update: async function(_id, data) {
        return await Article.findByIdAndUpdate(_id, {
            last_revised_date: Date.now(),
            title: data.title,
            category: data.category,
            key_terms: data.key_terms,
            video: data.video,
            post_content: data.post_content,
        }).then(result => {
            console.log('Updated article')
        })
    },
    delete: async function(_id) {
        return await Article.findByIdAndDelete(_id).then(result => {
            console.log('Article Deleted')
        })
    },
    getOneByid: async function(_id) {
        return await Article.findById(_id)
    },
    findArticles: async function(search) {

        console.log(search)
        return await Article.find({ key_terms: search }).lean();
    },
    findByCategory: async function(catagory, start, sort) {
        return await Article.find({ catagory: catagory }).sort([
            [`${sort}`, -1]
        ]).skip(start).limit(10).lean();
    },
    getByUserId: async function(user) {
        return await Article.find({ user_id: user })
    },
    // find specific article from user_id and article_id
    getByUserIdAndArticleId: async function(user, article) {
        return await Article.findOne({ user_id: user, _id: article });
    },
    updateLike: async function(_id, likes) {
        console.log("testing likes: ", likes)
        return await Article.findByIdAndUpdate(_id, {
            likes: likes,
        }).then(result => {
            console.log('Updated like counter ', result)
        })
    },
    topTen: async function() {
        return await Article.find({}).sort({ likes: -1 }).limit(10);
    },
}