import Product from "../models/Product.mjs";
import Profile from "../models/Profile.mjs";
import { enqueueModerationItem } from "../utils/moderationQueue.mjs";
// import { deleteCloudinaryImage } from "../config/storage/cloudinary.mjs";
import { deleteR2Image } from "../config/storage/r2.mjs";
import { getOrSetCache, delCache } from "../utils/cache.mjs";

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
            const cacheKey = `products:public:${profileId}`;

            const products = await getOrSetCache(cacheKey, async () => {
                return await Product.find({ 
                    profileId,
                    deletedBy: null,
                    isEnable: true,
                    moderationStatus: 'approved'
                }).sort({ order: 1 }).lean();
            }, 600);
            
            // Set Cache-Control header for CDN and browser caching for 10 minutes
            res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600, stale-while-revalidate=60');
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

            // const imageUrl = req.file.path;
            const imageUrl = process.env.S3_PUBLIC_DOMAIN ? `${process.env.S3_PUBLIC_DOMAIN.replace(/\/$/, '')}/${req.file.key}` : req.file.location;

            const newProduct = await Product.create({
                profileId,
                name,
                price,
                buyLink,
                imageUrl,
                order: newOrder,
                isEnable: false,
                moderationStatus: 'pending',
                scheduledEnable,
                scheduledDisable
            });

            enqueueModerationItem({
                id: newProduct._id,
                type: 'product',
                name,
                buyLink,
                price
            });

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
                const oldProduct = await Product.findById(itemId);
                if (oldProduct?.imageUrl) {
                    // await deleteCloudinaryImage(oldProduct.imageUrl);
                    await deleteR2Image(oldProduct.imageUrl);
                }
                // updates.imageUrl = req.file.path;
                updates.imageUrl = process.env.S3_PUBLIC_DOMAIN ? `${process.env.S3_PUBLIC_DOMAIN.replace(/\/$/, '')}/${req.file.key}` : req.file.location;
            }

            if (updates.name !== undefined || updates.buyLink !== undefined) {
                updates.moderationStatus = 'pending';
                updates.isEnable = false;
            }

            const updatedProduct = await Product.findByIdAndUpdate(itemId, updates, {
                new: true,
            });

            if (updates.name !== undefined || updates.buyLink !== undefined) {
                enqueueModerationItem({
                    id: updatedProduct._id,
                    type: 'product',
                    name: updatedProduct.name,
                    buyLink: updatedProduct.buyLink,
                    price: updatedProduct.price
                });
            }

            if (updatedProduct?.profileId) delCache(`products:public:${updatedProduct.profileId}`);

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

            if (products.length > 0) {
                const firstProduct = await Product.findById(products[0]._id).select('profileId').lean();
                if (firstProduct?.profileId) delCache(`products:public:${firstProduct.profileId}`);
            }

            res.status(200).json({ message: 'Products reorder successfully' })

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [DELETE] /api/shop/:itemId (soft delete)
    async deleteProduct(req, res, next) {
        try {
            const { itemId } = req.params;
            
            const targetProduct = await Product.findByIdAndUpdate(itemId, {
                deletedBy: 'creator',
                deletedAt: new Date(),
                isEnable: false
            });

            if (targetProduct?.profileId) delCache(`products:public:${targetProduct.profileId}`);

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

            if (product.moderationStatus === 'flagged' || product.deletedBy === 'admin') {
                return res.status(403).json({ message: 'Cannot restore flagged or admin-deleted products.' });
            }

            product.deletedBy = null;
            product.deletedAt = null;
            product.isEnable = true;
            await product.save();

            if (product.profileId) delCache(`products:public:${product.profileId}`);

            res.status(200).json({ message: 'Product restored successfully', product });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [DELETE] /api/shop/:itemId/permanent (hard delete)
    async hardDeleteProduct(req, res, next) {
        try {
            const { itemId } = req.params;
            const product = await Product.findById(itemId);
            if (product?.imageUrl) {
                // await deleteCloudinaryImage(product.imageUrl);
                await deleteR2Image(product.imageUrl);
            }

            await Product.findByIdAndDelete(itemId);
            if (product?.profileId) delCache(`products:public:${product.profileId}`);

            res.status(200).json({ message: 'Product deleted permanently' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new ShopController();
