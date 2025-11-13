import Link from "../models/Link.mjs";

class LinkController {
    // [POST] api/links/add-link
    //...
    addLink(req, res, next) {
        const {title, url} = req.body;
        const newLink = new Link({
            title,
            url,
            profileId: req.user.id, // Lấy từ thông tin user đã xác thực
        });
        newLink.save()
    }


    //[DELETE] api/links/delete-link


    //[PATCH] api/links/update-link

}

export default new LinkController();

