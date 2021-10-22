const {Router} = require('express')

const router = Router();
const articleServices = require('../../../services/articleService')

router.post('/api/addArticle', (req, res, next) => {
    articleServices.create(req.body).then(() => {
        console.log("Created article");
    }).catch(next)
})

module.export = router;