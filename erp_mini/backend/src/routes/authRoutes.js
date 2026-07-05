const express = require("express");
const authController = require("../controllers/authController");
const { validateLogin } = require("../validators/authValidator");

const router = express.Router();

// POST /api/auth/login: đăng nhập bằng email và mật khẩu.
router.post("/login", validateLogin, authController.login);

module.exports = router;

