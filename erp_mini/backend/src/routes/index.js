const express = require("express");
const authRoutes = require("./authRoutes");

const router = express.Router();

// File này gom các route của backend để server.js chỉ cần mount một lần /api.
router.use("/auth", authRoutes);

module.exports = router;

