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

function queryWithRetry(sql, params, callback) {
    pool.query(sql, params, (err, result) => {
        if (err && err.message && err.message.includes('closed state')) {
            console.warn('Stale MySQL connection detected, retrying once...')

            pool.getConnection((connErr, connection) => {
                if (connErr) return callback(connErr)

                connection.query(sql, params, (retryErr, retryResult) => {
                    connection.destroy()
                    callback(retryErr, retryResult)
                })
            })

            return
        }

        callback(err, result)
    })
}

module.exports = {
    query: queryWithRetry
}