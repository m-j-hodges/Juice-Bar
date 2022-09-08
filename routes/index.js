const router = require('express').Router();

const userRoutes = require('./user-routes/user-routes')

const viewsRoutes = require('./views-routes/views-routes')

router.use('/user', userRoutes);

router.use('/', viewsRoutes)

module.exports = router;