const jwt = require("jsonwebtoken");
const AppError = require("./AppError");

// Tạo access token sau khi đăng nhập thành công.
const signAccessToken = (payload) => {
    if (!process.env.JWT_SECRET) {
        throw new AppError("JWT secret is not configured", 500, "JWT_SECRET_MISSING");
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });
};

// Kiểm tra access token cho các API cần đăng nhập.
const verifyAccessToken = (token) => {
    if (!process.env.JWT_SECRET) {
        throw new AppError("JWT secret is not configured", 500, "JWT_SECRET_MISSING");
    }

    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    signAccessToken,
    verifyAccessToken,
};

