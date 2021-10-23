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

router.get('/api/creatPost', (req, res) => {
    if(req.body) {
        articleService.create(req.body).then(() => {

        }).catch(next)
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to create post' }] })
    }
})

module.exports = router;