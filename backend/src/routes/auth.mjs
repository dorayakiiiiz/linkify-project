import { Router } from "express";
import passport from "passport";
import '../strategies/google-strategy.mjs'
import '../strategies/facebook-strategy.mjs'
import authController from "../controllers/AuthController.mjs";
import { authLimiter } from "../middleware/RateLimitMiddleware.mjs";

const router = Router();

// Auth bằng pass (rate limiter chống tấn công dò mật khẩu brute-force)
router.post('/login', authLimiter, authController.login);
router.post('/register', authLimiter, authController.register);

// reset password
router.post('/forgot-password', authLimiter, authController.forgotPassword);
router.post('/reset-password', authLimiter, authController.resetPassword);

// Auth bằng google
router.get('/google',
    passport.authenticate('google', {
        session: false // Tắt session để dùng JWT
    })
);
router.get('/google/redirect',
    passport.authenticate('google', { session: false }),
    authController.google
);

// Auth bằng facebook
router.get('/facebook',
    passport.authenticate('facebook', {
        session: false, // Tắt session để dùng JWT
    })
);
router.get('/facebook/redirect',
    passport.authenticate('facebook', { session: false, failureRedirect: '/login' }), // BỎ scope khỏi đây
    authController.facebook
);
export default router;