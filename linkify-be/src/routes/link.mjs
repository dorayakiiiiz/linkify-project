import { Router } from "express";
import linkController from "../controllers/LinkController.mjs";
import authMiddleware from "../middleware/AuthMiddleware.mjs";

const router = Router();

router.use(authMiddleware);

router.get('/:profileId', linkController.getLinksByProfileId);

router.post('/', linkController.addLink);

router.patch('/:linkId', linkController.updateLink);

router.put('/reorder', linkController.reorderLinks);

router.delete('/:linkId', linkController.deleteLink);

export default router;

