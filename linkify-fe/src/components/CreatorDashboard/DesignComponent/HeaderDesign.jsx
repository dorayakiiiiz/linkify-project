
export default function HeaderDesign() {
    return (
        <div>

            {/* --- 1. Profile Section (Avatar & Add Button) --- */}
            <div className="flex items-center mb-12">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mr-6">
                    <i className="fa-solid fa-user text-4xl text-gray-500"></i>
                </div>
                {/* Add Button */}
                <button className="flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition duration-150">
                    <i className="fa-solid fa-plus mr-2 text-xs"></i>
                    Add
                </button>
            </div>

            {/* --- 2. Settings Groups --- */}
            <div className="space-y-10 max-w-xl">
                
                {/* Profile Image Layout */}
                <div>
                    <h2 className="text-md font-semibold mb-4">Profile image layout</h2>
                    <div className="flex space-x-4">
                        {/* Classic - Active (Viền đen đậm, nền trắng) */}
                        <button className="flex-1 flex flex-col items-center justify-center py-2 h-20 border-2 border-black bg-white shadow-md rounded-3xl transition duration-150 cursor-pointer">
                            <i className="fa-regular fa-user text-xl mb-1"></i>
                            <span className="text-xs text-gray-600 mt-1">Classic</span>
                        </button>
                        {/* Hero - Inactive (Viền xám, nền xám nhạt) */}
                        <button className="flex-1 flex flex-col items-center justify-center py-2 h-20 border border-gray-300 bg-gray-100 rounded-3xl transition duration-150 relative cursor-pointer group">
                            <i className="fa-solid fa-expand text-xl mb-1"></i>
                            <span className="text-xs text-gray-600 mt-1">Hero</span>
                            {/* Icon Bolt (Pro/Plus) nhỏ ở góc */}
                            <div className="absolute top-2 right-2 text-gray-500">
                                <i className="fa-solid fa-bolt text-sm"></i>
                            </div>
                        </button>
                    </div>
                </div>
                
                {/* Title Style */}
                <div>
                    <h2 className="text-md font-semibold mb-4">Title style</h2>
                    <div className="flex space-x-4">
                        {/* Text - Active (Viền đen đậm, nền trắng) */}
                        <button className="flex-1 flex flex-col items-center justify-center py-2 h-20 border-2 border-black bg-white shadow-md rounded-3xl transition duration-150 cursor-pointer">
                            <span className="text-2xl font-bold">Aa</span>
                            <span className="text-xs text-gray-600 mt-1">Text</span>
                        </button>
                        {/* Logo - Inactive (Viền xám, nền xám nhạt) */}
                        <button className="flex-1 flex flex-col items-center justify-center py-2 h-20 border border-gray-300 bg-gray-100 rounded-3xl transition duration-150 relative cursor-pointer group">
                            <i className="fa-regular fa-image text-xl mb-1"></i>
                            <span className="text-xs text-gray-600 mt-1">Logo</span>
                            {/* Icon Bolt (Pro/Plus) nhỏ ở góc */}
                            <div className="absolute top-2 right-2 text-gray-500">
                                <i className="fa-solid fa-bolt text-sm"></i>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Title Text Input */}
                <div>
                    <h3 className="text-md font-semibold mb-4">Title text</h3>
                    <input 
                        type="text" 
                        defaultValue="otis275" 
                        className="w-full px-4 py-4 border border-gray-300 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-150"
                    />
                </div>

                {/* Title Font */}
                <div className="flex justify-between items-center py-3 bg-[#e6e5e3] rounded-2xl">
                    <h3 className="ml-3 text-md font-semibold text-gray-800">Title font</h3>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <span className="text-base font-semibold text-gray-800">IBM Plex Sans</span>
                        <i className="fa-solid fa-chevron-right text-gray-500 text-xs ml-1 mr-3"></i>
                    </div>
                </div>

                {/* Title Color */}
                <div className="flex justify-between items-center py-3 bg-[#e6e5e3] rounded-2xl">
                    <h3 className="ml-3 text-md font-semibold text-gray-800">Title color</h3>
                    {/* Color Toggle/Indicator */}
                    <div className="w-5 h-5 border border-gray-400 rounded-full cursor-pointer relative p-0.5 mr-3">
                        <div className="w-full h-full bg-black rounded-full"></div>
                    </div>
                </div>
                
                {/* Title Size */}
                <div>
                    <h3 className="text-md font-semibold mb-4">Title size</h3>
                    <div className="flex space-x-4">
                        {/* Small - Active (Viền đen đậm, nền trắng) */}
                        <button className="flex-1 flex flex-col items-center justify-center py-4 h-14 border-2 border-black bg-white shadow-md rounded-xl transition duration-150 cursor-pointer">
                            <span className="text-base font-medium text-gray-600">Small</span>
                        </button>
                        {/* Large - Inactive (Viền xám, nền xám nhạt) */}
                        <button className="flex-1 flex flex-col items-center justify-center py-4 h-14 border border-gray-300 bg-gray-100 rounded-xl transition duration-150 relative cursor-pointer group">
                            <span className="text-base font-medium text-gray-600">Large</span>
                            {/* Icon Bolt (Pro/Plus) nhỏ ở góc */}
                            <div className="absolute top-2 right-2 text-gray-500">
                                <i className="fa-solid fa-bolt text-sm"></i>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}