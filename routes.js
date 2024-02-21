const { authController } = require('./controllers/authController');
const { carsController } = require('./controllers/carsController');

const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({ message: 'Rest Service Operational' })
});

router.use('/auth', authController)
router.use('/cars', carsController)

module.exports = router