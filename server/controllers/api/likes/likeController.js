const {Router} = require('express')

const router = Router();
const articleService = require('../../../services/articleService')
const likesService = require('../../../services/likesService')

router.post('/api/likeArticle', (req, res, next) => {
    likesService.createLikes(req.query.userId, req.query.articleId).then(() => {
        return "record creacted."
    }).catch(next)
})

router.post('/api/deleteLike', (req, res, next) => {
    if(req.query.userID && req.query.articleID) {
        likesService.deleteLike(req.query.userID, req.query.articleID)
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to delete article' }] })
    }
})


module.exports = router;