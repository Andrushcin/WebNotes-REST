const User = require('./../dbManage/user')
const Note = require('./../dbManage/note')

class notesController {
    async getAll(req, res, next) {
        try {
            let userEmail = res.userEmail;
            let notes = await Note.find("userEmail", userEmail)
            console.log(notes)
            return res.json({notes: notes})
        } catch (e) {
            console.log(e)
            return res.json({error: "Неизвестная ошибка, попробуйте позже"})
        }
    }

    async get(req, res, next) {
        try {
            let noteId = req.params.id
            let note = await Note.find("id", noteId)
            return res.json({note: note[0]})
        } catch (e) {
            console.log(e)
            return res.json({error: "Неизвестная ошибка, попробуйте позже"})
        }
    }

    async create(req, res, next) {
        try {
            console.log(req.body)
            new Note(res.userEmail, req.body.name || "", req.body.body || "", req.body.fav || 0, req.body.deleted || 0).create();
            return res.json({success: true})
        } catch (e) {
            console.log(e)
            return res.json({error: "Неизвестная ошибка, попробуйте позже"})
        }
    }

    async update(req, res, next) {
        try {
            let noteId = req.params.id
            let note = Note.find('id', noteId)

            
            note.update()
        } catch (e) {
            
        }
    }
    async delete(req, res, next) {
        try {

        } catch (e) {
            
        }
    }
}

module.exports = new notesController();
