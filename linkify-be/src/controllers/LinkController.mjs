import Link from "../models/Link.mjs";

class LinkController {
    // [GET] /api/links/:profileId
    async getLinksByProfileId(req, res, next) {
        try {
            const { profileId } = req.params;

            const links = await Link.find({ profileId }).sort({ order: 1 });
            res.status(200).json({ links });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [POST] api/links
    async addLink(req, res, next) {
        try {
            const { title, url, profileId, scheduledEnable, scheduledDisable } = req.body;
            const lastLink = await Link.findOne({ profileId }).sort({ order: -1 });
            const newOrder = lastLink ? lastLink.order + 1 : 0;

            const newLink = await Link.create({
                profileId,
                title,
                url,
                order: newOrder,
                scheduledEnable,
                scheduledDisable
            })

            res.status(201).json({ message: 'Create link successfully', link: newLink });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    //[PATCH] api/links/:linkId
    async updateLink(req, res, next) {
        try {
            const { linkId } = req.params;
            const updates = req.body;
            const updatedLink = await Link.findByIdAndUpdate(linkId, updates, { new: true });

            res.status(200).json({ message: 'Link updated', link: updatedLink });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [PUT] api/links/reorder (do thay đổi all document -> put, nếu thay đổi 1 -> patch)
    async reorderLinks(req, res, next) {
        try {
            const { links } = req.body;

            if (!links || !Array.isArray(links))
                return res.status(400).json({ error: 'Invalid data' });

            // bulkwrite update nhiều dòng cùng lúc -> tối ưu hóa hiệu năng
            const bulkOps = links.map((link) => ({
                updateOne: {
                    filter: { _id: link._id},
                    update: { order: link.order }
                }
            }));

            await Link.bulkWrite(bulkOps);

            res.status(200).json({ message: 'Links reorder successfully' })


        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    //[DELETE] api/links/:linkId
    async deleteLink(req, res, next) {
        try {
            const { linkId } = req.params;
            await Link.findByIdAndDelete(linkId);
            res.status(200).json({ message: 'Link deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new LinkController();

// Full CRUD API: Create (auto-order), Read (sorted), Update, Delete, Reorder (bulkWrite optimization)
// Supports scheduling: scheduledEnable/scheduledDisable for auto show/hide links

