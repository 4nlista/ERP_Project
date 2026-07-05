const authService = require("../services/authService");

// Controller chỉ nhận request, gọi service và trả response cho client.
const login = async (req, res, next) => {
    try {
        // Dữ liệu đã được validate ở authValidator trước khi vào controller.
        const result = await authService.login({
            email: req.body.email,
            password: req.body.password,
        });

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            data: result,
        });
    } catch (error) {
        // Chuyển lỗi sang errorMiddleware để trả response lỗi thống nhất.
        return next(error);
    }
};

module.exports = {
    login,
};

