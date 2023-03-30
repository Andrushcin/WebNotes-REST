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
            (id text, email text, password text, activationLink text, anonymous integer, isActivated integer)
    `
    db.run(sqlUsers);

    let sqlTokens = `
    CREATE TABLE IF NOT EXISTS tokens
            (id integer primary key, userId integer, refreshToken text)
    `
    db.run(sqlTokens)

    let sqlNotes = `
    CREATE TABLE IF NOT EXISTS notes
            (id integer primary key, userId integer, name text, body text, fav integer, deleted integer, dateUpdate text, dateCreate text)
    `
    db.run(sqlNotes)
})

module.exports = db