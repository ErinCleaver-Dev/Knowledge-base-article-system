const { Router } = require('express')

const router = Router();
const articleService = require('../../../services/articleService')
const likesService = require('../../../services/likesService')

router.post('/api/likeArticle', (req, res, next) => {

    likesService.createLikes(req.body.newLike.user_id, req.body.newLike.article_id).then((results) => {
        if (results) {
            res.send(results)
        }
    }).catch(next)
})

router.post('/api/deleteLike', (req, res, next) => {
    if (req.body.deleteLike) {
        likesService.deleteLike(req.body.deleteLike)
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to delete article' }] })
    }
})

router.post('/api/updateLikeCounter', (req, res, next) => {
    let article_id = req.body.article_id
    if (article_id) {
        likesService.getLikes(article_id).then(count => {
        }).catch(next)
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to find article' }] })
    }

})


module.exports = router;