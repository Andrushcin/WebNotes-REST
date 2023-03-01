const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('main.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

db.serialize(() => {
    let sqlUsers = `
    CREATE TABLE IF NOT EXISTS users
            (id integer primary key, email text, password text, activationLink text, isActivated integer)
    `
    db.run(sqlUsers);

    let sqlToken = `
    CREATE TABLE IF NOT EXISTS tokens
            (userEmail text, refreshToken text)
    `
    db.run(sqlToken)
})

module.exports = db