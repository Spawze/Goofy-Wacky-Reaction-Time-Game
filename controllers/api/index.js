// everything past /api
const router = require('express').Router()

const userRoutes = require('./userRoutes')
const scoreRoutes = require('./scoreRoutes')

router.use('/user', userRoutes)
router.use('/score', scoreRoutes)

module.exports = router;