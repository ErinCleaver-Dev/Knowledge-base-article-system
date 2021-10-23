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
        return;
    })
})

module.exports = router;