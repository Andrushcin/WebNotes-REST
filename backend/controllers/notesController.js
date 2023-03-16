const User = require('./../dbManage/user')

class notesController {
    async getAll(req, res, next) {
        try {
            return res.json({notes: "Ваши заметки"})
        } catch (e) {
            //console.log(e)
            return res.json({status: "error"})
        }
    }
}

module.exports = new notesController;