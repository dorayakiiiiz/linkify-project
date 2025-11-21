

export default function TextDesign() { 
    
    return (
        <div>
    
            <div className="mb-4 bg-[#e6e5e3] p-2 rounded-2xl">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Title font</span>
                <div className="flex items-center space-x-2 cursor-pointer">
                    <span className="text-gray-900 font-medium">IBM Plex Sans</span>
                    <i className="fas fa-chevron-right text-sm text-gray-500"></i>
                </div>
                </div>
            </div>
    
            {/* Title color */}
            <div className="mb-6 bg-[#e6e5e3] p-2 rounded-2xl">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Title color</span>
                {/* Màu trắng với viền đen nhỏ mô phỏng color picker */}
                <div className="w-6 h-6 border border-gray-300 rounded-full bg-white cursor-pointer"></div>
                </div>
            </div>
    
            {/* Title size */}
            <div className="mb-8">
                <span className="block text-gray-700 mb-2 font-medium">Title size</span>
                <div className="flex space-x-4">
                {/* Small Button (Selected) */}
                <button className="flex-1 py-3 px-4 text-center text-gray-900 border border-gray-400 bg-white rounded-lg shadow-sm font-medium">
                    Small
                </button>
    
                {/* Large Button (with lightning icon - mô phỏng tùy chỉnh nâng cao/pro) */}
                <button className="flex-1 py-3 px-4 text-center text-gray-500 border border-gray-200 bg-gray-100 rounded-lg font-medium relative">
                    Large
                    <i className="fas fa-bolt absolute top-1 right-2 text-yellow-500 text-sm"></i>
                </button>
                </div>
            </div>
    
            {/* Divider - Page and buttons section */}
            <h3 className="text-gray-700 text-lg font-semibold mb-4 font-medium">Page and buttons</h3>
    
            {/* Font */}
            <div className="mb-4 bg-[#e6e5e3] p-2 rounded-2xl">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Font</span>
                <div className="flex items-center space-x-2 cursor-pointer">
                    <span className="text-gray-900 font-medium">IBM Plex Sans</span>
                    <i className="fas fa-chevron-right text-sm text-gray-500"></i>
                </div>
                </div>
            </div>
    
            {/* Page text color */}
            <div className="mb-4 bg-[#e6e5e3] p-2 rounded-2xl">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Page text color</span>
                {/* Màu Tím */}
                <div className="w-6 h-6 border border-gray-300 rounded-full bg-purple-700 cursor-pointer"></div>
                </div>
            </div>
    
            {/* Button text color */}
            <div className="bg-[#e6e5e3] p-2 rounded-2xl">
                <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 font-medium">Button text color</span>
                {/* Màu Tím */}
                <div className="w-6 h-6 border border-gray-300 rounded-full bg-purple-700 cursor-pointer"></div>
                </div>
            </div>
        </div>
    )
}