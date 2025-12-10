import { Router } from 'express';
import toolController from '../controllers/ToolController.mjs';
import authMiddleware from '../middleware/AuthMiddleware.mjs'

const router = Router();

router.use(authMiddleware);

router.post('/post-ideas/hooks', toolController.getHooks);
router.post('/post-ideas/content', toolController.getContent);

export default router;