const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'todoo',
    dateStrings: true
})

db.connect((err) => {
    if (err) {
        return console.log('MySQL connection failed:', err)
    }
})

module.exports = db ;