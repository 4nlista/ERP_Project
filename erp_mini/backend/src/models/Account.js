// Model mô tả bảng accounts trong file ERP_Project_Demo.sql.
// Dự án dùng MySQL + mysql2 nên model này không tự tạo bảng, chỉ giúp dùng đúng tên cột và enum.

const ACCOUNT_STATUS = Object.freeze({
    // Tài khoản đang hoạt động, được phép đăng nhập.
    ACTIVE: "ACTIVE",

    // Tài khoản bị vô hiệu hóa, không được phép đăng nhập.
    INACTIVE: "INACTIVE",

    // Tài khoản bị khóa tạm thời do nhập sai mật khẩu nhiều lần.
    LOCKED: "LOCKED",
});

const Account = {
    tableName: "accounts",

    // Khai báo tên cột và kiểu dữ liệu đúng theo ERP_Project_Demo.sql.
    fields: {
        id: { column: "id", type: "BIGINT", primaryKey: true, autoIncrement: true },
        userId: { column: "user_id", type: "BIGINT", unique: true, nullable: false },
        email: { column: "email", type: "VARCHAR(255)", nullable: false },
        passwordHash: { column: "password_hash", type: "VARCHAR(255)", nullable: false },
        roleId: { column: "role_id", type: "BIGINT", nullable: false },
        status: {
            column: "status",
            type: "ENUM",
            values: Object.values(ACCOUNT_STATUS),
            nullable: false,
        },
        failedLoginCount: { column: "failed_login_count", type: "INT", nullable: false },
        lockedUntil: { column: "locked_until", type: "DATETIME", nullable: true },
        lastLoginAt: { column: "last_login_at", type: "DATETIME", nullable: true },
        createdAt: { column: "created_at", type: "DATETIME", nullable: false },
        updatedAt: { column: "updated_at", type: "DATETIME", nullable: false },
    },

    status: ACCOUNT_STATUS,
};

module.exports = Account;
