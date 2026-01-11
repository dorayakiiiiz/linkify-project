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

    // Fallback avatar
    const defaultAvatar = `https://ui-avatars.com/api/?name=${profile?.username || 'User'}&background=random`;

    return (
        <div className="p-4">

            {/* --- 1. Profile Section (Avatar & Add Button) --- */}
            <div className="flex items-center mb-12">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-full flex items-center justify-center mr-6 overflow-hidden border border-gray-200">
                    <img 
                        src={profile?.avatarUrl || defaultAvatar} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = defaultAvatar; }}
                    />
                </div>
            </div>

            {/* --- 2. Settings Groups --- */}
            <div className="space-y-10 max-w-xl">
                

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