import rateLimit from "express-rate-limit";

// Global rate limiter for overall API endpoints (100 requests per 15 minutes per IP)
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // Tối đa 100 request / 15 phút / IP
    standardHeaders: true, // trả về header chuẩn hóa trong response như RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset...
    legacyHeaders: false, // Không trả về header cũ như X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset...
    message: { message: "Too many requests from this IP, please try again after 15 minutes." }
});

// Strict rate limiter for Authentication APIs (Login, Register, Password Reset)
// Max 10 requests per 15 minutes per IP to prevent brute-force attacks
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many login or authentication attempts, please try again after 15 minutes." }
});

// Rate limiter for AI Generation APIs (Max 5 requests per minute per IP to protect AI quota)
export const aiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many AI generation requests, please wait a minute before trying again." }
});

// Rate limiter for Public Analytics Tracking (Max 60 tracking events per minute per IP)
export const trackingLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many tracking events from this IP." }
});
