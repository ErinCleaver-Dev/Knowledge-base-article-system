const { Router } = require('express')
const router = Router()

const articleController = require('./controllers/api/article/articleController')
const userController = require('./controllers/api/user/userController')
const likeController = require('./controllers/api/likes/likeController')

router.use(userController)
router.use(articleController)
router.use(likeController)

module.exports = router;