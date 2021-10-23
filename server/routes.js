const { Router } = require('express')
const router = Router()

const articleController = require('./controllers/api/article/articleController')

router.use(articleController)
module.exports = router;