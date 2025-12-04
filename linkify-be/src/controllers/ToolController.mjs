import { generatePostHooks, generatePostContent } from "../services/aiService.mjs";

class ToolController {
    
    // [POST] /api/tools/post-ideas/hooks
    async getHooks(req, res, next) {
        try {
            const { topic, platform, tone, audience } = req.body;

            if (!topic || !platform)
                return res.status(400).json({ message: 'Topic and platform are required' });

            const result = await generatePostHooks(topic, platform, tone, audience);
            res.json(result);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // [POST] /api/tools/post-ideas/content
    async getContent(req, res, next) {
        try {

            const { topic, platform, tone, hookTitle, hookType } = req.body;

            const result = await generatePostContent(topic, platform, tone, hookTitle, hookType);
            res.json(result);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default new ToolController();