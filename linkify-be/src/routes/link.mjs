import { Router } from "express";
import linkController from "../controllers/LinkController.mjs";
import authMiddleware from "../middleware/AuthMiddleware.mjs";

const router = Router();

router.use(authMiddleware);

router.get('/:profileId', linkController.getLinksByProfileId);

router.post('/', linkController.addLink);

router.patch('/:linkId', linkController.updateLink);

router.put('/reorder', linkController.reorderLinks);

// soft delete
router.delete('/:linkId', linkController.deleteLink);

router.get('/:profileId/trash', linkController.getTrashLinks);

router.patch('/:linkId/restore', linkController.restoreLink);

// hard delete
router.delete('/:linkId/permanent', linkController.hardDeleteLink);

export default router;

