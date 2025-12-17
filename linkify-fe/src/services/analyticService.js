import api from "./api";

const trackEvent = async (data) => {
    // data: { profileId, type, targetId, referrer }
    try {
        // Gọi API track, không cần await kết quả để tránh chặn UI
        api.post('/analytics/track', data);
    } catch (error) {
        console.error("Track event failed", error);
    }
}

const getDashboardStats = async (profileId) => {
    const response = await api.get(`/analytics/dashboard`, {
        params: { profileId } // sẽ thành req.query
    });
    return response.data;
}

export const analyticService = {
    trackEvent,
    getDashboardStats
};