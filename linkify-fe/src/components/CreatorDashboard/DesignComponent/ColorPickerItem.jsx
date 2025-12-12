import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import { useProfile } from "../../../context/ProfileContext";

    export default function ColorPickerItem({ label, colorKey, designSection }) {
    const { profile, updateDesign } = useProfile();
    const [showPicker, setShowPicker] = useState(false);

    // Lấy màu từ Context theo đúng cấu trúc Model
    // Ví dụ: profile.design.header.color
    const contextColor = profile?.design?.[designSection]?.[colorKey] || 'white';
    
    // Local state để UI phản hồi tức thì
    const [localColor, setLocalColor] = useState(contextColor);

    // Đồng bộ khi context thay đổi
    useEffect(() => {
        setLocalColor(contextColor);
    }, [contextColor]);


    // Gọi 
    const handleChange = (color) => {
        const newColor = color.hex;
        setLocalColor(newColor); 
        
        // Cập nhật Context & DB
        updateDesign({
            //Dùng [] để đặt key động
            [designSection]: {
                ...profile?.design?.[designSection],
                [colorKey]: newColor
            }
        });
    };

    return (
        <div className="mb-4 bg-[#e6e5e3] p-2 rounded-2xl relative">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700 font-medium">{label}</span>
                
                {/* Vòng tròn màu */}
                <div 
                    className="w-6 h-6 border border-gray-300 rounded-full cursor-pointer shadow-sm"
                    style={{ backgroundColor: localColor }}
                    onClick={() => setShowPicker(!showPicker)} //Toggle hiển thị color picker
                ></div>
            </div>

            {/* Chọn màu trong bảng màu thay đổi thì gọi lại API */}
            {showPicker && (
                <div className="absolute z-10 right-2 top-12 shadow-xl">
                    <div className="fixed inset-0" onClick={() => setShowPicker(false)} />
                    <div className="relative z-20">
                        <SketchPicker 
                            color={localColor}
                            onChange={handleChange}
                            disableAlpha={true}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};