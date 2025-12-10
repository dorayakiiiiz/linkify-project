import React from 'react';

// --- Mảng Dữ liệu Mẫu ---
const wallpaperStyles = [
    { 
        id: 'fill', 
        label: 'Fill', 
        icon: null, 
        premium: false, 
        selected: true, 
        bgColor: 'bg-white', 
        borderClass: 'border border-gray-200 shadow-[0_0_0_2px_black]',
        contentClass: 'w-full h-full bg-white rounded-xl'
    },
    { 
        id: 'gradient', 
        label: 'Gradient', 
        icon: null, 
        premium: false, 
        selected: false, 
        bgColor: 'bg-white', 
        borderClass: 'border border-gray-200',
        // Arbitrary value for gradient background (kết hợp custom CSS hoặc dùng gradient classes nếu có config)
        contentClass: 'w-full h-full rounded-xl bg-gradient-to-tr from-gray-300 to-white'
    },
    { 
        id: 'blur', 
        label: 'Blur', 
        icon: null, 
        premium: false, 
        selected: false, 
        bgColor: 'bg-white', 
        borderClass: 'border border-gray-200',
        contentClass: 'w-full h-full bg-white rounded-xl' 
    },
    { 
        id: 'pattern', 
        label: 'Pattern', 
        icon: null, 
        premium: false, 
        selected: false, 
        bgColor: 'bg-white', 
        borderClass: 'border border-gray-200',
        // Placeholder cho Pattern: cần custom utility hoặc background image
        contentClass: 'w-full h-full rounded-xl bg-gray-100' 
    },
    { 
        id: 'image', 
        label: 'Image', 
        icon: 'fa-image', 
        premium: true, 
        selected: false, 
        bgColor: 'bg-gray-50', 
        borderClass: 'border border-gray-200',
        svgPath: `<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L15 15m0 0l4.586-4.586a2 2 0 012.828 0L22 13m-13 6h6m-3-4V7M3 21h18a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`
    },
    { 
        id: 'video', 
        label: 'Video', 
        icon: 'fa-video', 
        premium: true, 
        selected: false, 
        bgColor: 'bg-gray-50', 
        borderClass: 'border border-gray-200',
        svgPath: `<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.795v6.41a1 1 0 01-1.447.894L15 14M4 7h16a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z" /></svg>`
    },
];

const suggestedColors = [
    { id: 'add', color: 'add', selected: false, icon: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`, border: 'border-dashed border-gray-400' },
    { id: 'white', color: 'bg-white', selected: true, border: 'border-gray-300' },
    { id: 'black', color: 'bg-black', selected: false, border: 'border-gray-300' },
];


export default function WallPaper() {
    return (
        <div className="p-4">
            {/* Tiêu đề lớn (từ ảnh gốc) */}
            
            {/* --- Phần Kiểu Hình nền (Wallpaper Style) --- */}
            <div className="mb-8">
                <h2 className="text-lg font-medium mb-3 text-gray-700">Wallpaper style</h2>
                
                {/* Container cho các Thumbnail */}
                <div className="flex flex-wrap gap-4">
                    {wallpaperStyles.map((style) => (
                        <div key={style.id} className="flex flex-col items-center shrink-0 cursor-pointer">
                            
                            {/* Phần tử chính - Thumbnail */}
                            <div 
                                className={`
                                    w-[150px] lg:w-[100px] h-[175px] lg:h-[125px] 
                                    ${style.bgColor} 
                                    rounded-xl 
                                    flex items-center justify-center 
                                    relative 
                                    ${style.borderClass} 
                                    ${style.selected ? 'shadow-[0_0_0_2px_black]' : 'hover:shadow-md'}
                                `}
                            >
                                {/* Nội dung bên trong (Fill, Gradient, Blur, Pattern) */}
                                {style.svgPath ? (
                                    <>
                                        {/* Icon Image/Video */}
                                        <div dangerouslySetInnerHTML={{ __html: style.svgPath }} />
                                        
                                        {/* Icon Sét (4) */}
                                        {style.premium && (
                                            <div className="absolute top-1 right-1 bg-gray-100 p-0.5 rounded-full">
                                                <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M11.9 14.7a.8.8 0 01-.6.3.8.8 0 01-.6-.3L7 9.3v-2a.8.8 0 01.8-.8h1.4l.2-2a.8.8 0 011.6 0l.2 2h1.4a.8.8 0 01.8.8v2l-4.7 5.4z" /></svg>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    // Dùng div riêng cho Fill/Gradient/Blur/Pattern
                                    <div className={style.contentClass}></div>
                                )}
                            </div>
                            
                            <span className="text-sm mt-2 text-center text-gray-700 font-medium">{style.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="my-6 border-t border-gray-200" />
            
            {/* --- Phần Màu Sắc (Color) --- */}
            <div className="mb-4">
                <h2 className="text-lg font-medium mb-3 text-gray-700">Color</h2>
                <div className="flex space-x-3 items-center">
                    
                    {suggestedColors.map((colorOption) => (
                        <div key={colorOption.id} className="cursor-pointer">
                            {/* Vòng tròn Màu/Icon */}
                            <div 
                                className={`
                                    w-8 h-8 
                                    rounded-full 
                                    flex items-center justify-center 
                                    relative 
                                    ${colorOption.border} 
                                    ${colorOption.selected ? 'shadow-[0_0_0_2px_black]' : 'hover:shadow-sm'}
                                `}
                            >
                                {/* Nội dung bên trong (Màu sắc hoặc Icon) */}
                                {colorOption.icon ? (
                                    <div dangerouslySetInnerHTML={{ __html: colorOption.icon }} className="text-gray-600" />
                                ) : (
                                    <div className={`w-7 h-7 ${colorOption.color} rounded-full`}></div>
                                )}
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
            
            {/* Gợi ý */}
            <p className="text-sm text-gray-500">Suggested colors are based on your profile image</p>
        </div>
    );
}