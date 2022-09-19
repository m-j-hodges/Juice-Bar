const router = require('express').Router();

const userRoutes = require('./user-routes/user-routes')

const viewsRoutes = require('./views-routes/views-routes')

const commentRoutes = require('./comment-routes/comment-routes')

router.use('/user', userRoutes);

router.use('/', viewsRoutes)

router.use('/comment', commentRoutes)

module.exports = router;