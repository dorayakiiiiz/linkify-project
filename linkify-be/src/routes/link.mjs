import { Router } from "express";
import linkController from "../controllers/LinkController.mjs";
import authMiddleware from "../middleware/AuthMiddleware.mjs";

const router = Router();

router.get('/:profileId', authMiddleware, linkController.getLinksByProfileId);

router.post('/', authMiddleware, linkController.addLink);

router.patch('/:linkId', authMiddleware, linkController.updateLink);

router.put('/reorder', authMiddleware, linkController.reorderLinks);

router.delete('/:linkId', authMiddleware, linkController.deleteLink);

export default router;

