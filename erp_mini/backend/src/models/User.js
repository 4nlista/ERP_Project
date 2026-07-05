// Model mô tả bảng users trong file ERP_Project_Demo.sql.
// Luồng login cần bảng này để trả thông tin nhân viên sau khi đăng nhập thành công.

const USER_GENDER = Object.freeze({
    MALE: "MALE",
    FEMALE: "FEMALE",
});

const USER_DEPARTMENT = Object.freeze({
    INVENTORY: "INVENTORY",
    MANAGEMENT: "MANAGEMENT",
    ADMIN: "ADMIN",
    SALES: "SALES",
    PURCHASE: "PURCHASE",
});

const User = {
    tableName: "users",

    // Khai báo tên cột và kiểu dữ liệu đúng theo ERP_Project_Demo.sql.
    fields: {
        id: { column: "id", type: "BIGINT", primaryKey: true, autoIncrement: true },
        fullName: { column: "full_name", type: "VARCHAR(255)", unique: true, nullable: false },
        phone: { column: "phone", type: "VARCHAR(255)", unique: true, nullable: false },
        address: { column: "address", type: "VARCHAR(255)", nullable: true },
        gender: {
            column: "gender",
            type: "ENUM",
            values: Object.values(USER_GENDER),
            nullable: true,
        },
        dateOfBirth: { column: "date_of_birth", type: "DATE", nullable: true },
        avatarUrl: { column: "avatar_url", type: "VARCHAR(255)", nullable: true },
        createdAt: { column: "created_at", type: "DATETIME", nullable: false },
        updatedAt: { column: "updated_at", type: "DATETIME", nullable: true },
        employeeCode: { column: "employee_code", type: "VARCHAR(255)", nullable: false },
        department: {
            column: "department",
            type: "ENUM",
            values: Object.values(USER_DEPARTMENT),
            nullable: false,
        },
        managerId: { column: "manager_id", type: "BIGINT", unique: true, nullable: false },
        hireDate: { column: "hire_date", type: "DATE", nullable: true },
        position: { column: "position", type: "VARCHAR(255)", nullable: true },
    },

    gender: USER_GENDER,
    department: USER_DEPARTMENT,
};

module.exports = User;
