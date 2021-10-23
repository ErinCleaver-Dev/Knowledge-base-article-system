const {Router} = require('express')

const router = Router();
const articleService = require('../../../services/articleService')
const likesService = require('../../../services/likesService')

router.post('/api/likeArticle', (req, res, next) => {

    likesService.createLikes(req.params.userId, req.params.articleId).then(() => {
        return "record creacted."
    }).catch(next)
})



module.exports = router;