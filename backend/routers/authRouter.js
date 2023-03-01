const Router = require('express').Router;
const controller = require('./../controllers/authController')
const router = new Router();
const authMiddleware = require('./../middleware/authMiddleware')
const roleMiddleware = require('./../middleware/roleMiddleware')

router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.post('/logout', controller.login)
router.get('/activate/:link', controller.activate)
router.get('/refresh', controller.refresh)

router.get('/test', controller.test)

module.exports = router