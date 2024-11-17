const router = require('express').Router()
const apiBooksRouter = require('./api.book.routes')
const apiAuthRouter = require('./api.auth.routes')


router.use('/books', apiBooksRouter)
router.use('/auth', apiAuthRouter)

module.exports = router;