// Model mô tả bảng roles trong file ERP_Project_Demo.sql.
// Các role code bên dưới là danh sách role nghiệp vụ bạn yêu cầu cho luồng đăng nhập.

const ROLE_STATUS = Object.freeze({
    // Role đang hoạt động.
    ACTIVE: "ACTIVE",

    // Role bị tắt, tài khoản thuộc role này không nên được đăng nhập vào hệ thống.
    INACTIVE: "INACTIVE",

    // Role bị khó
    LOCKED: "LOCKED",
});

const ROLE_CODE = Object.freeze({
    ADMIN: "ADMIN",
    GENERAL_MANAGER: "GENERAL_MANAGER",
    PURCHASE_MANAGER: "PURCHASE_MANAGER",
    PURCHASE_STAFF: "PURCHASE_STAFF",
    INVENTORY_MANAGER: "INVENTORY_MANAGER",
    INVENTORY_STAFF: "INVENTORY_STAFF",
    SALES_MANAGER: "SALES_MANAGER",
    SALES_STAFF: "SALES_STAFF",
    ACCOUNTANT: "ACCOUNTANT",
});

const Role = {
    tableName: "roles",

    // Khai báo tên cột và kiểu dữ liệu đúng theo ERP_Project_Demo.sql.
    fields: {
        id: { column: "id", type: "BIGINT", primaryKey: true, autoIncrement: true },
        code: { column: "code", type: "VARCHAR(255)", unique: true, nullable: false },
        name: { column: "name", type: "VARCHAR(255)", nullable: false },
        description: { column: "description", type: "VARCHAR(255)", nullable: true },
        status: {
            column: "status",
            type: "ENUM",
            values: Object.values(ROLE_STATUS),
            nullable: false,
        },
        createdAt: { column: "created_at", type: "DATETIME", nullable: false },
        updatedAt: { column: "updated_at", type: "DATETIME", nullable: true },
    },

    status: ROLE_STATUS,
    code: ROLE_CODE,
};

module.exports = Role;
