// Router for Server-Sent Events (SSE) real-time streaming

import express from 'express';
import { addClient } from '../utils/sseManager.mjs';

const router = express.Router();

// [GET] /api/sse/moderation/:profileId - Connect SSE stream for real-time moderation status updates
router.get('/moderation/:profileId', (req, res) => {
    const { profileId } = req.params;
    addClient(profileId, req, res);
});

export default router;
