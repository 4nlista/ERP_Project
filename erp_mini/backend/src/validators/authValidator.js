const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Middleware validate body của API login trước khi vào controller.
const validateLogin = (req, res, next) => {
    const errors = {};
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";

    if (!email) {
        errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
        errors.email = "Email format is invalid";
    }

    if (!password) {
        errors.password = "Password is required";
    } else if (!password.trim()) {
        errors.password = "Password cannot be blank";
    }

    if (Object.keys(errors).length > 0) {
        // Trả lỗi 422 khi input không hợp lệ.
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            code: "VALIDATION_ERROR",
            errors,
        });
    }

    // Chuẩn hóa email để truy vấn database ổn định hơn.
    req.body.email = email;
    req.body.password = password;
    return next();
};

module.exports = {
    validateLogin,
};

