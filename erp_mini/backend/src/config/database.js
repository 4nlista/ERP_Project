const mysql = require("mysql2/promise");

// Tạo pool để tái sử dụng nhiều kết nối MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Kiểm tra kết nối khi khởi động server
const databaseConnection = async () => {
    const connection = await pool.getConnection();

    try {
        await connection.ping();
        console.log("Database kết nối thành công!");
    } finally {
        // Luôn trả connection về pool
        connection.release();
    }
};

module.exports = {
    pool,
    databaseConnection,
};