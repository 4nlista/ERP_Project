// Middleware cuối cùng để trả lỗi theo format thống nhất của backend.
const errorMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const response = {
        success: false,
        message: error.isOperational ? error.message : "Internal server error",
        code: error.code || "INTERNAL_SERVER_ERROR",
    };

    if (error.errors) {
        response.errors = error.errors;
    }

    return res.status(statusCode).json(response);
};

module.exports = errorMiddleware;

