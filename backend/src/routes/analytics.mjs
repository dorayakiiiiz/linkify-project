import { Router } from "express";
import analyticController from "../controllers/AnalyticController.mjs";
import authenticationMiddleware from "../middleware/AuthenticationMiddleware.mjs";
import { trackingLimiter } from "../middleware/RateLimitMiddleware.mjs";

const router = Router();

// Route tracking (Public - ai cũng gọi được khi xem profile, có Rate Limiter chống DDoS click/view spam)
router.post('/track', trackingLimiter, analyticController.trackEvent);

// Route xem dashboard (Private - chỉ chủ profile xem được)
router.get('/dashboard', authenticationMiddleware, analyticController.getDashboardStats);

export default router;