const {Router} = require('express')

const router = Router();
const articleService = require('../../../services/articleService')

router.post('/api/addArticle', (req, res, next) => {
    articleService.create(req.body).then(() => {

    }).catch(next)
})

router.get('/api/listAllArticles', (req, res) => {
    articleService.getAll().then((results) => {
        console.log("list articles: ", results)
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
        }).catch(next)
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to find article' }] })
    }
})

module.exports = router;