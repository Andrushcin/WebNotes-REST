const db = require('./db')

class Token {
    constructor(userId, refreshToken, id=null) {
        this.userId = userId;
        this.refreshToken = refreshToken;
        this._id = id;
    }
    
    async create() {
        let sql = `INSERT INTO tokens(userId, refreshToken)
            VALUES(?, ?)`
        const createToken = () => { 
            let promise = new Promise((resolve, reject) => {
                db.run(sql, [this.userId, this.refreshToken], (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
            return promise
        }

        let promise = new Promise((resolve, reject) => {
            createToken()
                .then(() => {
                    resolve(Token.find("userId", this.userId))
                })
                .catch((err) => {
                    reject(err)})
        });

        return promise
    }

    static async find(field="", value="") {
        let allowedFields = ["id", "userId", "activationLink"]

        if (!allowedFields.some((elem) => elem == field)) {
            throw new Error(`Недопустимый тип поля field: "${field}". Разрешённые типы: ${allowedFields}`)
        }

        const getRow = () => {
            let promise = new Promise((resolve, reject) => {

                db.all(`SELECT * FROM tokens WHERE ${field} = ?`, value, (err, row) => {
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
                        let u = new Token(row[0].userId, row[0].refreshToken, row[0]._id)
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

            db.all(`DELETE FROM tokens WHERE userId = ?`, this.userId, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(`Удалён токен пользователя с id = ${this.userId}`);
            });
        });
        return promise
    }

    async update(field, value) {
        let allowedFields = ["userId", "refreshToken"]

        if (!allowedFields.some((elem) => elem == field)) {
            throw new Error(`Недопустимый тип поля field: "${field}". Разрешённые типы: ${allowedFields}`)
        }
        const updateToken = () => {
            let promise = new Promise((resolve, reject) => {
                db.run(`UPDATE tokens 
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
            updateToken()
                .then(() => {
                    resolve(Token.find("id", this._id))
                })
                .catch((err) => {
                    reject(err)})
        });

        return promise
    }

}

module.exports = Token;