import Link from "../models/Link.mjs";
import { enqueueModerationItem } from "../utils/moderationQueue.mjs";
import { getOrSetCache, delCache } from "../utils/cache.mjs";

class LinkController {
    // [GET] /api/links/:profileId
    async getLinksByProfileId(req, res, next) {
        try {
            const { profileId } = req.params;

            const links = await Link.find({
                profileId,
                deletedBy: null,
            }).sort({ order: 1 });

            res.status(200).json({ links });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [GET] /api/links/public/:profileId
    async getPublicLinks(req, res, next) {
        try {
            const { profileId } = req.params;
            const cacheKey = `links:public:${profileId}`;

            const links = await getOrSetCache(cacheKey, async () => {
                return await Link.find({
                    profileId,
                    deletedBy: null,
                    isEnable: true,
                    moderationStatus: 'approved',
                }).sort({ order: 1 }).lean();
            }, 600);

            // Set Cache-Control header for CDN and browser caching for 10 minutes
            res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600, stale-while-revalidate=60');
            res.status(200).json({ links });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [POST] api/links
    async addLink(req, res, next) {
        try {
            const { title, url, profileId, scheduledEnable, scheduledDisable } =
                req.body;
            const lastLink = await Link.findOne({ profileId }).sort({ order: -1 });
            const newOrder = lastLink ? lastLink.order + 1 : 0;

            const newLink = await Link.create({
                profileId,
                title,
                url,
                order: newOrder,
                isEnable: false,
                moderationStatus: 'pending',
                scheduledEnable,
                scheduledDisable,
            });

            // Enqueue task for background AI moderation queue
            enqueueModerationItem({
                id: newLink._id,
                type: 'link',
                title,
                url,
            });

            res
                .status(201)
                .json({ message: "Create link successfully", link: newLink });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    //[PATCH] api/links/:linkId
    async updateLink(req, res, next) {
        try {
            const { linkId } = req.params;
            const updates = { ...req.body };

            // If title or url was changed, re-trigger moderation pending status
            if (updates.title !== undefined || updates.url !== undefined) {
                updates.moderationStatus = 'pending';
                updates.isEnable = false;
            }

            const updatedLink = await Link.findByIdAndUpdate(linkId, updates, {
                new: true,
            });

            if (updates.title !== undefined || updates.url !== undefined) {
                enqueueModerationItem({
                    id: updatedLink._id,
                    type: 'link',
                    title: updatedLink.title,
                    url: updatedLink.url,
                });
            }

            if (updatedLink?.profileId) delCache(`links:public:${updatedLink.profileId}`);

            res.status(200).json({ message: "Link updated", link: updatedLink });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [PUT] api/links/reorder (do thay đổi all document -> put, nếu thay đổi 1 -> patch)
    async reorderLinks(req, res, next) {
        try {
            const { links } = req.body;

            if (!links || !Array.isArray(links))
                return res.status(400).json({ error: "Invalid data" });

            // bulkwrite update nhiều dòng cùng lúc -> tối ưu hóa hiệu năng
            const bulkOps = links.map((link) => ({
                updateOne: {
                    filter: { _id: link._id },
                    update: { order: link.order },
                },
            }));

            await Link.bulkWrite(bulkOps);

            if (links.length > 0) {
                const firstLink = await Link.findById(links[0]._id).select('profileId').lean();
                if (firstLink?.profileId) delCache(`links:public:${firstLink.profileId}`);
            }

            res.status(200).json({ message: "Links reorder successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    //[DELETE] api/links/:linkId (soft delete)
    async deleteLink(req, res, next) {
        try {
            const { linkId } = req.params;

            // soft delete
            const targetLink = await Link.findByIdAndUpdate(linkId, {
                deletedBy: "creator",
                deletedAt: new Date(),
                isEnable: false,
            });

            if (targetLink?.profileId) delCache(`links:public:${targetLink.profileId}`);

            res.status(200).json({ message: "Link deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [GET] api/links/:profileId/trash
    async getTrashLinks(req, res, next) {
        try {
            const { profileId } = req.params;
            const links = await Link.find({
                profileId,
                deletedBy: "creator" || "admin",
            }).sort({ deletedAt: -1 });

            res.status(200).json({ links });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [PATCH] api/links/:linkId/restore
    async restoreLink(req, res, next) {
        try {
            const { linkId } = req.params;
            const link = await Link.findById(linkId);

            if (!link) return res.status(404).json({ message: "Link not found." });

            if (link.moderationStatus === 'flagged' || link.deletedBy === "admin")
                return res
                    .status(403)
                    .json({ message: "Cannot restore flagged or admin-deleted links." });

            link.deletedBy = null;
            link.deletedAt = null;
            link.isEnable = true;
            await link.save();

            if (link.profileId) delCache(`links:public:${link.profileId}`);

            res.status(200).json({ message: "Link restored successfully." });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [DELETE] api/links/:linkId/permanent
    async hardDeleteLink(req, res, next) {
        try {
            const { linkId } = req.params;
            const targetLink = await Link.findByIdAndDelete(linkId);

            if (targetLink?.profileId) delCache(`links:public:${targetLink.profileId}`);

            res.status(200).json({ message: "Link deleted permanently" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new LinkController();