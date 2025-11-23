
export default function DesignActions() {
    return (
        <div className="bg-white p-4 rounded-3xl shadow-xl max-w-full absolute bottom-0.5 left-1/2 transform -translate-x-1/2 md:hidden flex">
            
            {/* Header */}
            <div className="flex flex-col items-center mx-4">
                <i className="fas fa-user text-3xl text-gray-700 mb-1"></i>
                <span className="text-sm font-medium text-gray-700">Header</span>
            </div>

            {/* Theme */}
            <div className="flex flex-col items-center mx-4">
                <i className="fas fa-th-large text-3xl text-gray-700 mb-1"></i>
                <span className="text-sm font-medium text-gray-700">Theme</span>
            </div>

            {/* Wallpaper */}
            <div className="flex flex-col items-center mx-4">
                {/* Biểu tượng được chọn để mô phỏng nét đứt trong hình ảnh */}
                <i className="fas fa-border-style text-3xl text-gray-700 mb-1"></i>
                <span className="text-sm font-medium text-gray-700">Wallpaper</span>
            </div>

            {/* Style */}
            <div className="flex flex-col items-center mx-4">
                <i className="fas fa-palette text-3xl text-gray-700 mb-1"></i>
                <span className="text-sm font-medium text-gray-700">Style</span>
            </div>
        </div>
    );
}