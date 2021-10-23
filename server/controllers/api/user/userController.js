const {Router} = require('express')

const router = Router();
const userService = require('../../../services/userService')
const userResponseService = require('../../../services/userResponseService')

router.post('/api/addUser', (req, res, next) => {
    console.log(req.body)
    userService.create(req.body).then(() => {
    }).catch(next)
})

router.get('/api/listUsers', (req, res) => {
    userService.getAll().then((results) => {
        console.log("list users: ", results)
    })
})

router.post('/api/creatPost', (req, res, next) => {
    console.log(req.body)
    if(req.body) {
        userResponseService.create(req.body).then(() => {

        }).catch(next)
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to create post' }] })
    }
})

router.post('/api/replaytoPost', (req, res, next) => {

    if(req.body.comment_id) {
    const reply  = {
        userResponse_type: 'reply ',
        post_content: req.body.post_content,
        comment_id: req.body.comment_id,
        article_id: req.body.article_id,
        user_id: req.body.user_id,
    }
        if(reply) {
            userResponseService.create(reply).then(() => {

            }).catch(next)
        } else {
            return res.status(400).json({ errors: [{ msg: 'failed to create replay' }] })
        }
    } else {
        return res.status(400).json({ errors: [{ msg: 'User cannot reply to their own post' }]})
    }
})

router.get('/api/getComments', (req, res, next) => {
    userResponseService.getComments(res.query.articleID).catch(next)
})

module.exports = router;