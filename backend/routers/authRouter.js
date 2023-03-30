const Router = require('express').Router;
const controller = require('./../controllers/authController')
const router = new Router();
const authMiddleware = require('./../middleware/authMiddleware');

router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.post('/login_anonymous', controller.login_anonymous)
router.get('/logout', authMiddleware(), controller.logout)
router.get('/activate/:link', controller.activate)
router.post('/refresh', controller.refresh)

router.get('/test', controller.test)

module.exports = router