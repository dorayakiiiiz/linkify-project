import { toolCards } from "../../const/testDataDashboard";
export default function AudienceContactsDashboard() {
    return (
        <div className="w-full">

            <div className="bg-gray-100 min-h-screen">

                {/* --- 1. Subscribe Call-to-Action Section --- */}
                <div className="flex justify-center p-8">
                    {/* Khung chứa nội dung chính (White Box) */}
                    <div className=" bg-white rounded-xl shadow-lg p-16 flex flex-col items-center w-full h-[450px]" >
                        
                        {/* Hình ảnh/Minh họa (Sử dụng placeholder đơn giản) */}
                        <div className="mb-6 w-32 h-20 bg-gray-200 rounded-lg flex items-center justify-center relative">
                            {/* Placeholder hình ảnh minh họa */}
                            <span className="text-gray-500 text-xs">Illustration</span>
                            {/* Chuông báo màu vàng chanh */}
                            <div className="absolute top-0 right-[-10px] w-5 h-5 bg-lime-400 rounded-full border-2 border-white flex items-center justify-center">
                                {/* Icon chuông - Dùng i tag và Font Awesome nếu cần */}
                                {/* <i className="fa-solid fa-bell text-xs text-black"></i> */}
                            </div>
                        </div>

                        {/* Tiêu đề chính */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                            Let visitors subscribe to your Linktree for updates
                        </h2>
                        
                        {/* Mô tả */}
                        <p className="text-gray-600 mb-6 text-center">
                            Let's start growing your contact list.
                        </p>

                        {/* Nút Call to Action */}
                        <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition duration-150 shadow-lg">
                            Turn on Subscribe
                        </button>
                    </div>
                </div>

                {/* --- 2. Tools to Grow Your Audience Section --- */}
                <div className="px-8 mt-12 mb-16 ">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                        Tools to grow your audience
                    </h3>

                    {/* Tool Cards Grid */}
                    <div className="flex space-x-4 pb-4 overflow-x-auto">
                        {toolCards.map((card, index) => (
                            <div 
                                key={index} 
                                className={`w-64 h-40 ${card.color} rounded-xl shadow-md p-4 text-white relative flex-shrink-0`}
                            >
                                {/* Nội dung Placeholder */}
                                <p className="font-semibold">{card.content}</p>
                                
                                {/* Icon mũi tên (Giả định) */}
                                <div className="absolute bottom-4 right-4 w-8 h-8 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
                                    {/* Dùng i tag nếu có Font Awesome */}
                                    {/* <i className="fa-solid fa-arrow-right text-white text-sm"></i> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}





