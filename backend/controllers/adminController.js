const User = require('./../dbManage/user')

class adminController {
    async delUser(req, res) {
        try {
            
        } catch (e) {
            console.log(e)
            res.json({status: "error"})
        }
    }
}

module.exports = new adminController