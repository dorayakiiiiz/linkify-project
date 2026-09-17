import { Router } from "express";
import shopController from "../controllers/ShopController.mjs";
import authenticationMiddleware from "../middleware/AuthenticationMiddleware.mjs";
// import { shopUpload } from "../config/storage/cloudinary.mjs";
import { shopUpload } from "../config/storage/r2.mjs";

const router = Router();

router.get('/public/:profileId', shopController.getPublicProducts);

router.use(authenticationMiddleware);

router.get('/:profileId', shopController.getProductsByProfile);
router.post('/', shopUpload.single("productImage"), shopController.createProduct);
router.patch('/:itemId', shopUpload.single("productImage"), shopController.updateProduct);
router.put('/reorder', shopController.reorderProducts);
router.delete('/:itemId', shopController.deleteProduct);
router.get('/:profileId/trash', shopController.getTrashProducts);
router.patch('/:itemId/restore', shopController.restoreProduct);
router.delete('/:itemId/permanent', shopController.hardDeleteProduct);


export default router;
