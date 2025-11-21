
export default function ColorDesign() {
    return (
        <div>
            <div className="flex items-center justify-between  bg-[#e6e5e3] p-4 mb-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-150 ease-in-out">
                <span className="text-lg text-gray-800">Wallpaper</span>
                
                {/* Vòng tròn Màu trắng (Không chọn) */}
                <div className="w-7 h-7 rounded-full bg-black"></div>
            </div>
            
            {/* Hàng 2: Title (Màu trắng, KHÔNG được chọn) */}
            <div className="flex items-center justify-between  bg-[#e6e5e3] p-4 mb-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-150 ease-in-out">
                <span className="text-lg text-gray-800">Title</span>
                
                {/* Vòng tròn Màu trắng (Không chọn) */}
                <div className="w-7 h-7 rounded-full bg-black"></div>
            </div>
            
            {/* Hàng 3: Page text (Màu đen, ĐÃ được chọn) */}
            <div className="flex items-center justify-between  bg-[#e6e5e3] p-4 mb-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-150 ease-in-out">
                <span className="text-lg text-gray-800">Page text</span>
                
                {/* Vòng tròn Màu đen (Đã chọn) */}
                <div className="w-7 h-7 rounded-full bg-black"></div>
            </div>
            
            {/* Hàng 4: Buttons (Màu trắng, KHÔNG được chọn) */}
            <div className="flex items-center justify-between  bg-[#e6e5e3] p-4 mb-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-150 ease-in-out">
                <span className="text-lg text-gray-800">Buttons</span>
                
                {/* Vòng tròn Màu trắng (Không chọn) */}
                <div className="w-7 h-7 rounded-full bg-black"></div>
            </div>
            
            {/* Hàng 5: Button text (Màu đen, ĐÃ được chọn) */}
            <div className="flex items-center justify-between  bg-[#e6e5e3] p-4 mb-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-150 ease-in-out">
                <span className="text-lg text-gray-800">Button text</span>
                
                {/* Vòng tròn Màu đen (Đã chọn) */}
                <div className="w-7 h-7 rounded-full bg-black"></div>
            </div>
        </div>
    )
}