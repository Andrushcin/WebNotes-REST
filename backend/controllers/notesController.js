const User = require('./../dbManage/user')
const Note = require('./../dbManage/note')
const errs = require('../localErrors');
const { ErrorInfo } = require('./../service/errorService');

class notesController {
    async getAll(req, res, next) {
        try {
            let userId = res.userId;
            console.log(userId)
            let notes = await Note.find("userId", userId)
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

            if (res.userId != note[0].userId) {
                throw new errs.NoAccess()
            }
            return res.json({note: note[0]})
        } catch (e) {
            let error = ErrorInfo(e, [errs.NoAccess])
            return res.json({ error: error });
        }
    }

    async create(req, res, next) {
        try {
            console.log(req.body)
            await new Note(res.userId, req.body.name || "", req.body.body || "", req.body.fav || 0, req.body.deleted || 0).create();
            return res.json({success: true})
        } catch (e) {
            let error = ErrorInfo(e, [])
            return res.json({ error: error });
        }
    }

    async update(req, res, next) {
        try {
            let noteId = req.params.id
            let note = await Note.find('id', noteId)
            note = await note[0]
            if (res.userId != note.userId) {
                throw new errs.NoAccess()
            }
            console.log(req.body)

            for (let key in note) {
                if (key in req.body && note[key] != req.body[key]) {
                    await note.update(`${key}`, req.body[key])
                }
            }
            return res.json({success: true})
        } catch (e) {
            let error = ErrorInfo(e, [errs.NoAccess])
            return res.json({ error: error });
        }
    }

    async delete(req, res, next) {
        try {
            let noteId = req.params.id
            let note = await Note.find('id', noteId)
            note = await note[0]
            if (res.userId != note.userId) {
                throw new errs.NoAccess()
            }
            await note.delete()
            return res.json({success: true})
        } catch (e) {
            let error = ErrorInfo(e, [errs.NoAccess])
            return res.json({ error: error });
        }
    }
}

module.exports = new notesController();
