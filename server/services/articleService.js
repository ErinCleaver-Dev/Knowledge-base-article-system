const Article = require('../models/Article');

module.exports = {
    getAll : async function () {
        return await Article.find({}).lean();
    },
    create : async function (data) {
        console.log("checking for data: ", data)
        let article = new Article(data); 

        return await article.save().then(result => {
            console.log('Added article');
        })
    },
    update : async function (_id ,data) {
        return await Article.findByIdAndUpdate(_id, {
            last_revised_date: data.last_revised_date || Date.now(),
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
    findArticles : async function (search) {

        console.log(search)
       return await Article.find({key_terms: search}).lean();
    },
    findByCategory : async function (body) {
        let category = body['category'];
        let page = body['start'];
        
        let query = Article.find({category: category});
        let query2 = Article.find({category: category});;
        const total = await query.countDocuments();
        let start = (page - 1 ) * 10;
        const pages = Math.ceil(total/10);

        if(page > pages) {
            return res.status(404).json({ 
                message: "No page found",
            })
        }

        console.log(`category: ${category} - start: ${start} - sort: ${body['sort']}`)
        console.log("get total number of pages", pages)

        articles = await query2.sort(body['sort']).skip(start).limit(10).lean()

        return results = {
            pages: pages,
            articles: articles
        }
    },
    getByUserid : async function (user) {
        return await Article.find({user_id: user})
    },
    updateLike :  async function (_id ,likes) {
        console.log("testing likes: ", likes)
        return await Article.findByIdAndUpdate(_id, {
            likes: likes,
        }).then(result => {
            console.log('Updated like counter ', result)
        })
    },
    topTen : async function () {
        return await Article.find({}).sort({likes: -1}).limit(10);
    },
}

