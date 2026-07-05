const { pool } = require("../config/database");

// Repository chỉ chứa SQL, không xử lý nghiệp vụ đăng nhập.
const findLoginAccountByEmail = async (email) => {
    // Lấy account kèm thông tin user và role để service kiểm tra trạng thái.
    const [rows] = await pool.execute(
        `
        SELECT
            a.id AS accountId,
            a.user_id AS userId,
            a.email,
            a.password_hash AS passwordHash,
            a.role_id AS roleId,
            a.status AS accountStatus,
            a.failed_login_count AS failedLoginCount,
            a.locked_until AS lockedUntil,
            a.last_login_at AS lastLoginAt,
            u.full_name AS fullName,
            u.phone,
            u.address,
            u.gender,
            u.date_of_birth AS dateOfBirth,
            u.avatar_url AS avatarUrl,
            u.employee_code AS employeeCode,
            u.department,
            u.manager_id AS managerId,
            u.hire_date AS hireDate,
            u.position,
            r.code AS roleCode,
            r.name AS roleName,
            r.status AS roleStatus
        FROM accounts a
        LEFT JOIN users u ON u.id = a.user_id
        LEFT JOIN roles r ON r.id = a.role_id
        WHERE a.email = ?
        LIMIT 1
        `,
        [email]
    );

    return rows[0] || null;
};

const increaseFailedLoginCount = async (accountId, failedLoginCount) => {
    // Tăng số lần đăng nhập sai nhưng chưa khóa tài khoản.
    await pool.execute(
        `
        UPDATE accounts
        SET failed_login_count = ?,
            updated_at = NOW()
        WHERE id = ?
        `,
        [failedLoginCount, accountId]
    );
};

const lockAccount = async (accountId, failedLoginCount, lockedUntil) => {
    // Khóa tài khoản tạm thời bằng status LOCKED và thời điểm mở khóa.
    await pool.execute(
        `
        UPDATE accounts
        SET status = 'LOCKED',
            failed_login_count = ?,
            locked_until = ?,
            updated_at = NOW()
        WHERE id = ?
        `,
        [failedLoginCount, lockedUntil, accountId]
    );
};

const unlockAccount = async (accountId) => {
    // Mở khóa khi locked_until đã hết hạn.
    await pool.execute(
        `
        UPDATE accounts
        SET status = 'ACTIVE',
            failed_login_count = 0,
            locked_until = NULL,
            updated_at = NOW()
        WHERE id = ?
        `,
        [accountId]
    );
};

const markLoginSuccess = async (accountId) => {
    // Đăng nhập thành công thì reset số lần sai và cập nhật last_login_at.
    await pool.execute(
        `
        UPDATE accounts
        SET status = 'ACTIVE',
            failed_login_count = 0,
            locked_until = NULL,
            last_login_at = NOW(),
            updated_at = NOW()
        WHERE id = ?
        `,
        [accountId]
    );
};

module.exports = {
    findLoginAccountByEmail,
    increaseFailedLoginCount,
    lockAccount,
    unlockAccount,
    markLoginSuccess,
};

