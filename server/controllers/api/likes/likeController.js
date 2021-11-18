const {Router} = require('express')

const router = Router();
const articleService = require('../../../services/articleService')
const likesService = require('../../../services/likesService')

router.post('/api/likeArticle', (req, res, next) => {

    likesService.createLikes(req.body.newLike.user_id, req.body.newLike.article_id).then((results) => {
        if(results) {
            res.send(results)
        }
    }).catch(next)
})

router.post('/api/deleteLike', (req, res, next) => {
    console.log('test delete service ', req.body)
    if(req.body.deleteLike) {
        likesService.deleteLike(req.body.deleteLike)
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to delete article' }] })
    }
})

router.post('/api/updateLikeCounter', (req, res, next) => {
    let articleid = req.body.articleID
    console.log("test like counter")

    if(articleid) {
        likesService.getLikes(articleid).then(count => {
            articleService.updateLike(articleid, count).catch(next)
        }).catch(next)
       
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to find article' }] })
    }

})


module.exports = router;