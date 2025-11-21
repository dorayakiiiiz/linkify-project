import { sampleThemes } from "../../../constants/dashboard"

export default function ThemeDesign() {

    return (
        <div>
            {/* Bố cục Lưới cho các Chủ đề (5 cột) */}
            <div className="grid grid-cols-5 gap-4">
                {sampleThemes.map((theme) => (
                    <div key={theme.id} className="flex flex-col items-center cursor-pointer">
                        {/* Container Thẻ Xem trước (Theme Card) */}
                        <div 
                            // Dùng class 'aspect-w-4 aspect-h-5' để giữ tỷ lệ 4:5 nếu bạn dùng @tailwindcss/aspect-ratio
                            // Nếu không dùng plugin, ta dùng padding-top trick bằng arbitrary values:
                            className="
                                relative w-full pt-[125%] 
                                mb-2
                                group
                            "
                        >
                            {/* Nội dung Thẻ */}
                            <div 
                                className={`
                                    absolute inset-0 
                                    ${theme.color} 
                                    rounded-xl 
                                    flex flex-col items-center justify-center 
                                    text-4xl font-bold 
                                    transition duration-150 ease-in-out
                                    ${theme.text || 'text-gray-800'}
                                    ${theme.border ? 'border' : ''}
                                    
                                    /* Hiệu ứng Viền Đã chọn */
                                    ${theme.selected 
                                        ? 'shadow-[0_0_0_2px_black]' 
                                        : 'hover:shadow-md'
                                    }
                                `}
                                // Lưu ý: bgClass sẽ cần CSS tùy chỉnh nếu đó là ảnh/gradient phức tạp
                            >
                                {/* Hiển thị nội dung: Icon hoặc Text 'Aa' */}
                                {theme.type === 'icon' ? (
                                    /* Icon Cọ (Brush) */
                                    <svg className="w-6 h-6 text-gray-700 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                ) : (
                                    theme.content
                                )}
                                
                                {/* Icon Sét (Premium) */}
                                {theme.premium && (
                                    <div className="absolute top-2 right-2 bg-white p-0.5 rounded-full shadow-sm">
                                        <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M11.9 14.7a.8.8 0 01-.6.3.8.8 0 01-.6-.3L7 9.3v-2a.8.8 0 01.8-.8h1.4l.2-2a.8.8 0 011.6 0l.2 2h1.4a.8.8 0 01.8.8v2l-4.7 5.4z" /></svg>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Tên Chủ đề */}
                        <span className="text-sm text-center text-gray-700">{theme.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}