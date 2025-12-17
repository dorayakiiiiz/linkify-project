import { Router } from "express";
import analyticController from "../controllers/AnalyticController.mjs";
import authMiddleware from "../middleware/AuthMiddleware.mjs";

const router = Router();

// Route tracking (Public - ai cũng gọi được khi xem profile)
router.post('/track', analyticController.trackEvent);

// Route xem dashboard (Private - chỉ chủ profile xem được)
router.get('/dashboard', authMiddleware, analyticController.getDashboardStats);

export default router;