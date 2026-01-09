import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import InsightsPage from './InsightsPage';
import PostIdeaPage from './Tools/PostIdeaPage';
import UserSettingDropDown from './Modal/UserSettingDropDown';

export default function MobileDashboardHome() {
    const { profile } = useProfile();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home'); // home, insights, post-ideas, shortener

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!profile) return null;

    // Fallback avatar nếu không có avatarUrl

    const renderContent = () => {
        switch (activeTab) {
            case 'insights':
                return (
                    // <div className="pb-[80px] min-h-full">
                    //     <InsightsPage />
                    // </div>
                    <Link to="/dashboard/insights"></Link>
                );
            case 'post-ideas':
                return (
                    <div className="pb-[80px] min-h-full">
                        <PostIdeaPage />
                    </div>
                );
            default:
                return (
                    <div className="pb-[80px]"> {/* Thêm padding bottom để không bị che bởi footer */}
                        {/* Header */}
                        <div className="px-4 pt-6 pb-6 flex flex-col items-center w-full">
                            <div 
                                className="relative mb-8 self-start w-10 h-10 rounded-full bg-blue-50/50 border border-blue-200 cursor-pointer text-blue-700 flex items-center justify-center"
                                onClick={() => setIsModalOpen(!isModalOpen)}
                            >
                                <i className="fa-solid fa-gear"></i>
                                <UserSettingDropDown 
                                    isOpen={isModalOpen} 
                                    onClose={() => setIsModalOpen(false)} 
                                    className="top-10 left-0" 
                                />
                                
                            </div>
                            
                            <div className="mb-3 flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200">
                                    <img 
                                        src={profile.avatarUrl} 
                                        alt="avatar" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                
                            </div>
                            <h2 className="text-3xl font-bold mb-2">@{profile.username}</h2>
                            <a href={`/${profile.username}`} className="text-gray-500 text-base mb-6 hover:underline">
                                linkify.com/{profile.username}
                            </a>
                        </div>

                        {/* Tabs */}
                        <div className="flex px-4 gap-2 mb-8 overflow-x-auto no-scrollbar">
                            <button className="px-8 py-2.5 bg-black text-white rounded-full text-sm font-semibold whitespace-nowrap shadow-sm">
                                Pages
                            </button>
                            <button 
                                onClick={() => navigate('/dashboard/design')}
                                className="px-8 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold whitespace-nowrap"
                            >
                                Design
                            </button>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-2 gap-5 px-4 pb-4">
                            {/* Links Card */}
                            <div 
                                onClick={() => navigate('/dashboard/links')}
                                className="flex flex-col gap-3 cursor-pointer group"
                            >
                                <div className="aspect-[2/3] bg-white rounded-3xl border border-gray-200 relative overflow-hidden shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                                    {/* Abstract Background Decoration */}
                                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-50 to-white z-0"></div>
                                    
                                    {/* Content Link Simulation */}
                                    <div className="relative z-10 p-6 h-full flex flex-col">
                                        <div className="flex items-center gap-2.5 mb-6">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm">
                                                <i className="fa-solid fa-link text-base"></i>
                                            </div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Links</span>
                                        </div>

                                        {/* Link Items Rows */}
                                        <div className="flex flex-col gap-3 mt-auto mb-5">
                                            {/* Item 1 (Active) */}
                                            <div className="h-12 w-full bg-white border border-gray-100 rounded-xl shadow-sm flex items-center justify-between px-4">
                                                <div className="w-16 h-2 bg-gray-600 rounded-full"></div>
                                                <div className="w-6 h-3 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.4)]"></div>
                                            </div>
                                            {/* Item 2 */}
                                            <div className="h-12 w-full bg-white border border-gray-100 rounded-xl shadow-sm flex items-center justify-between px-4 opacity-70">
                                                <div className="w-10 h-2 bg-gray-300 rounded-full"></div>
                                                <div className="w-6 h-3 bg-gray-200 rounded-full"></div>
                                            </div>
                                            {/* Item 3 */}
                                            <div className="h-12 w-full bg-white border border-gray-100 rounded-xl shadow-sm flex items-center justify-between px-4 opacity-40">
                                                <div className="w-14 h-2 bg-gray-300 rounded-full"></div>
                                                <div className="w-6 h-3 bg-gray-200 rounded-full"></div>
                                            </div>
                                        </div>

                                        {/* Add Button Simulation */}
                                        <div className="h-14 w-full bg-black rounded-2xl shadow-lg flex items-center justify-center gap-2 text-white shrink-0">
                                            <i className="fa-solid fa-plus text-sm"></i>
                                            <div className="w-10 h-2 bg-white/30 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-2">
                                    <span className="font-bold text-gray-800 text-base">Add Links</span>
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                        <i className="fa-solid fa-arrow-right text-sm"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Shop Card */}
                            <div 
                                onClick={() => navigate('/dashboard/shop')}
                                className="flex flex-col gap-3 cursor-pointer group"
                            >
                                <div className="aspect-[2/3] bg-white rounded-3xl border border-gray-200 relative overflow-hidden shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                                    {/* Abstract Background Decoration */}
                                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-50 to-white z-0"></div>

                                    {/* Content Shop Simulation */}
                                    <div className="relative z-10 p-6 h-full flex flex-col">
                                        <div className="flex items-center gap-2.5 mb-6">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shadow-sm">
                                                <i className="fa-solid fa-shop text-base"></i>
                                            </div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Shop</span>
                                        </div>

                                        {/* Product Grid Simulation - Kéo giãn height ra */}
                                        <div className="grid grid-cols-2 gap-2.5 mt-auto mb-3">
                                            {/* Product 1 */}
                                            <div className="aspect-[3/4] bg-white border border-purple-50 rounded-xl shadow-sm p-2.5 flex flex-col gap-2">
                                                <div className="flex-1 bg-purple-50 rounded-lg w-full"></div>
                                                <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                                                <div className="h-1.5 w-1/2 bg-gray-200 rounded-full"></div>
                                            </div>
                                            {/* Product 2 */}
                                            <div className="aspect-[3/4] bg-white border border-gray-100 rounded-xl shadow-sm p-2.5 flex flex-col gap-2 mt-6 opacity-80">
                                                <div className="flex-1 bg-yellow-50 rounded-lg w-full"></div>
                                                <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                                                <div className="h-1.5 w-1/2 bg-gray-200 rounded-full"></div>
                                            </div>
                                        </div>
                                        
                                        {/* Floating Badge */}
                                        <div className="absolute bottom-5 right-5 bg-purple-600 text-white text-[11px] font-bold px-3.5 py-2 rounded-full shadow-lg">
                                            $ Earn
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-2">
                                    <span className="font-bold text-gray-800 text-base">Products</span>
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                        <i className="fa-solid fa-arrow-right text-sm"></i>
                                    </div>
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
            <div className="fixed bottom-0 left-0 w-full h-[60px] bg-white border-t border-gray-200 px-4 flex justify-between items-center z-10">
                <div 
                    onClick={() => navigate('/dashboard')}
                    className="flex flex-col items-center gap-1 cursor-pointer w-1/4 text-black"
                >
                    <i className="fa-solid fa-layer-group text-xl"></i>
                    <span className="text-[10px] font-medium">My Linkify</span>
                </div>
                <div 
                    onClick={() => navigate('/dashboard/insights')}
                    className="flex flex-col items-center gap-1 cursor-pointer w-1/4 text-gray-400 hover:text-black"
                >
                    <i className="fa-solid fa-chart-simple text-xl"></i>
                    <span className="text-[10px] font-medium">Insights</span>
                </div>
                <div 
                    onClick={() => navigate('/dashboard/tools/post-ideas')}
                    className="flex flex-col items-center gap-1 cursor-pointer w-1/4 text-gray-400 hover:text-black"
                >
                    <i className="fa-solid fa-pencil text-xl"></i>
                    <span className="text-[10px] font-medium">Post ideas</span>
                </div>
            </div>

        </div>
    );
}