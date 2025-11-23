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
            const { title, url, profileId } = req.body;
            const lastLink = await Link.findOne({ profileId }).sort({ order: -1 });
            const newOrder = lastLink ? lastLink.order + 1 : 0;

            const newLink = await Link.create({
                profileId,
                title,
                url,
                order: newOrder
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

