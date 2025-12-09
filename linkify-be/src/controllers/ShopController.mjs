import Product from "../models/Product.mjs";
import Profile from "../models/Profile.mjs";
import { checkProductContent } from "../services/moderationService.mjs";

class ShopController {
    // [GET] /api/prod/:profileId - Get all products by profile (public)
    async getProductsByProfile(req, res, next) {
        try {
            const { profileId } = req.params;

            const products = await Product.find({ 
                profileId,
                deletedBy: null
            }).sort({ order: 1 });
            res.status(200).json({ products });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [GET] /api/shop/public/:profileId
    async getPublicProducts(req, res, next) {
        try {
            const { profileId } = req.params;
            const products = await Product.find({ 
                profileId,
                deletedBy: null,
                isEnable: true,
                isFlagged: false
            }).sort({ order: 1 });
            
            res.status(200).json({ products });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [POST] /api/shop - Create new product 
    async createProduct(req, res, next) {
        try {
            const { name, price, buyLink, profileId, scheduledEnable, scheduledDisable } = req.body;
            const lastProduct = await Product.findOne({ profileId }).sort({ order: -1 });
            const newOrder = lastProduct ? lastProduct.order + 1 : 0;

            if (!req.file) 
                return res.status(400).json({ msg: 'Please update a product image' });

            const imageUrl = req.file.path;

            const newProduct = await Product.create({
                profileId,
                name,
                price,
                buyLink,
                imageUrl,
                order: newOrder,
                scheduledEnable,
                scheduledDisable
            });

            checkProductContent(newProduct._id, name, price);

            res.status(201).json({ message: 'Product created successfully', product: newProduct });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [PATCH] /api/shop/:itemId - Update product
    async updateProduct(req, res, next) {
        try {
            const { itemId } = req.params;
            const updates = req.body;

            if (req.file) {
                updates.imageUrl = req.file.path;
            }

            const updatedProduct = await Product.findByIdAndUpdate(itemId, updates, {
                new: true,
            });

            if (updates.name) {
                checkProductContent(updatedProduct._id, updatedProduct.name, updatedProduct.price);
            }

            res.status(200).json({
                message: "Product updated successfully",
                product: updatedProduct,
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [PUT] api/shop/reorder 
    async reorderProducts(req, res, next) {
        try {
            const { products } = req.body;

            if (!products || !Array.isArray(products))
                return res.status(400).json({ error: 'Invalid data' });

            // bulkwrite update nhiều dòng cùng lúc -> tối ưu hóa hiệu năng
            const bulkOps = products.map((product) => ({
                updateOne: {
                    filter: { _id: product._id},
                    update: { order: product.order }
                }
            }));

            await Product.bulkWrite(bulkOps);

            res.status(200).json({ message: 'Products reorder successfully' })


        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [DELETE] /api/shop/:itemId (soft delete)
    async deleteProduct(req, res, next) {
        try {
            const { itemId } = req.params;
            
            await Product.findByIdAndUpdate(itemId, {
                deletedBy: 'creator',
                deletedAt: new Date(),
                isEnable: false
            });

            res.status(200).json({ message: 'Product moved to trash' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [GET] /api/shop/:profileId/trash
    async getTrashProducts(req, res, next) {
        try {
            const { profileId } = req.params;
            const products = await Product.find({ 
                profileId,
                deletedBy: 'creator' || 'admin'
            }).sort({ deletedAt: -1 });
            
            res.status(200).json({ products });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [PATCH] /api/shop/:itemId/restore
    async restoreProduct(req, res, next) {
        try {
            const { itemId } = req.params;
            const product = await Product.findById(itemId);

            if (!product) return res.status(404).json({ message: 'Product not found' });

            if (product.isFlagged || product.deletedBy === 'admin') {
                return res.status(403).json({ message: 'Cannot restore flagged or admin-deleted products.' });
            }

            product.deletedBy = null;
            product.deletedAt = null;
            product.isEnable = true;
            await product.save();

            res.status(200).json({ message: 'Product restored successfully', product });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [DELETE] /api/shop/:itemId/permanent (hard delete)
    async hardDeleteProduct(req, res, next) {
        try {
            const { itemId } = req.params;
            await Product.findByIdAndDelete(itemId);
            res.status(200).json({ message: 'Product deleted permanently' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new ShopController();
