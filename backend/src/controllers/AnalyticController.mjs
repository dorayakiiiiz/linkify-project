import Analytic from "../models/Analytic.mjs";
import Link from "../models/Link.mjs";
import Product from "../models/Product.mjs";
import Profile from "../models/Profile.mjs";
import { enqueueAnalyticsEvent } from "../utils/analyticsQueue.mjs";

// Helper đơn giản để detect device từ User-Agent
const getDeviceType = (userAgent) => {
    if (!userAgent) return 'unknown';
    if (/mobile/i.test(userAgent)) return 'mobile';
    if (/ipad|tablet/i.test(userAgent)) return 'tablet';
    return 'desktop';
};

// Helper đơn giản để lấy referrer domain
const getReferrerSource = (referrerUrl) => {
    if (!referrerUrl) return 'Direct';
    try {
        const url = new URL(referrerUrl);
        let hostname = url.hostname.replace('www.', '');
        if (hostname.includes('instagram')) return 'Instagram';
        if (hostname.includes('facebook')) return 'Facebook';
        if (hostname.includes('tiktok')) return 'TikTok';
        if (hostname.includes('youtube')) return 'YouTube';
        if (hostname.includes('twitter') || hostname.includes('t.co')) return 'X (Twitter)';
        return hostname;
    } catch (e) {
        return 'Direct';
    }
};

class AnalyticController {

    // [POST] /api/analytics/track
    async trackEvent(req, res) {
        try {
            const { profileId, type, targetId, referrer } = req.body;
            
            // Extract request header information
            const userAgent = req.headers['user-agent'];

            const device = getDeviceType(userAgent);
            const referrerSource = getReferrerSource(referrer);

            // Push event to in-memory queue for asynchronous bulk processing
            enqueueAnalyticsEvent({
                profileId,
                type,
                targetId: targetId || null,
                targetModel: type === 'link_click' ? 'Link' : (type === 'shop_click' ? 'Product' : null),
                device,
                referrer: referrerSource,
                createdAt: new Date()
            });

            res.status(200).json({ success: true });
        } catch (err) {
            console.error("Tracking error:", err);
            res.status(200).json({ success: false }); 
        }
    }

     // [GET] /api/analytics/dashboard
    async getDashboardStats(req, res) {
        try {
            const userId = req.user.id;
            // Lấy profileId từ query params (vì user có thể có nhiều profile)
            const { profileId } = req.query;

            // Verify quyền sở hữu profile
            const profile = await Profile.findOne({ _id: profileId, userId });
            if (!profile) 
                return res.status(403).json({ message: "Unauthorized" });

            // Lấy dữ liệu 7 ngày gần nhất
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            sevenDaysAgo.setHours(0, 0, 0, 0);

            // --- 1. OVERVIEW (Tổng quan) ---
            const totalViews = await Analytic.countDocuments({ profileId, type: 'view' });
            const totalClicks = await Analytic.countDocuments({ profileId, type: { $in: ['link_click', 'shop_click'] } });
            const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : 0;

            // --- 2. CHART DATA (Biểu đồ theo 7 ngày gần nhất) ---
            const chartData = await Analytic.aggregate([
                {
                    $match: {
                        profileId: profile._id,
                        createdAt: { $gte: sevenDaysAgo }
                    }
                },
                {
                    $group: {
                        _id: {
                            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                            type: "$type"
                        },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { "_id.date": 1 } }
            ]);

            // --- 3. TOP LINKS & PRODUCTS ---
            // Lấy top 5 link click nhiều nhất
            const topLinks = await Link.find({ profileId, deletedBy: null })
                .sort({ clickCount: -1 })
                .limit(5)
                .select('title url clickCount');

            // Lấy top 5 sản phẩm click nhiều nhất
            const topProducts = await Product.find({ profileId, deletedBy: null })
                .sort({ clickCount: -1 })
                .limit(5)
                .select('name buyLink clickCount imageUrl');

            // --- 4. DEVICES (Thiết bị) ---
            const deviceStats = await Analytic.aggregate([
                { $match: { profileId: profile._id } },
                { $group: { _id: "$device", count: { $sum: 1 } } }
            ]);

            // --- 5. REFERRERS (Nguồn truy cập) ---
            const referrerStats = await Analytic.aggregate([
                { $match: { profileId: profile._id, type: 'view' } },
                { $group: { _id: "$referrer", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 5 }
            ]);

            res.json({
                overview: { views: totalViews, clicks: totalClicks, ctr },
                chartData,
                topLinks,
                topProducts,
                deviceStats,
                referrerStats
            });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

}

export default new AnalyticController();