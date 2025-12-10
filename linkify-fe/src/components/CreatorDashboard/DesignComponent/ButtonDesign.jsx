
export default function ButtonDesign() {
    return (
        <div>
            <div className="mb-8">
                <h3 className="text-gray-700 text-lg font-semibold mb-3">Button style</h3>
                <div className="flex space-x-3">
                {/* Solid Button (Selected) */}
                <button className="flex-1 py-3 px-4 text-center text-gray-900 border-2 border-gray-900 bg-white rounded-lg shadow-sm font-medium">
                    Solid
                </button>

                {/* Glass Button (with lightning icon) */}
                <button className="flex-1 py-3 px-4 text-center text-gray-500 border border-gray-200 bg-gray-100 rounded-lg font-medium relative">
                    Glass
                    <i className="fas fa-bolt absolute top-1 right-2 text-yellow-500 text-sm"></i>
                </button>

                {/* Outline Button */}
                <button className="flex-1 py-3 px-4 text-center text-gray-500 border border-gray-200 bg-gray-100 rounded-lg font-medium">
                    Outline
                </button>
                </div>
            </div>
            
            <hr className="mb-8 border-gray-200" />

            {/* Button Options */}
            <h3 className="text-gray-700 text-lg font-semibold mb-4">Button Options</h3>

            {/* Corners (Slider) */}
            <div className="mb-6">
                <div className="flex flex-wrap  gap-8">

                    <span className="text-gray-700 block">Corners</span>
                    <div className="flex items-center space-x-4 flex-1">
                        <span className="text-gray-500">Square</span>
                        {/* Mô phỏng Slider */}
                        <div className="flex-1 relative">
                            <input type="range" min="0" max="3" step="1" value="0" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            {/* Nút tròn ở vị trí 35% */}
                        </div>
                        <span className="text-gray-500">Round</span>
                    </div>
                </div>
            </div>

            {/* Shadow */}
            <div className="mb-8">
                <div className="flex flex-wrap items-center gap-8">
                    <span className="text-gray-700 block">Shadow</span>
                    <div className="flex space-x-3 flex-1">
                        <button className="flex-1 py-2 text-center text-gray-500 border border-gray-200 bg-gray-100 rounded-lg font-medium">
                            None
                        </button>
                        <button className="flex-1 py-2 text-center text-gray-500 border border-gray-200 bg-gray-100 rounded-lg font-medium">
                            Subtle
                        </button>
                        {/* Strong Button (Selected) */}
                        <button className="flex-1 py-2 text-center text-gray-900 border-2 border-gray-900 bg-white rounded-lg shadow-sm font-medium">
                            Strong
                        </button>
                        <button className="flex-1 py-2 text-center text-gray-500 border border-gray-200 bg-gray-100 rounded-lg font-medium">
                            Hard
                        </button>
                    </div>

                </div>
            </div>
            
            <hr className="mb-8 border-gray-200" />

            {/* Colors */}
            <h3 className="text-gray-700 text-lg font-semibold mb-4">Colors</h3>

            {/* Button color */}
            <div className="mb-4 bg-[#e6e5e3] p-2 rounded-2xl hover:cursor-pointer">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Button color</span>
                    {/* Màu Vàng nhạt/Xanh lá nhạt */}
                    <div className="w-6 h-6 border border-gray-300 rounded-full bg-yellow-100 cursor-pointer"></div>
                </div>
            </div>

            {/* Text color */}
            <div className="mb-4 bg-[#e6e5e3] p-2 rounded-2xl hover:cursor-pointer">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Text color</span>
                    {/* Màu Tím đậm */}
                    <div className="w-6 h-6 border border-gray-300 rounded-full bg-purple-700 cursor-pointer"></div>
                </div>
            </div>
        </div>
    )
}
