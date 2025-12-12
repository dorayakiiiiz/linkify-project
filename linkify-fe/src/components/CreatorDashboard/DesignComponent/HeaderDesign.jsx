import ColorPickerItem from "./ColorPickerItem"
import { useState } from "react"
import { useProfile } from "../../../context/ProfileContext";
import FontPickerModal from "../../../pages/CreatorDashboard/Modal/FontModal"
export default function HeaderDesign() {
    const { profile, updateDesign } = useProfile();
    //Có đang mở Modal chọn font hay không
    const [isFontModalOpen, setIsFontModalOpen] = useState(false);
    const [targetSection, setTargetSection] = useState(null); // 'header' hoặc 'text'

    const openFontModal = (section) => {
        setTargetSection(section);
        setIsFontModalOpen(true);
    };

    // Hàm xử lý khi chọn font
    const handleFontSelect = (fontName) => {
        updateDesign({
            //Gán font đã chọn vào đúng section
            [targetSection]: {
                ...profile?.design?.[targetSection],
                font: fontName
            }
        });
    };

    // Hàm xử lý thay đổi size username
    const handleUsernameSizeChange = (size) => {
        updateDesign({
            header: {
                ...profile?.design?.header,
                sizeUsername: size
            }
        });
    };
    // Lấy size hiện tại (mặc định là medium)
    const currentSize = profile?.design?.header?.sizeUsername || 'medium';

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


                {/* Title Font */}
                <div className="flex justify-between items-center py-3 bg-[#e6e5e3] rounded-2xl">
                    <h3 className="ml-3 text-md font-semibold text-gray-800">Title font</h3>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <span className="text-base font-semibold text-gray-800" onClick={() => openFontModal('header')}>{profile?.design?.header?.font || 'Inter'}</span>
                        <i className="fa-solid fa-chevron-right text-gray-500 text-xs ml-1 mr-3"></i>
                    </div>
                </div>

                <ColorPickerItem
                    label="Title color"
                    designSection="header"
                    colorKey="color"
                />
                <FontPickerModal 
                    isOpen={isFontModalOpen}
                    onClose={() => setIsFontModalOpen(false)}
                    onSelect={handleFontSelect}
                    currentFont={profile?.design?.[targetSection]?.font}
                    title={targetSection === 'header' ? 'Title Font' : 'Page Font'}
                />
                
                {/* Title Size */}
                <div>
                    <h3 className="text-md font-semibold mb-4">Title size</h3>
                    <div className="flex space-x-4">
                        {/* Small Button */}
                        <button 
                            onClick={() => handleUsernameSizeChange('small')}
                            className={`flex-1 py-3 px-4 text-center border rounded-lg shadow-sm font-medium transition-colors
                                ${currentSize === 'small' 
                                    ? 'text-gray-900 border-gray-400 bg-white ring-2 ring-gray-200' 
                                    : 'text-gray-500 border-gray-200 bg-gray-50 hover:bg-gray-100'
                                }`}
                        >
                            Small
                        </button>

                        {/* Large Button */}
                        <button 
                            onClick={() => handleUsernameSizeChange('large')}
                            className={`flex-1 py-3 px-4 text-center border rounded-lg font-medium relative transition-colors
                                ${currentSize === 'large' 
                                    ? 'text-gray-900 border-gray-400 bg-white ring-2 ring-gray-200' 
                                    : 'text-gray-500 border-gray-200 bg-gray-50 hover:bg-gray-100'
                                }`}
                        >
                            Large
                            {/* <i className="fas fa-bolt absolute top-1 right-2 text-yellow-500 text-sm"></i> */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}