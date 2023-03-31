const db = require('./db')

class Note {
    constructor(userId, name, body, fav=false, deleted=false, dateUpdate, dateCreate, id=null) {
        this.userId = userId;
        this.name = name;
        this.body = body;
        this.fav = fav;
        this.deleted = deleted;
        this.dateUpdate = dateUpdate;
        this.dateCreate = dateCreate;
        this._id = id;
    }
    
    async create() {
        let sql = `INSERT INTO notes(userId, name, body, fav, deleted, dateUpdate, dateCreate)
            VALUES(?, ?, ?, ?, ?, ?, ?)`
        const createNote = () => { 
            let promise = new Promise((resolve, reject) => {
                let date = new Date()
                db.run(sql, [this.userId, this.name, this.body, this.fav, this.deleted, date.toISOString(), date.toISOString()], (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
            return promise
        }

        let promise = new Promise((resolve, reject) => {
            createNote()
                .then(() => {
                    resolve(Note.find("userId", this.userId))
                })
                .catch((err) => {
                    reject(err)})
        });

        return promise
    }

    static async find(field="", value="") {
        let allowedFields = ["id", "userId", "fav", "deleted"]
        const allowedOrderByParams = ["dateUpdate", "dateCreate"]
        if (!allowedFields.some((elem) => elem == field)) {
            throw new Error(`Недопустимый тип поля field: "${field}". Разрешённые типы: ${allowedFields}`)
        }

        const getRow = () => {
            let promise = new Promise((resolve, reject) => {

                db.all(`SELECT * FROM notes WHERE ${field} = ?`, value, (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                });
            });
            return promise
        }

        let promise = new Promise((resolve, reject) => {
            getRow()
                .then((rows) => {
                    if (rows.length > 0) {
                        let arr = Array();
                        for (let i=0; i < rows.length; i++) {
                            let u = new Note(rows[i].userId, rows[i].name, rows[i].body, rows[i].fav, rows[i].deleted, rows[i].dateUpdate, rows[i].dateCreate, rows[i].id)
                            arr.push(u)
                        }

                        resolve(arr)
                    } else {
                        resolve(null)
                    }
                })
                .catch((err) => {
                    reject(err)})
        });

        return promise
    }

    async delete() {
        let promise = new Promise((resolve, reject) => {

            db.all(`DELETE FROM notes WHERE id = ?`, this._id, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(`Удалена заметка "${this.name}"`);
            });
        });
        return promise
    }

    async update(field, value) {
        let allowedFields = ["userId", "name", "body", "fav", "deleted"]

        if (!allowedFields.some((elem) => elem == field)) {
            throw new Error(`Недопустимый тип поля field: "${field}". Разрешённые типы: ${allowedFields}`)
        }

        const updateNote = () => {
            let promise = new Promise((resolve, reject) => {
                console.log(field, value)
                let date = new Date()
                db.run(`UPDATE notes 
                        SET ${field} = ?, dateUpdate = ?
                        WHERE id = ${this._id};`, [value, date.toISOString()], (err) => {
                    if (err) {
                        console.log(date)
                        reject(err);
                    }
                    resolve();
                });
            });
            return promise
        }

        let promise = new Promise((resolve, reject) => {
            updateNote()
                .then(() => {
                    resolve(Note.find("id", this._id))
                })
                .catch((err) => {
                    reject(err)})
        });

        return promise
    }

}

module.exports = Note