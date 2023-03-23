const Router = require('express').Router;
const controller = require('./../controllers/notesController')
const router = new Router();
//const authMiddleware = require('./../middleware/authMiddleware')
//const roleMiddleware = require('./../middleware/roleMiddleware')

router.get('/', controller.getAll)
router.get('/:id', controller.get)
router.post('/new', controller.create)
router.post('/:id/edit', controller.update)
router.post('/:id/delete', controller.delete)


//router.get('/test', controller.test)

module.exports = router
