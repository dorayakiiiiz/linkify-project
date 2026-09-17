// Server-Sent Events (SSE) Manager to stream real-time moderation status updates

const clientConnections = new Map();
// key: profileId -> value: set các response (res) 
// lưu set các res để nếu xài nhiều tab thì nhận thông báo ở tất cả các tab

// Register a new SSE client connection for a specific profileId
export const addClient = (profileId, req, res) => {
    if (!profileId) return;

    // Set standard HTTP headers for Server-Sent Events stream
    res.setHeader('Content-Type', 'text/event-stream'); // báo trình duyệt đây là luồng data liên tục
    res.setHeader('Cache-Control', 'no-cache'); // không cache 
    res.setHeader('Connection', 'keep-alive'); // giữ đường truyền luôn mở
    res.flushHeaders(); // gửi header cho client ngay lập tức

    // báo cho client biết đã kết nối thành công
    res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);

    if (!clientConnections.has(profileId)) {
        clientConnections.set(profileId, new Set());
    }
    clientConnections.get(profileId).add(res);

    // tắt kết nối nếu user đóng tab hoặc disconnect
    req.on('close', () => {
        const clientSet = clientConnections.get(profileId);
        if (clientSet) {
            clientSet.delete(res);
            if (clientSet.size === 0) {
                clientConnections.delete(profileId);
            }
        }
    });
};

// Push an SSE event payload to all connected clients matching profileId
export const sendSSEEvent = (profileId, eventData) => {
    if (!profileId || !eventData) return;
    const strProfileId = profileId.toString();

    const clientSet = clientConnections.get(strProfileId);
    if (clientSet && clientSet.size > 0) {
        const payload = `data: ${JSON.stringify(eventData)}\n\n`;
        clientSet.forEach((res) => {
            try {
                res.write(payload);
            } catch (err) {
                console.error(`Failed to push SSE event to profile ${strProfileId}:`, err.message);
            }
        });
    }
};

export default {
    addClient,
    sendSSEEvent
};
