const mysql = require('mysql2')

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,    
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