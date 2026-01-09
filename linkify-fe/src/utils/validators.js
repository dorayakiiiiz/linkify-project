// xử lí validation ở đây

const validateUsername = (username) => {
    if (!username || username.trim() === "") return "Please input username.";

    if (/\s/.test(username)) return "Username must not contain whitespace.";

    const validRegex = /^[a-zA-Z0-9._]+$/;
    if (!validRegex.test(username)) return "Username must contain only letters, numbers, underscores and periods (no accents).";

    if (username.length < 5) return "Username must be at least 5 characters.";

    return null;
}

const validateDisplayName = (displayName) => {
    if (!displayName || displayName.trim() === "") return "Please input display name.";

    if (displayName.length < 5) return "Display name must be at least 5 characters.";

    return null;
}

const validateEmail = (email) => {
    if (!email || email.trim() === "") return "Please input email.";

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) return "Invalid email. Try again.";

    return null;
}

const validatePassword = (password) => {
    if (!password || password.trim() === "") return "Please input password.";

    if (password.length < 5) return "Password must be at least 5 characters.";

    return null;
}

const validateUrl = (url) => {
    if (!url || url.trim() === "") return "Please input URL.";

    const pattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

    if (!pattern.test(url)) {
        return "Please enter a valid URL (must start with http:// or https://).";
    }

    return null;
}

export const Validator = {
    validateUsername,
    validateDisplayName,
    validateEmail,
    validatePassword,
    validateUrl
};