const Problem = require('./../dbManage/problem')

class examController {
    async getByTicket(req, res) {
        try {
            let ticket = req.params.ticket;
            Problem.getTicket(Number(ticket), (err, rows) => {
            if (err) return next(err)
            res.send(rows)
            })
        } catch (e) {
            console.log(e)
            res.json({status: "error"})
        }
    }
    async getBySubject(req, res) {
        try {
            let subject = req.params.subject;
            Problem.getSubject(subject, (err, rows) => {
                if (err) return next(err)
                res.send(rows)
            })
        } catch (e) {
            console.log(e)
            res.json({status: "error"})
        }
    }
    async getAll(req, res) {
        try {
            Problem.all((err, rows) => {
            if (err) return next(err)
            res.send(rows)
            })
        } catch (e) {
            console.log(e)
            res.json({status: "error"})
        }
    }

}

module.exports = new examController