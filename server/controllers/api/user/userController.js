const { Router } = require('express')

const router = Router();
const userService = require('../../../services/userService')
const userResponseService = require('../../../services/userResponseService')
const userHistoryService = require('../../../services/userHistoryService')
const { sendEmailFunc } = require('../../../nodemailer/nodemailer')

router.post('/api/addUser', (req, res, next) => {
    console.log(req.body)
    userService.create(req.body).then((result) => {
        console.log(result);
        sendEmailFunc(result.email);
        res.json(result)
    }).catch()
})

router.get('/api/listUsers', (req, res) => {
    userService.getAll().then((results) => {
        console.log("list users: ", results)
        res.send(results)
    })
})

router.post('/api/getUser', (req, res, next) => {
    userService.getUser(req.body.userId).then((result) => {
        console.log("get user: ", result)
        return res.send(result)
    }).catch(next)
})

//for checking if there is the duplicate uid when user register account, but login with google again with same email account.
router.post('/api/getUserByUid', (req, res, next) => {
    console.log('testing req', req.body.uid)
    userService.getUserByUid(req.body.uid).then((result) => {
        console.log("get userByUid: ", result)
        return res.send(result)
    }).catch(next)
})


router.post('/api/createViewedArticles', (req, res, next) => {
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
    console.log(req.query)
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

// the followings are for UserResponse

router.post('/api/creatPost', (req, res, next) => {
    console.log(req.body)
    if (req.body) {
        userResponseService.create(req.body.post).then(() => {

        }).catch(next)
    } else {
        return res.status(400).json({ errors: [{ msg: 'failed to create post' }] })
    }
})

router.post('/api/getComments', (req, res, next) => {

    console.log('get comments service', req.body.article_id)
    userResponseService.getComments(req.body.article_id).then(result => {
        console.log("testing comments and reply: ", result)
        res.send(result)
    }).catch(next)
})

router.post('/api/getCommentsByUserId', (req, res, next) => {
    userResponseService.getCommentsByUserId(req.body.user_id).then(result => {
        // console.log(result)
        res.json(result)
    }).catch(next)
})


router.post('/api/deleteComments', (req, res, next) => {
    userResponseService.deleteCommentsById(req.body.deletedComments).catch(next);
})












module.exports = router;