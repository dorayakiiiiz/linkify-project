import Profile from "../models/Profile.mjs";

class ProfileController {
    // [POST] /api/profile/onboarding
    async createProfile(req, res, next) {
        try {
            if (!req.file) 
                return res.status(400).json({ msg: 'Please update an avatar image' });

            const avatarUrl = req.file.path;

            const { username, bio } = req.body;

            const profile = await Profile.create({
                userId: req.user.id,
                username,
                avatarUrl,
                bio 
            });

            res.json({ message: 'Register successfully!' });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new ProfileController();