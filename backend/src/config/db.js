const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'vrks_user',
    password: process.env.DB_PASSWORD || '123',
    database: process.env.DB_NAME || 'web_platform'
})

module.exports = connection;