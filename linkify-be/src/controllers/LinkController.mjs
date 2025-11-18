import Link from "../models/Link.mjs";

class LinkController {
    // [POST] api/links/add-link
    async createLink(req, res, next) {
        try {
            const { links } = req.body;
            const linksToCreate = links.map((link, index) => ({
                ...link,
                order: index
            }))

            await Link.insertMany(linksToCreate);

            res.status(201).json({ message: 'Create links successfully' });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


    //[DELETE] api/links/delete-link


    //[PATCH] api/links/update-link

}

export default new LinkController();

