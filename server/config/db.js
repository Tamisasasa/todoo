const mysql = require('mysql2')

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    dateStrings: true
})

db.connect((err) => {
    if (err) {
        return console.log('MySQL connection failed:', err)
    }
    console.log('MySQL connected')
})

module.exports = db