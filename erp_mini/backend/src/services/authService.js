const accountRepository = require("../repositories/accountRepository");
const Account = require("../models/Account");
const Role = require("../models/Role");
const { comparePassword } = require("../utils/password");
const { signAccessToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");

const MAX_FAILED_LOGIN_ATTEMPTS = Number(process.env.MAX_FAILED_LOGIN_ATTEMPTS) || 5;
const LOGIN_LOCK_MINUTES = Number(process.env.LOGIN_LOCK_MINUTES) || 1;

// Tính số giây còn lại trước khi tài khoản được mở khóa.
const getLockRemainingSeconds = (lockedUntil) => {
    const diffMs = new Date(lockedUntil).getTime() - Date.now();
    return Math.max(Math.ceil(diffMs / 1000), 0);
};

// Tạo lỗi riêng cho trường hợp tài khoản đang bị khóa tạm thời.
const createLockedError = (lockedUntil) => {
    return new AppError("Account is temporarily locked", 403, "ACCOUNT_TEMPORARILY_LOCKED", {
        lockedUntil,
        remainingSeconds: getLockRemainingSeconds(lockedUntil),
    });
};

// Tạo lỗi chung cho email hoặc mật khẩu sai, không tiết lộ sai phần nào.
const createInvalidCredentialError = (remainingAttempts = null) => {
    const errors = remainingAttempts === null ? null : { remainingAttempts };
    return new AppError("Email or password is incorrect", 401, "INVALID_CREDENTIALS", errors);
};

// Nếu tài khoản đang LOCKED nhưng locked_until đã qua thì tự mở khóa.
const normalizeAccountAfterExpiredLock = async (account) => {
    if (account.accountStatus !== Account.status.LOCKED || !account.lockedUntil) {
        return account;
    }

    if (new Date(account.lockedUntil).getTime() > Date.now()) {
        throw createLockedError(account.lockedUntil);
    }

    await accountRepository.unlockAccount(account.accountId);

    return {
        ...account,
        accountStatus: Account.status.ACTIVE,
        failedLoginCount: 0,
        lockedUntil: null,
    };
};

// Xử lý khi nhập sai mật khẩu: tăng count, đủ 5 lần thì khóa 1 phút.
const handleFailedLogin = async (account) => {
    const failedLoginCount = Number(account.failedLoginCount || 0) + 1;

    if (failedLoginCount >= MAX_FAILED_LOGIN_ATTEMPTS) {
        const lockedUntil = new Date(Date.now() + LOGIN_LOCK_MINUTES * 60 * 1000);
        await accountRepository.lockAccount(account.accountId, failedLoginCount, lockedUntil);
        throw createLockedError(lockedUntil);
    }

    await accountRepository.increaseFailedLoginCount(account.accountId, failedLoginCount);

    throw createInvalidCredentialError(MAX_FAILED_LOGIN_ATTEMPTS - failedLoginCount);
};

// Business logic chính của luồng đăng nhập.
const login = async ({ email, password }) => {
    // Tìm account theo email trong bảng accounts, join users và roles.
    let account = await accountRepository.findLoginAccountByEmail(email);

    if (!account) {
        throw createInvalidCredentialError();
    }

    account = await normalizeAccountAfterExpiredLock(account);

    if (account.accountStatus === Account.status.LOCKED) {
        throw createLockedError(account.lockedUntil);
    }

    if (account.accountStatus === Account.status.INACTIVE) {
        throw new AppError("Account is inactive", 403, "ACCOUNT_INACTIVE");
    }

    if (!account.roleCode || account.roleStatus !== Role.status.ACTIVE) {
        throw new AppError("Account role is not active or not configured", 403, "ROLE_NOT_AVAILABLE");
    }

    // So sánh mật khẩu người dùng nhập với password_hash bằng bcrypt.
    const isPasswordValid = await comparePassword(password, account.passwordHash);

    if (!isPasswordValid) {
        await handleFailedLogin(account);
    }

    await accountRepository.markLoginSuccess(account.accountId);

    // Payload này sẽ được lưu trong JWT để các middleware đọc lại req.user.
    const tokenPayload = {
        accountId: account.accountId,
        userId: account.userId,
        email: account.email,
        roleId: account.roleId,
        roleCode: account.roleCode,
    };

    const accessToken = signAccessToken(tokenPayload);

    return {
        accessToken,
        account: {
            id: account.accountId,
            email: account.email,
            status: Account.status.ACTIVE,
        },
        user: {
            id: account.userId,
            fullName: account.fullName,
            phone: account.phone,
            address: account.address,
            gender: account.gender,
            dateOfBirth: account.dateOfBirth,
            avatarUrl: account.avatarUrl,
            employeeCode: account.employeeCode,
            department: account.department,
            managerId: account.managerId,
            hireDate: account.hireDate,
            position: account.position,
        },
        role: {
            id: account.roleId,
            code: account.roleCode,
            name: account.roleName,
        },
    };
};

module.exports = {
    login,
};

