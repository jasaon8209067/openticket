// db.js
require('dotenv').config();
const mysql = require('mysql2/promise'); // 導入 Promise 版本的 mysql2

// 建立連線池 (Connection Pool)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10, // 最大連線數
    queueLimit: 0
});

// 導出連線池供其他檔案使用
module.exports = pool;