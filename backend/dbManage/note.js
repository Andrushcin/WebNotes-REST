const db = require('./db')

class Note {
    constructor(userEmail, name, body, fav=false, deleted=false, dateUpdate, dateCreate, id=null) {
        this.userEmail = userEmail;
        this.name = name;
        this.body = body;
        this.fav = fav;
        this.deleted = deleted;
        this.dateUpdate = dateUpdate;
        this.dateCreate = dateCreate;
        this._id = id;
    }
    
    async create() {
        let sql = `INSERT INTO notes(userEmail, name, body, fav, deleted, dateUpdate, dateCreate)
            VALUES(?, ?, ?, ?, ?, ?, ?)`
        const createNote = () => { 
            let promise = new Promise((resolve, reject) => {
                db.run(sql, [this.userEmail, this.name, this.body, this.fav, this.deleted, new Date(), new Date()], (err) => {
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
                    resolve(Note.find("userEmail", this.userEmail))
                })
                .catch((err) => {
                    reject(err)})
        });

        return promise
    }

    static async find(field="", value="") {
        let allowedFields = ["id", "userEmail", "fav", "deleted"]

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
                            let u = new Note(rows[i].userEmail, rows[i].name, rows[i].body, rows[i].fav, rows[i].deleted, rows[i].dateUpdate, rows[i].dateCreate, rows[i].id)
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

            db.all(`DELETE FROM notes WHERE userEmail = ?`, this.userEmail, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(`Удалена заметка "${this.name}"`);
            });
        });
        return promise
    }

    async update(field, value) {
        let allowedFields = ["userEmail", "name", "body", "fav", "deleted"]

        if (!allowedFields.some((elem) => elem == field)) {
            throw new Error(`Недопустимый тип поля field: "${field}". Разрешённые типы: ${allowedFields}`)
        }

        const updateNote = () => {
            let promise = new Promise((resolve, reject) => {
                console.log(field, value)
                let date = new Date()
                db.run(`UPDATE notes 
                        SET ${field} = ?, dateUpdate = ${date}
                        WHERE id = ${this._id};`, value, (err) => {
                    if (err) {
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