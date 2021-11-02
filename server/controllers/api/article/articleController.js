const { Router } = require('express')

const router = Router();
const articleService = require('../../../services/articleService')

//for create article page 
router.post('/api/addArticle', (req, res, next) => {
    //console.log(req.body);
    articleService.create(req.body).then((result) => {
        res.json({ 'success': true })
    }).catch(next)
})

router.get('/api/listAllArticles', (req, res) => {
    articleService.getAll().then((data) => {
        console.log("list articles: ", data)
        res.send(data)
    })
})

//for home page Top ten
router.get('/api/topTen', (req, res) => {
    articleService.topTen().then((data) => {
        console.log("list articles: ", data)
        res.send(data)
    })
})

// for edit page to update article
router.post('/api/updateArticle', (req, res, next) => {
    articleService.update(req.body.article_id, req.body).then(() => {
        res.send({ result: true });
        console.log("updated article")
    })
})

router.post('/api/deleteArticle', (req, res, next) => {
    if (req.body._id) {
        articleService.delete(req.body._id)
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to delete article' }] })
    }
})

router.get('/api/getArticle', (req, res, next) => {
    console.log(req.body)
    if (req.body._id) {
        articleService.getOneByid(req.body._id).then((result) => {
            console.log(result)
            res.send(result)
        }).catch(next)
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to find article' }] })
    }
})

//for search pages to use
router.post('/api/findArticles', (req, res, next) => {
    console.log(req.body.search)
    if (req.body.search) {
        articleService.findArticles(req.body).then((results) => {
            console.log("list articles: ", results)
            res.send(results)
        })
    } else {
        return res.status(400).json({ errors: [{ msg: 'no search term provided' }] })
    }
})

//for category pages to use
router.post('/api/getCategories', (req, res, next) => {
    if (req.body.category) {
        articleService.findByCategory(req.body).then((results) => {
            console.log("list articles: ", results)
            res.send(results)
        })
    } else {
        return res.status(400).json({ errors: [{ msg: 'no search term provided' }] })
    }
})

// Get user's articles in te UserArticles page
router.post('/api/getUsersArticles', (req, res, next) => {
    console.log(req.body.user_id);
    if (req.body.user_id) {
        articleService.getByUserId(req.body.user_id).then((results) => {
            console.log("list articles: ", results)
            res.json(results);
        }).catch(e => {
            console.log(e);
            res.send('');
        })
    } else {
        return res.status(400).json({ errors: [{ msg: 'no search term provided' }] })
    }
})

//Get user's specific article from user_id and article_id
router.post('/api/getUserSpecificArticle', (req, res, next) => {
    console.log(req.body);
    articleService.getByUserIdAndArticleId(req.body.user_id, req.body.article_id).then((result) => {
        console.log(result);
        res.json(result);
    }).catch(e => {
        console.log(e);
        res.send('')
    })
})

module.exports = router;