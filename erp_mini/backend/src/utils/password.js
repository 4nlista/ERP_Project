const bcrypt = require("bcrypt");

// So sánh mật khẩu plain text với password_hash dạng bcrypt trong database.
const comparePassword = async (plainPassword, passwordHash) => {
    return bcrypt.compare(plainPassword, passwordHash);
};

module.exports = {
    comparePassword,
};

