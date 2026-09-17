import { useEffect, useState } from "react";
import { useProfile } from "../../context/ProfileContext";
import { analyticService } from "../../services/analyticService";
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

export default function InsightsPage() {
    const { profile } = useProfile();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (profile?._id) {
                try {
                    setLoading(true);
                    const data = await analyticService.getDashboardStats(profile._id);
                    setStats(data);
                } catch (error) {
                    console.error("Failed to fetch insights", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchStats();
    }, [profile?._id]);

    if (loading) return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
    );

    if (!stats) return <div className="p-10 text-center">No data available.</div>;

    // Xử lý dữ liệu biểu đồ (Merge View và Click theo ngày cho Recharts)
    const processChartData = () => {
        const days = [];
        const today = new Date();
        // Tạo mảng 7 ngày gần nhất
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            days.push(d.toISOString().split('T')[0]);
        }

        return days.map(date => {
            const viewData = stats.chartData.find(d => d._id.date === date && d._id.type === 'view');
            const linkClickData = stats.chartData.find(d => d._id.date === date && d._id.type === 'link_click');
            const shopClickData = stats.chartData.find(d => d._id.date === date && d._id.type === 'shop_click');
            
            // Tổng click = link + shop
            const totalClick = (linkClickData ? linkClickData.count : 0) + (shopClickData ? shopClickData.count : 0);

            return {
                name: date.slice(5), // Lấy MM-DD
                Views: viewData ? viewData.count : 0,
                Clicks: totalClick
            };
        });
    };

    const chartData = processChartData();
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="w-full px-4 lg:px-10 py-8 pb-20 max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3 mb-8 text-2xl font-bold text-gray-800">
                Last 7 days
            </div>

            {/* 1. OVERVIEW CARDS */}
            <div className="grid grid-cols-3 gap-2 md:gap-6 lg:gap-10 mb-8">
                <div className="bg-white rounded-2xl p-3 md:p-6 flex flex-col items-center md:items-start">
                    <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-4 w-full">
                        <div className="text-gray-500 font-medium text-center">Total <br className="md:hidden"/> Views</div>
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                            <i className="fa-regular fa-eye"></i>
                        </div>
                    </div>
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">{stats.overview.views}</div>
                </div>

                <div className="bg-white rounded-2xl p-3 md:p-6 flex flex-col items-center md:items-start">
                    <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-4 w-full">
                        <div className="text-gray-500 font-medium text-center">Total <br className="md:hidden"/> Clicks</div>
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                            <i className="fa-solid fa-arrow-pointer"></i>
                        </div>
                    </div>
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">{stats.overview.clicks}</div>
                </div>

                <div className="bg-white rounded-2xl p-3 md:p-6 flex flex-col items-center md:items-start">
                    <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-4 w-full">
                        <div className="text-gray-500 font-medium text-center">Click <br className="md:hidden"/> Rate</div>
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                            <i className="fa-solid fa-percent"></i>
                        </div>
                    </div>
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">{stats.overview.ctr}%</div>
                </div>
            </div>

            {/* 2. MAIN CHART */}
            <div className="bg-white p-6 rounded-2xl mb-8">
                <h2 className="text-lg font-bold mb-6 text-gray-800">Activity Growth</h2>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                            <CartesianGrid vertical={false} stroke="#f3f4f6" />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area type="monotone" dataKey="Views" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                            <Area type="monotone" dataKey="Clicks" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 3. TOP LINKS */}
                <div className="bg-white p-6 rounded-2xl">
                    <h2 className="text-lg font-bold mb-4 text-gray-800">Top Links</h2>
                    <div className="space-y-4">
                        {stats.topLinks.length === 0 ? <div className="text-gray-400 text-sm italic">No clicks yet.</div> : 
                            stats.topLinks.map((link, i) => (
                                <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0 font-bold">
                                            {i + 1}
                                        </div>
                                        <div className="truncate">
                                            <div className="font-semibold text-sm truncate text-gray-800">{link.title}</div>
                                            <div className="text-xs text-gray-400 truncate">{link.url}</div>
                                        </div>
                                    </div>
                                    <div className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg text-sm">
                                        {link.clickCount}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* 4. TOP PRODUCTS */}
                <div className="bg-white p-6 rounded-2xl">
                    <h2 className="text-lg font-bold mb-4 text-gray-800">Top Products</h2>
                    <div className="space-y-4">
                        {stats.topProducts.length === 0 ? <div className="text-gray-400 text-sm italic">No product clicks yet.</div> : 
                            stats.topProducts.map((prod, i) => (
                                <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <img src={prod.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                                        <div className="truncate">
                                            <div className="font-semibold text-sm truncate text-gray-800">{prod.name}</div>
                                            <div className="text-xs text-gray-400 truncate">Shop Item</div>
                                        </div>
                                    </div>
                                    <div className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg text-sm">
                                        {prod.clickCount}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* 5. DEVICES & REFERRERS */}
                <div className="bg-white p-6 rounded-2xl">
                    <h2 className="text-lg font-bold mb-4 text-gray-800">Devices</h2>
                    <div className="h-[200px] w-full flex items-center justify-center">
                        {stats.deviceStats.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats.deviceStats}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="count"
                                        nameKey="_id"
                                    >
                                        {stats.deviceStats.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-gray-400 text-sm italic">No data available</div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl">
                    <h2 className="text-lg font-bold mb-4 text-gray-800">Traffic Sources</h2>
                    <div className="space-y-3">
                        {stats.referrerStats.map((r, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <i className={`fa-brands ${
                                        r._id.toLowerCase().includes('facebook') ? 'fa-facebook text-blue-600' :
                                        r._id.toLowerCase().includes('instagram') ? 'fa-instagram text-pink-600' :
                                        r._id.toLowerCase().includes('tiktok') ? 'fa-tiktok text-black' :
                                        r._id.toLowerCase().includes('youtube') ? 'fa-youtube text-red-600' :
                                        'fa-chrome text-gray-400'
                                    }`}></i>
                                    <span className="capitalize">{r._id}</span>
                                </div>
                                <div className="font-bold text-gray-800">{r.count}</div>
                            </div>
                        ))}
                        {stats.referrerStats.length === 0 && <div className="text-gray-400 text-sm italic">No traffic data yet.</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}