const { Router } = require('express')

const router = Router();
const userService = require('../../../services/userService')

router.post('/api/addUser', (req, res, next) => {
    console.log(req.body)
    userService.create(req.body).then(() => {}).catch(next)
})

router.get('/api/listUsers', (req, res) => {
    userService.getAll().then((results) => {
        console.log("list users: ", results)
    })
})


//useHistory

const userHistoryService = require('../../../services/userHistoryService')


router.post('/api/createViewedArticles', (req, res, next) => {
    console.log(req.body);
    userHistoryService.createViewedArticle(req.body.userId, req.body.articleId).then(() => {
        console.log('created successfully');
        res.json({ message: 'created successfully' })
    }).catch(e => {
        console.log(error);
        next(e)
    })
})

router.get('/api/getViewedArticles', (req, res) => {
    userHistoryService.getViewedArticle(req.query.userId).then((results) => {
        console.log(results);
        res.json({ getViewedArticles: results });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: 'something wrong!' })
    })
})

router.post('/api/createSavedArticles', (req, res) => {
    userHistoryService.createSavedArticle(req.body.userId, req.body.articleId).then((results) => {
        console.log('created successfully');
        res.json({ message: 'created successfully' })
    }).catch(e => {
        console.log(error);
        next(e)
    })
})

router.get('/api/getSavedArticles', (req, res) => {
    userHistoryService.getSavedArticle(req.query.userId).then((results) => {
        console.log(results);
        res.json({ getSavedArticles: results });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: 'something wrong!' })
    })
})

router.post('/api/deleteSavedArticle', (req, res) => {
    userHistoryService.deleteSavedArticle(req.body.userId, req.body.articleId).then((results) => {
        console.log('delete Successfully!')
        res.json({ message: 'delete successfully' })
    }).catch(e => {
        console.log(e)
        res.json({ message: e })
    })
})

router.post('/api/createFeedback', (req, res) => {
    userHistoryService.createFeedback(req.body.userId, req.body.reason, req.body.postContent).then(result => {
        console.log('feedback created successfully!')
        res.json({ message: 'feedback created successfully' })
    }).catch(e => {
        console.log(e)
        res.json({ message: e })
    })
})

























module.exports = router;