import React from 'react';
import { insightMetrics } from '../../constants/dashboard';

export default function InsightsPage() {
    return (
        // Container chính (giả định nằm trong Middle Content)
        <div className="w-full px-4 lg:px-20 py-8">
            
            {/* Tiêu đề */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Lifetime totals
            </h1>

            {/* --- Container cho 5 Thẻ Metrics --- */}
            {/* Sử dụng Flexbox để xếp 5 thẻ, gap-4 để tạo khoảng cách đều */}
            <div className="flex gap-4 mb-6 w-full overflow-x-auto">
                {insightMetrics.map((item, index) => (
                    // Thẻ Metrics riêng lẻ
                    <div 
                        key={index}
                        // w-full h-32: Chiều rộng bằng nhau, chiều cao cố định
                        // bg-gray-100: Màu nền xám nhạt
                        // rounded-xl: Bo góc lớn
                        className="flex-1 h-30 min-w-40 bg-[#dedcdc] rounded-xl p-4 flex flex-col"
                    >
                        {/* Icon và Value (Hàng trên) */}
                        <div className="flex flex-col justify-between items-start gap-1">
                            
                            {/* Icon - Giả định icon Linkify (Font Awesome) */}
                            <div className="text-gray-500">
                                <i className={`fa-regular ${item.icon} text-lg`}></i>
                            </div>
                            <span className="text-2xl font-semibold text-black">
                                {item.value}
                            </span>
                            <p className="text-sm text-gray-600">
                                {item.label}
                            </p>
                        </div>

                        {/* Label (Tên metrics) */}
                        
                    </div>
                ))}
            </div>

            {/* --- Nút chọn ngày --- */}
            <button className="px-5 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-100 transition duration-150">
                Last 7 days
            </button>

            <div className="flex flex-col items-center justify-center py-20 px-4">
            
                {/* Container căn giữa và giới hạn kích thước cho hình */}
                <div className="mb-8 flex flex-col items-center">
                    <img src='https://assets.production.linktr.ee/ui-analytics/latest/src/images/nodata-home.png'
                        className='h-[100px]'
                    ></img>
                </div>

                {/* --- 2. Văn bản và Nút Hành động --- */}
                
                <h2 className="text-xl font-bold text-gray-800 mb-2 text-center max-w-lg">
                    No activity in this date range. Let's fix that.
                </h2>
                
                <p className="text-gray-600 mb-8 text-center max-w-lg">
                    The easiest way to get audiences engaged is to share your Linktree!
                </p>

                {/* Nút hành động */}
                <div className="flex space-x-4">
                    
                    {/* Share your Linktree (Màu đen - Primary) */}
                    <button className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition duration-150">
                        Share your Linktree
                    </button>
                    
                    {/* Show sample data (Màu trắng/xám - Secondary) */}
                    <button className="px-6 py-3 border border-gray-300 bg-white text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-50 transition duration-150">
                        Show sample data
                    </button>
                </div>
            </div>

            <div className=" bg-[#dedcdc] rounded-xl p-8 mb-8"> {/* Thêm mb-8 để tạo khoảng cách với section tiếp theo nếu có */}
            
                {/* Header: "Social platforms" và nút mũi tên */}
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-xl font-bold text-gray-800">Social platforms</h2>
                    <button className="text-gray-500 hover:text-gray-700">
                    </button>
                </div>

                {/* --- Nội dung chính: Hình ảnh và Call-to-action --- */}
                <div className="flex flex-col items-center justify-center text-center px-4">
                    
                    {/* Hình ảnh minh họa: Sử dụng <img> hoặc div background */}
                    {/* Ở đây, tôi sẽ dùng một div với background image để dễ dàng căn chỉnh và thêm hiệu ứng overlay nếu cần.
                        Hoặc bạn có thể dùng thẻ <img> nếu ảnh là một file tĩnh.
                        Nếu dùng <img>, cần path chính xác đến ảnh. */}
                    <div className="relative w-[280px] h-[200px] mb-8" 
                        style={{ 
                            backgroundImage: 'url(https://via.placeholder.com/280x200?text=Social+Platforms+Image)', // Thay thế bằng URL ảnh thật của bạn
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '1rem', // rounded-xl
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' // shadow-xl
                        }}
                    >
                        {/* Minh họa cho phần icon và số liệu trên ảnh (nếu cần thiết để tái tạo chi tiết) */}
                        <div className="absolute top-4 left-4 flex flex-col space-y-2 text-white text-base">
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-tiktok"></i>
                            <i className="fa-brands fa-youtube"></i>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-purple-600 bg-opacity-80 rounded-lg p-2 text-white text-xs text-left shadow-lg">
                            <span className="block text-lg font-bold">7,670</span>
                            <span className="block text-xs">Unique Views</span>
                        </div>
                    </div>

                    {/* Tiêu đề chính */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 max-w-lg">
                        All your social stats, in one place.
                    </h3>
                    
                    {/* Mô tả */}
                    <p className="text-gray-600 mb-10 max-w-xl">
                        Track your follower growth, post frequency, demographics
                        and more across TikTok, Instagram and YouTube.
                    </p>

                    {/* Nút Call to Action */}
                    <button className="px-8 py-3 bg-black text-white font-semibold rounded-full flex items-center space-x-2 shadow-lg hover:bg-gray-800 transition duration-150">
                        <i className="fa-solid fa-link"></i>
                        <span>Connect your socials</span>
                    </button>
                </div>
            </div>
        </div>
    );
}