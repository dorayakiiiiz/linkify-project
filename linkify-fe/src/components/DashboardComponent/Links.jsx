import {mainMenu, tools, links, navItems} from '../../const/testDataDashboard.js'
export default function LinksDashboard() {
    return (
        <div className="w-full my-4">
            <div className="space-y-4 pr-2"> {/* <-- Các lớp đã thêm */}
                {links.map((link, index) => (
                    <div
                        key={index}
                        className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex items-center gap-4"
                    >
                        
                        {/* 1. Dấu ba chấm (:::) - Drag Handle */}
                        <div className="flex items-start mr-3 pt-1 text-gray-400 hover:text-gray-600 cursor-move" title="Kéo để sắp xếp">
                            <i className="fa-solid fa-grip-vertical text-lg"></i>
                        </div>

                        {/* 2. Nội dung chính của thẻ */}
                        <div className="flex-grow min-w-0">
                            
                            {/* A. Phần Tiêu đề, URL, Chia sẻ, Gạt (Toggle) */}
                            <div className="flex justify-between items-start">
                                
                                <div className="flex-grow min-w-0 pr-4">
                                    <div className="flex items-center mb-1">
                                        <span className="text-base font-semibold text-gray-800">{link.title}</span>
                                        <i className="fa-solid fa-pen text-gray-400 text-xs ml-2 cursor-pointer hover:text-gray-600" title="Chỉnh sửa Tiêu đề"></i>
                                    </div>

                                    <div className="flex items-center">
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-500 truncate min-w-0">
                                            {link.url}
                                        </a>
                                        <i className="fa-solid fa-pen text-gray-400 text-xs ml-2 cursor-pointer hover:text-gray-600" title="Chỉnh sửa URL"></i>
                                    </div>
                                </div>

                                <div className="flex items-start pt-1 space-x-3">
                                    <i className="fa-solid fa-share-from-square text-gray-500 text-lg hover:text-gray-700 cursor-pointer" title="Chia sẻ"></i>
                                    
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            defaultChecked={link.active}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                    </label>
                                </div>
                            </div>
                            
                            {/* B. Thanh hành động dưới cùng */}
                            <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
                                
                                <div className="flex items-center space-x-3">
                                    <i className="fa-solid fa-grip text-base hover:text-gray-700 cursor-pointer" title="Bố cục"></i>
                                    <i className="fa-solid fa-link text-base hover:text-gray-700 cursor-pointer" title="Liên kết"></i>
                                    <i className="fa-regular fa-image text-base hover:text-gray-700 cursor-pointer" title="Hình ảnh"></i>
                                    <i className="fa-solid fa-star text-base hover:text-gray-700 cursor-pointer" title="Yêu thích"></i>
                                    <i className="fa-regular fa-bookmark text-base hover:text-gray-700 cursor-pointer" title="Lưu trữ"></i>
                                    <i className="fa-solid fa-lock text-base hover:text-gray-700 cursor-pointer" title="Khóa"></i>
                                    <i className="fa-regular fa-chart-bar text-base hover:text-gray-700 cursor-pointer" title="Thống kê"></i>
                                    <span className="text-xs text-gray-600 ml-1">{link.clicks !== undefined ? link.clicks : 0} clicks</span>
                                </div>
                                
                                <i className="fa-solid fa-trash-can text-lg hover:text-red-500 cursor-pointer" title="Xóa"></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}