// Custom error giúp service ném lỗi có statusCode và code rõ ràng.
class AppError extends Error {
    constructor(message, statusCode = 500, code = "INTERNAL_SERVER_ERROR", errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.errors = errors;
        this.isOperational = true;
    }
}

module.exports = AppError;

