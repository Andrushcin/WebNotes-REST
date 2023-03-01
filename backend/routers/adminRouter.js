const Router = require('express')
const controller = require('./../controllers/adminController')
const router = new Router

router.post('/deleteuser', controller.delUser)


module.exports = router