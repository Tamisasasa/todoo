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

// Known mysql2 pool bug: a pooled connection can be reported "closed" by the
// server (idle timeout, server restart, etc.) without the pool discarding it.
// The community workaround is to retry once by getting a fresh connection.
// https://github.com/sidorares/node-mysql2/issues/1898
function queryWithRetry(sql, params, callback) {
    pool.query(sql, params, (err, result) => {
        if (err && err.message && err.message.includes('closed state')) {
            console.warn('Stale MySQL connection detected, retrying once...')
            pool.getConnection((connErr, connection) => {
                if (connErr) return callback(connErr)
                connection.query(sql, params, (retryErr, retryResult) => {
                    connection.destroy() // force-discard this connection, don't return a bad one to the pool
                    callback(retryErr, retryResult)
                })
            })
            return
        }
        callback(err, result)
    })
}

module.exports = { query: queryWithRetry }