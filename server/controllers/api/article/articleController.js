const {Router} = require('express')

const router = Router();
const articleService = require('../../../services/articleService')

router.post('/api/addArticle', (req, res, next) => {
    articleService.create(req.body).then(() => {
    }).catch(next)
})

router.get('/api/listAllArticles', (req, res) => {
    articleService.getAll().then((data) => {
        console.log("list articles: ", data)
        res.send(data)
    })
})

router.get('/api/topTen', (req, res) => {
    articleService.topTen().then((data) => {
        console.log("list articles: ", data)
        res.send(data)
    })
})


router.post('/api/updateArticle', (req, res, next) => {
    articleService.update(req.body._id, req.body).then(() => {
        console.log("updated article")
    })
})

router.post('/api/deleteArticle', (req, res, next) => {
    if(req.body._id) {
        articleService.delete(req.body._id)
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to delete article' }] })
    }
})

router.get('/api/getArticle', (req, res, next) => {
    console.log(req.body)
    if(req.body._id) {
        articleService.getOneByid(req.body._id).then((result) => {
            console.log(result)
            res.send(result)
        }).catch(next)
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to find article' }] })
    }
})

router.post('/api/findArticles', (req, res, next) => {
    console.log(req.body.search)
    if(req.body.search) {
        articleService.findArticles(req.body).then((results) => {
            console.log("list articles: ", results)
            res.send(results)
        })
    } else {
        return res.status(400).json({ errors: [{ msg: 'no search term provided' }] })
    }
})

router.post('/api/getCategories', (req, res, next) => {
    if(req.body.category) {
        articleService.findByCategory(req.body).then((results) => {
            console.log("list articles: ", results)

            
            res.send(results)
        })
    } else {
        return res.status(400).json({ errors: [{ msg: 'no search term provided' }] })
    }
})

router.get('/api/getUsersArticles', (req, res, next) => {
    console.log(req.user_id)
    if(req.body.user_id) {
        articleService.getByUserid(req.body.user_id).then((results) => {
            console.log("list articles: ", results)
            res.send(results)
        })
    } else {
        return res.status(400).json({ errors: [{ msg: 'no search term provided' }] })
    }
})


module.exports = router;