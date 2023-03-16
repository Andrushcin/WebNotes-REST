const Router = require('express').Router;
const controller = require('./../controllers/notesController')
const router = new Router();
const authMiddleware = require('./../middleware/authMiddleware')
const roleMiddleware = require('./../middleware/roleMiddleware')

router.get('/', controller.getAll)
//router.post('/new', controller.login)
//router.post('/:id/edit', controller.login)
//router.get('/:id/delete', controller.activate)


//router.get('/test', controller.test)

module.exports = router
