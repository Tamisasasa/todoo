const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,    
    port: process.env.MYSQLPORT,
    dateStrings: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
})

pool.on('error', (err) => {
    console.error('MySQL pool error:', err)
})

module.exports = pool