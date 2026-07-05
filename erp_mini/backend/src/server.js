// Đọc biến môi trường từ backend/.env
require("dotenv").config({ override: true });
console.log("ENV PORT =", process.env.PORT);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const {
    databaseConnection,
} = require("./config/database");

const app = express();
const PORT = Number(process.env.PORT) || 8686;

// Cho phép frontend gọi API và gửi cookie
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// Đọc dữ liệu JSON và dữ liệu từ form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Đọc cookie từ request
app.use(cookieParser());

// API kiểm tra server
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ERP backend is running",
    });
});

// Chỉ chạy server khi kết nối database thành công
const startServer = async () => {
    try {
        await databaseConnection();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();