import { Router } from 'express';
import toolController from '../controllers/ToolController.mjs';
import authenticationMiddleware from '../middleware/AuthenticationMiddleware.mjs';
import { aiLimiter } from '../middleware/RateLimitMiddleware.mjs';

const router = Router();

router.use(authenticationMiddleware);

router.post('/post-ideas/hooks', aiLimiter, toolController.getHooks);
router.post('/post-ideas/content', aiLimiter, toolController.getContent);

export default router;