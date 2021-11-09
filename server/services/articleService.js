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
            return result;
        })
    },
    getOneByid: async function(_id) {
        return await Article.findById(_id)
    },
    findArticles: async function(body) {
        console.log("testing find", body)
        let search = body['search'];
        let page = body['start'];

        //count total document
        const total = await Article.find({ key_terms: search }).countDocuments();

        //console.log(total)
        let pagesize = 10;

        const start = (page - 1) * pagesize;
        const pages = Math.ceil(total / pagesize);

        if (page > pages) {
            return ({
                message: "No page found",
            })
        }

        return await Article.find({ key_terms: search }).sort(body['sort']).skip(start).limit(pagesize).lean().then(results => {
            //console.log(results);
            let data = {
                pages: pages,
                articles: results
            }
            return data;
        }).catch(e => {
            console.log(e);
            return ({
                message: "No page found"
            })
        })
    },
    findByCategory: async function(body) {
        let category = body['category'];
        let page = body['start'];

        let query = Article.find({ category: category });
        let query2 = Article.find({ category: category });;
        const total = await query.countDocuments();
        let pagesize = 10;

        let start = (page - 1) * pagesize;
        const pages = Math.ceil(total / pagesize);

        if (page > pages) {
            return res.status(404).json({
                message: "No page found",
            })
        }

        articles = await query2.sort(body['sort']).skip(start).limit(pagesize).lean()

        return results = {
            pages: pages,
            articles: articles
        }
    },
    getByUserId: async function(user) {
        return await Article.find({ user_id: user }).lean();
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