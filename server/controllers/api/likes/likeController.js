const {Router} = require('express')

const router = Router();
const articleService = require('../../../services/articleService')
const likesService = require('../../../services/likesService')

router.post('/api/likeArticle', (req, res, next) => {
    likesService.createLikes(req.query.userId, req.query.articleId).then((results) => {
        if(results == true) {
            req.send({
                created: 'Record already exists',
            })
        } else {
            req.send({
                created: 'Created new record',
            })
        }
    }).catch(next)
})

router.post('/api/deleteLike', (req, res, next) => {
    if(req.query.userID && req.query.articleID) {
        likesService.deleteLike(req.query.userID, req.query.articleID)
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to delete article' }] })
    }
})

router.post('/api/updateLikeCounter', (req, res, next) => {
    let likes = 0;  
    let articleid = req.query.articleID

    if(articleid) {
        likesService.getLikes(articleid).then(count => {
            articleService.updateLike(articleid, count).catch(next)
        }).catch(next)
       
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to find article' }] })
    }

})


module.exports = router;