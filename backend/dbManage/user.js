const db = require('./db')

class User {
    constructor(id, email, password, activationLink, anonymous=false, isActivated=false) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.activationLink = activationLink;
        this.anonymous = anonymous;
        this.isActivated = isActivated;
    }
    
    async create() {
        let sql = `INSERT INTO users(id, email, password, activationLink, anonymous, isActivated)
            VALUES(?, ?, ?, ?, ?, ?)`
        const createUser = () => {
            let promise = new Promise((resolve, reject) => {
                db.run(sql, [this.id, this.email, this.password, this.activationLink, this.anonymous, this.isActivated], (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
            return promise
        }

        let promise = new Promise((resolve, reject) => {
            createUser()
                .then(() => {
                    resolve(User.find("id", this.id))
                })
                .catch((err) => {
                    reject(err)})
        });

        return promise
    }

    static async find(field="", value="") {
        let allowedFields = ["id", "email", "activationLink", "anonymous"]

        if (!allowedFields.some((elem) => elem == field)) {
            throw new Error(`Недопустимый тип поля field: "${field}". Разрешённые типы: ${allowedFields}`)
        }

        const getRow = () => {
            let promise = new Promise((resolve, reject) => {

                db.all(`SELECT * FROM users WHERE ${field} = ?`, value, (err, row) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(row);
                });
            });
            return promise
        }

        let promise = new Promise((resolve, reject) => {
            getRow()
                .then((row) => {
                    if (row.length > 0) {
                        let u = new User(row[0].id, row[0].email, row[0].password, row[0].activationLink, row[0].anonymous, row[0].isActivated, row[0].id)
                        resolve(u)
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

            db.all(`DELETE FROM users WHERE id = ?`, this._id, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(`Удалён пользователь с id = ${this._id}`);
            });
        });
        return promise
    }

    async update(field, value) {
        let allowedFields = ["email", "password", "activationLink", "isActivated", "anonymous"]

        if (!allowedFields.some((elem) => elem == field)) {
            throw new Error(`Недопустимый тип поля field: "${field}". Разрешённые типы: ${allowedFields}`)
        }

        const updateUser = () => {
            let promise = new Promise((resolve, reject) => {
                console.log(field, value)
                db.run(`UPDATE users 
                        SET ${field} = ?
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
            updateUser()
                .then(() => {
                    resolve(User.find("id", this._id))
                })
                .catch((err) => {
                    reject(err)})
        });

        return promise
    }

}

module.exports = User