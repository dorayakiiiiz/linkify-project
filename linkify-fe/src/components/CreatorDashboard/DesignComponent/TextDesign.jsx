import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { useProfile } from '../../../context/ProfileContext';
import ColorPickerItem from './ColorPickerItem';
import FontPickerModal from '../../../pages/CreatorDashboard/Modal/FontModal';
// Component con để tái sử dụng logic chọn màu


export default function TextDesign() { 
    const { profile, updateDesign } = useProfile();
    //Có đang mở Modal chọn font hay không
    const [isFontModalOpen, setIsFontModalOpen] = useState(false);
    const [targetSection, setTargetSection] = useState(null); // 'header' hoặc 'text'


    //---------------CÁC HÀM NÀY XÀI LẠI BÊN HEADER -> DƯ-----  
    // Hàm mở modal
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
    const currentSize = profile?.design?.header?.sizeUsername || 'small';
    return (
        <div className='p-4'>
            {/* Title font section - Giữ nguyên */}
            <div className="mb-4 bg-[#e6e5e3] p-2 rounded-2xl" 
                onClick={() => openFontModal('header')}
            >
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Title font</span>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <span className="text-gray-900 font-medium">{profile?.design?.header?.font || 'Inter'}</span>
                        <i className="fas fa-chevron-right text-sm text-gray-500"></i>
                    </div>
                </div>
            </div>
    
            {/* Title color (Header Color) */}
            {/* Model: design.header.color */}
            <ColorPickerItem 
                label="Title color" 
                designSection="header" 
                colorKey="color" 
            />
    
            {/* Title size - Giữ nguyên */}
            <div className="mb-8">
                <span className="block text-gray-700 mb-2 font-medium">Title size</span>
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
    
            <h3 className="text-gray-700 text-lg font-semibold mb-4 font-medium">Page and buttons</h3>
    
            {/* Font - Giữ nguyên */}
            <div className="mb-4 bg-[#e6e5e3] p-2 rounded-2xl" onClick={() => openFontModal('text')}>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Font</span>
                <div className="flex items-center space-x-2 cursor-pointer">
                    <span className="text-gray-900 font-medium">{profile?.design?.text?.font || 'Inter'}</span>
                    <i className="fas fa-chevron-right text-sm text-gray-500"></i>
                </div>
                </div>
            </div>
    
            {/* Page text color (Text Color) */}
            {/* Model: design.text.color */}
            <ColorPickerItem 
                label="Page text color" 
                designSection="text" 
                colorKey="color" 
            />
    
            {/* Button text color */}
            {/* Model: design.buttons.textColor */}
            <ColorPickerItem 
                label="Button text color" 
                designSection="buttons" 
                colorKey="textColor" 
            />
            <FontPickerModal 
                isOpen={isFontModalOpen}
                onClose={() => setIsFontModalOpen(false)}
                onSelect={handleFontSelect}
                currentFont={profile?.design?.[targetSection]?.font}
                title={targetSection === 'header' ? 'Title Font' : 'Page Font'}
            />
        </div>
        
    )
}