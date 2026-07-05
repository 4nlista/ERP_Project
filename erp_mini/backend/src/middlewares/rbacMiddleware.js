const AppError = require("../utils/AppError");

// Middleware kiểm tra role code của user có nằm trong danh sách được phép không.
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError("Authentication is required", 401, "AUTHENTICATION_REQUIRED"));
        }

        if (!allowedRoles.includes(req.user.roleCode)) {
            return next(new AppError("Permission denied", 403, "FORBIDDEN"));
        }

        return next();
    };
};

module.exports = {
    authorizeRoles,
};

