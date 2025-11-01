// xử lí validation ở đây

const validateUsername = (username) => {
    if (!username) return "Vui lòng nhập username.";

    if (username.length < 6) return "Username phải chứa ít nhất 6 kí tự.";

    return null;
}

const validateEmail = (email) => {
    if (!email) return "Vui lòng nhập email.";

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) return "Email không hợp lệ. Vui lòng nhập lại.";

    return null;
}

const validatePassword = (password) => {
    if (!password) return "Vui lòng nhập mật khẩu.";

    if (password.length < 6) return "Mật khẩu phải chứa ít nhất 6 kí tự.";

    return null;
}

export const Validator = {
    validateUsername,
    validateEmail,
    validatePassword
};