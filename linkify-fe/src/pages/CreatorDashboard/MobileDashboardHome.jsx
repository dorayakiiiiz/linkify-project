import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import InsightsPage from './InsightsPage';
import PostIdeaPage from './Tools/PostIdeaPage';
import LinkShortenerPage from './Tools/LinkShortenerPage';

export default function MobileDashboardHome() {
    const { profile } = useProfile();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home'); // home, insights, post-ideas, shortener

    if (!profile) return null;

    // Fallback avatar nếu không có avatarUrl

    const renderContent = () => {
        switch (activeTab) {
            case 'insights':
                return (
                    <div className="pb-[80px] min-h-full">
                        <InsightsPage />
                    </div>
                );
            case 'post-ideas':
                return (
                    <div className="pb-[80px] min-h-full">
                        <PostIdeaPage />
                    </div>
                );
            case 'shortener':
                return (
                    <div className="pb-[80px] min-h-full">
                        <LinkShortenerPage />
                    </div>
                );
            default:
                return (
                    <div className="pb-[80px]"> {/* Thêm padding bottom để không bị che bởi footer */}
                        {/* Header */}
                        <div className="px-4 pt-6 pb-4 flex flex-col items-center">
                            <div className="w-full flex justify-end gap-4 mb-2">
                                <i className="fa-solid fa-share-nodes text-xl cursor-pointer"></i>
                            </div>
                            
                            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 mb-3">
                                <img 
                                    src={profile.avatarUrl} 
                                    alt="avatar" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-2xl font-bold mb-1">@{profile.username}</h2>
                            <a href={`/${profile.username}`} className="text-gray-500 text-sm mb-4 hover:underline">
                                linkify.com/{profile.username}
                            </a>
                        </div>

                        {/* Tabs */}
                        <div className="flex px-4 gap-2 mb-6 overflow-x-auto no-scrollbar">
                            <button className="px-6 py-2 bg-black text-white rounded-full text-sm font-semibold whitespace-nowrap">
                                Pages
                            </button>
                            <button 
                                onClick={() => navigate('/dashboard/design')}
                                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold whitespace-nowrap"
                            >
                                Design
                            </button>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-2 gap-4 px-4">
                            {/* Links Card */}
                            <div 
                                onClick={() => navigate('/dashboard/links')}
                                className="flex flex-col gap-2 cursor-pointer group"
                            >
                                <div className="aspect-[9/16] bg-[#f3f3f1] rounded-3xl border border-gray-200 relative overflow-hidden group-hover:shadow-lg transition">
                                    {/* Mini preview simulation */}
                                    <div className="absolute inset-4 bg-white rounded-2xl shadow-sm flex flex-col items-center py-4 gap-2 border border-gray-100">
                                        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                                        <div className="w-16 h-2 bg-gray-100 rounded"></div>
                                        <div className="w-full px-2 flex flex-col gap-1.5 mt-2">
                                            <div className="h-6 bg-yellow-50 rounded-lg w-full border border-yellow-100"></div>
                                            <div className="h-6 bg-yellow-50 rounded-lg w-full border border-yellow-100"></div>
                                            <div className="h-6 bg-yellow-50 rounded-lg w-full border border-yellow-100"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-1">
                                    <span className="font-semibold">Links</span>
                                    <i className="fa-solid fa-ellipsis text-gray-400"></i>
                                </div>
                            </div>

                            {/* Shop Card */}
                            <div 
                                onClick={() => navigate('/dashboard/shop')}
                                className="flex flex-col gap-2 cursor-pointer group"
                            >
                                <div className="aspect-[9/16] bg-[#f3f3f1] rounded-3xl border border-gray-200 relative overflow-hidden group-hover:shadow-lg transition flex items-center justify-center">
                                    <div className="text-center p-4">
                                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <i className="fa-solid fa-shop text-2xl text-purple-600"></i>
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium">Curate products you love</p>
                                        <div className="mt-3 px-4 py-1.5 bg-white rounded-full text-xs font-bold shadow-sm">Get started</div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-1">
                                    <span className="font-semibold">Shop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="h-screen bg-white flex flex-col font-quicksand md:hidden overflow-hidden">
            {/* Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto relative">
                {renderContent()}
            </div>

            {/* Footer Menu - Fixed */}
            <div className="h-[60px] bg-white border-t border-gray-200 px-4 flex justify-between items-center shrink-0 z-[100] relative">
                <div 
                    onClick={() => setActiveTab('home')}
                    className={`flex flex-col items-center gap-1 cursor-pointer w-1/4 ${activeTab === 'home' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                >
                    <i className="fa-solid fa-layer-group text-xl"></i>
                    <span className="text-[10px] font-medium">My Linkify</span>
                </div>
                <div 
                    onClick={() => setActiveTab('insights')}
                    className={`flex flex-col items-center gap-1 cursor-pointer w-1/4 ${activeTab === 'insights' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                >
                    <i className="fa-solid fa-chart-simple text-xl"></i>
                    <span className="text-[10px] font-medium">Insights</span>
                </div>
                <div 
                    onClick={() => setActiveTab('post-ideas')}
                    className={`flex flex-col items-center gap-1 cursor-pointer w-1/4 ${activeTab === 'post-ideas' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                >
                    <i className="fa-solid fa-pencil text-xl"></i>
                    <span className="text-[10px] font-medium">Post ideas</span>
                </div>
            </div>
        </div>
    );
}