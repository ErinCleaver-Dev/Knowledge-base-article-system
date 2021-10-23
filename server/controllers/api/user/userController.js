const {Router} = require('express')

const router = Router();
const userService = require('../../../services/userService')

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

module.exports = router;