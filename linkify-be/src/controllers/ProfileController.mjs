
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


            res.json({ message: 'Register successfully!', profileId: profile._id });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [GET] /api/profile/check-username/:username
    async checkUsername(req, res, next) {
        try {
            const { username } = req.params;

            if (!username) {
                return res.status(400).json({ message: "Vui lòng nhập username " });
            }

            const profile = await Profile.findOne({ username: username.toLowerCase() });

            if (profile) {
                return res.status(200).json({ isAvailable: false });
            } else {
                return res.status(200).json({ isAvailable: true });
            }

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [GET] /api/profile/user/:userId
    async getProfileByUserId(req, res, next) {
        try {
            const { userId } = req.params;
            const profile = await Profile.findOne({ userId });

            res.status(200).json({ profile });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new ProfileController();