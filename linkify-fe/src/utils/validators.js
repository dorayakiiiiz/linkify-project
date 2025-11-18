// xử lí validation ở đây

const validateUsername = (username) => {
    if (!username) return "Please input username.";

    if (username.length < 5) return "Username must be at least 5 characters.";

    return null;
}

const validateDisplayName = (displayName) => {
    if (!displayName) return "Please input display name.";

    if (displayName.length < 5) return "Display name must be at least 5 characters.";

    return null;
}

const validateEmail = (email) => {
    if (!email) return "Please input email.";

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) return "Invalid email. Try again.";

    return null;
}

const validatePassword = (password) => {
    if (!password) return "Please input password.";

    if (password.length < 5) return "Password must be at least 5 characters.";

    return null;
}

export const Validator = {
    validateUsername,
    validateDisplayName,
    validateEmail,
    validatePassword
};