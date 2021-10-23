const { Router } = require('express')
const router = Router()

const articleController = require('./controllers/api/article/articleController')
const userController = require('./controllers/api/user/userController')
router.use(userController)
router.use(articleController)

module.exports = router;