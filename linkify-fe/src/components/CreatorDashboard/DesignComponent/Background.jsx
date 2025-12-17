import React from 'react';
import { useState } from 'react';
import ColorPickerItem from './ColorPickerItem';
import { useProfile } from '../../../context/ProfileContext';
import { profileService } from '../../../services/profileService';
import { useRef } from 'react';

// Helper chuyển Hex sang RGBA để làm mờ màu (cho Blur thumbnail)

export default function Background() {
    const { profile, updateDesign, setProfile } = useProfile();
    const currentType = profile?.design?.background?.type || 'fill';
    
    // Lấy màu hiện tại, fallback về trắng nếu chưa có
    const originColor = profile?.design?.background?.value || '#FFFFFF';
    const toColor = profile?.design?.background?.toColor || '#FFFFFF';
    const savedImageUrl = profile?.design?.background?.imageUrl; // Lấy URL ảnh đã lưu

    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    // --- Mảng Dữ liệu Động ---
    const wallpaperStyles = [
        { 
            id: 'fill', 
            label: 'Fill', 
            icon: null, 
            premium: false, 
            // Dùng style inline để hiển thị màu chính xác
            style: { backgroundColor: originColor },
            contentClass: 'w-full h-full rounded-xl'
        },
        { 
            id: 'gradient', 
            label: 'Gradient', 
            icon: null, 
            premium: false, 
            // Gradient từ trên xuống
            style: { background: `linear-gradient(180deg, ${originColor} 0%, ${toColor} 100%)` },
            contentClass: 'w-full h-full rounded-xl'
        },
        { 
            id: 'blur', 
            label: 'Blur', 
            icon: null, 
            premium: false, 
            // Blur giả lập bằng Radial Gradient
            style: { background: `radial-gradient(circle, ${originColor} 0%, ${toColor} 100%)` },
            contentClass: 'w-full h-full rounded-xl' 
        },
        { 
            id: 'image', 
            label: 'Image', 
            icon: 'fa-image', 
            premium: false, 
            style: { backgroundColor: '#f9fafb' }, // Màu xám nhạt mặc định
            svgPath: `<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L15 15m0 0l4.586-4.586a2 2 0 012.828 0L22 13m-13 6h6m-3-4V7M3 21h18a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`
        },  
    ];

    const handleSelectType = (typeId) => {
        if (typeId === 'image') {
            // Nếu đã có ảnh lưu trước đó, dùng lại ảnh đó luôn
            if (savedImageUrl) {
                updateDesign({
                    //không đụng vào value khi đổi kiểu
                    background: {
                        ...profile?.design?.background,
                        type: 'image',
                        // value: savedImageUrl 
                    }
                });
            } else {
                // Nếu chưa có ảnh, mở file dialog
                fileInputRef.current.click();
            }
        } else { // Các kiểu còn lại thì lưu luôn
            updateDesign({
                //Không đụng vào imageUrl khi đổi kiểu
                background: {
                    ...profile?.design?.background,
                    type: typeId
                }
            });
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0]; //Lấy file được chọn
        if (!file) return;

        setUploading(true);
        try {
            // Gọi API upload ảnh
            // Lưu ý: Bạn cần implement hàm uploadBackground trong profileService
            // Hoặc gọi trực tiếp axios ở đây
            const formData = new FormData();
            formData.append('image', file);
            formData.append('profileId', profile._id);

            // Giả sử dùng api instance từ axios
            // const res = await api.post('/profile/upload-background', formData);
            
            // Tạm thời gọi trực tiếp fetch hoặc axios nếu chưa có service
            // Ví dụ dùng profileService nếu đã có method uploadBackground
             const res = await profileService.uploadBackground(formData);
            
            // Cập nhật profile context với dữ liệu mới từ server
            if (res.profile) {
                setProfile(res.profile);
            }

        } catch (error) {
            console.error("Failed to upload background:", error);
            alert("Failed to upload image");
        } finally {
            setUploading(false);
            // Reset input để chọn lại cùng file được
            e.target.value = null;
        }
    };

    return (
        <div className="p-4">

            {/* Input file ẩn */}
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" //Chỉ chấp nhận file ảnh
                onChange={handleFileChange}
            />

            {/* Tiêu đề lớn */}
            
            {/* --- Phần Kiểu Hình nền (Wallpaper Style) --- */}
            <div className="mb-8">
                <h2 className="text-lg font-medium mb-3 text-gray-700">Background style</h2>
                
                {/* Container cho các Thumbnail */}
                <div className="flex flex-wrap gap-4">
                    {wallpaperStyles.map((style) => {
                        const isSelected = currentType === style.id;
                        return (
                            <div 
                                key={style.id} 
                                className="flex flex-col items-center shrink-0 cursor-pointer"
                                onClick={() => handleSelectType(style.id)}
                            >
                                
                                {/* Phần tử chính - Thumbnail */}
                                <div 
                                    className={`
                                        w-[150px] lg:w-[100px] h-[175px] lg:h-[125px] 
                                        rounded-xl 
                                        flex items-center justify-center 
                                        relative 
                                        border border-gray-200
                                        ${isSelected ? 'shadow-[0_0_0_2px_black]' : 'hover:shadow-md'}
                                    `}
                                >
                                    {/* Loading indicator cho Image */}
                                    {style.id === 'image' && uploading && (
                                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-xl">
                                            <i className="fa-solid fa-spinner fa-spin text-gray-500"></i>
                                        </div>
                                    )}

                                    {/* Nội dung bên trong */}
                                    {style.svgPath ? (
                                        <>
                                            {/* Nếu đang chọn Image và đã có ảnh, hiện ảnh preview nhỏ */}
                                            {/* Kiểm tra savedImageUrl hoặc originColor nếu đang ở mode image */}
                                            {style.id === 'image' && (savedImageUrl || (currentType === 'image' && originColor.startsWith('http'))) ? (
                                                <img src={savedImageUrl || originColor} alt="bg-preview" className="w-full h-full object-cover rounded-xl" />
                                            ) : (
                                                <div dangerouslySetInnerHTML={{ __html: style.svgPath }} />
                                            )}
                                            
                                            {style.premium && (
                                                <div className="absolute top-1 right-1 bg-gray-100 p-0.5 rounded-full">
                                                    <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M11.9 14.7a.8.8 0 01-.6.3.8.8 0 01-.6-.3L7 9.3v-2a.8.8 0 01.8-.8h1.4l.2-2a.8.8 0 011.6 0l.2 2h1.4a.8.8 0 01.8.8v2l-4.7 5.4z" /></svg>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        // Dùng style inline để render màu động
                                        <div 
                                            className={style.contentClass}
                                            style={style.style}
                                        ></div>
                                    )}
                                </div>
                                
                                <span className="text-sm mt-2 text-center text-gray-700 font-medium">{style.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <hr className="my-6 border-t border-gray-200" />
            
            {/* --- Phần Màu Sắc (Color) --- */}
            {/* Ẩn phần chọn màu nếu đang chọn Image */}
            {currentType !== 'image' && (
                <div className="mb-4">
                    <h2 className="text-lg font-medium mb-3 text-gray-700">Color</h2>
                    <div className="w-full flex flex-col gap-4">
                        {/* Màu chính (From Color) */}
                        <ColorPickerItem 
                            label={currentType === 'fill' ? "Background color" : "From color"}
                            designSection="background" 
                            colorKey="value" 
                        />

                        {/* Màu phụ (To Color) - Chỉ hiện khi chọn Gradient hoặc Blur */}
                        {(currentType === 'gradient' || currentType === 'blur') && (
                            <ColorPickerItem 
                                label="To color" 
                                designSection="background" 
                                colorKey="toColor" 
                            />
                        )}
                    </div>
                </div>
            )}

            {currentType === 'image' && (
                <div className="mb-4">
                    <button 
                        onClick={() => fileInputRef.current.click()}
                        className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium hover:bg-gray-300 transition"
                    >
                        Change Image
                    </button>
                </div>
            )}
            
            <p className="text-sm text-gray-500">Suggested colors are based on your profile image</p>
        </div>
    );
}   