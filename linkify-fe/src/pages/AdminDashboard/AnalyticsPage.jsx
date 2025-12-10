import { useEffect, useState } from "react";
import { adminService } from "../../services/adminService";
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend
} from 'recharts';

export default function AnalyticsPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await adminService.getSystemAnalytics();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch admin analytics", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
    );

    if (!stats) return <div className="p-10 text-center">No data available.</div>;

    // Xử lý dữ liệu biểu đồ Traffic (Merge View và Click theo ngày)
    const processTrafficData = () => {
        const days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            days.push(d.toISOString().split('T')[0]);
        }

        return days.map(date => {
            const viewData = stats.trafficStats.find(d => d._id.date === date && d._id.type === 'view');
            const linkClickData = stats.trafficStats.find(d => d._id.date === date && d._id.type === 'link_click');
            const shopClickData = stats.trafficStats.find(d => d._id.date === date && d._id.type === 'shop_click');
            
            const totalClick = (linkClickData ? linkClickData.count : 0) + (shopClickData ? shopClickData.count : 0);

            return {
                name: date.slice(5), // MM-DD
                Views: viewData ? viewData.count : 0,
                Clicks: totalClick
            };
        });
    };

    // Xử lý dữ liệu biểu đồ User Growth
    const processUserGrowthData = () => {
        const days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            days.push(d.toISOString().split('T')[0]);
        }

        return days.map(date => {
            const data = stats.userGrowth.find(d => d._id === date);
            return {
                name: date.slice(5),
                "New Users": data ? data.count : 0
            };
        });
    };

    const trafficData = processTrafficData();
    const userGrowthData = processUserGrowthData();

    return (
        <div className="w-full px-4 lg:px-10 py-8 pb-20 max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <h1 className="text-2xl font-bold text-gray-800">System Overview</h1>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Live Data</span>
            </div>

            {/* 1. OVERVIEW CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-gray-500 font-medium">Total Users</div>
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                            <i className="fa-solid fa-users"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">{stats.counts.users}</div>
                </div>

                <div className="bg-white rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-gray-500 font-medium">Total Profiles</div>
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                            <i className="fa-solid fa-id-card"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">{stats.counts.profiles}</div>
                </div>

                <div className="bg-white rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-gray-500 font-medium">Total Links</div>
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                            <i className="fa-solid fa-link"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">{stats.counts.links}</div>
                </div>

                <div className="bg-white rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-gray-500 font-medium">Total Products</div>
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                            <i className="fa-solid fa-bag-shopping"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">{stats.counts.products}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* 2. TRAFFIC CHART */}
                <div className="bg-white p-6 rounded-2xl">
                    <h2 className="text-lg font-bold mb-6 text-gray-800">System Traffic (7 Days)</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="Views" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                                <Area type="monotone" dataKey="Clicks" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
                                <Legend verticalAlign="top" height={36}/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. USER GROWTH CHART */}
                <div className="bg-white p-6 rounded-2xl">
                    <h2 className="text-lg font-bold mb-6 text-gray-800">New Users (7 Days)</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="New Users" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 4. TOP CREATORS */}
            <div className="bg-white p-6 rounded-2xl">
                <h2 className="text-lg font-bold mb-4 text-gray-800">Top 5 Most Viewed Creators</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-500 border-b border-gray-100">
                                <th className="py-3 font-medium">Rank</th>
                                <th className="py-3 font-medium">Creator</th>
                                <th className="py-3 font-medium text-right">Total Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.topProfiles.map((profile, index) => (
                                <tr key={index} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                            index === 0 ? 'bg-yellow-100 text-yellow-600' : 
                                            index === 1 ? 'bg-gray-100 text-gray-600' : 
                                            index === 2 ? 'bg-orange-100 text-orange-600' : 'text-gray-400'
                                        }`}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={profile.avatarUrl || "https://via.placeholder.com/40"} 
                                                alt={profile.username} 
                                                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                            />
                                            <div>
                                                <div className="font-bold text-gray-800">{profile.username}</div>
                                                <a href={`/${profile.username}`} target="_blank" className="text-xs text-blue-500 hover:underline">
                                                    linkify.com/{profile.username}
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 text-right font-bold text-gray-800">
                                        {profile.views.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            {stats.topProfiles.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="py-8 text-center text-gray-400">No data available yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}