const { verifyAccessToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");

// Middleware xác thực JWT từ header Authorization: Bearer <token>.
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            throw new AppError("Access token is required", 401, "ACCESS_TOKEN_REQUIRED");
        }

        // Lưu payload token vào req.user để controller/service có thể dùng.
        req.user = verifyAccessToken(token);
        return next();
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return next(new AppError("Access token is invalid or expired", 401, "INVALID_ACCESS_TOKEN"));
        }

        return next(error);
    }
};

module.exports = {
    authenticate,
};

