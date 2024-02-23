const { authController } = require('./controllers/authController');
const { destinationsController } = require('./controllers/destinationsController');

const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({ message: 'Rest Service Operational' })
});

router.use('/auth', authController)
router.use('/destinations', destinationsController)

module.exports = router