
import { useProfile } from "../../../context/ProfileContext";
import { THEMES } from "../../../constants/themes";

export default function ThemeDesign() {
    const { profile, updateDesign } = useProfile();

    const handleSelectTheme = (theme) => {
        if (!theme.design) return;
        updateDesign(theme.design);
    };

    // Helper: Tạo style cho nền (Background)
    const getBackgroundStyle = (bg) => {
        if (bg.type === 'image' && bg.imageUrl) {
            return { 
                backgroundImage: `url(${bg.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            };
        }
        if (bg.type === 'gradient') {
            return { background: `linear-gradient(${bg.direction}, ${bg.value}, ${bg.toColor})` };
        }
        // Mặc định là màu đơn (fill)
        return { backgroundColor: bg.value };
    };

    // Helper: Tạo style cho nút (Button)
    const getButtonStyle = (btn) => {
        const style = {
            backgroundColor: btn.color,
            color: btn.textColor,
            border: 'none',
            boxShadow: 'none'
        };

        // 1. Hình dáng (Shape)
        if (btn.shape === 'round') style.borderRadius = '9999px';
        else if (btn.shape === 'medium') style.borderRadius = '12px';
        else style.borderRadius = '0px'; // square

        // 2. Kiểu (Style)
        if (btn.style === 'outline') {
            style.backgroundColor = 'transparent';
            style.border = `1px solid ${btn.color}`;
            // Với outline, thường màu chữ sẽ giống màu viền nếu không có chỉ định khác
            // style.color = btn.color; 
        } else if (btn.style === 'glass') {
            style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            style.backdropFilter = 'blur(4px)';
            style.border = '1px solid rgba(255, 255, 255, 0.3)';
        }

        // 3. Bóng đổ (Shadow) - Giả lập nhẹ cho preview
        if (btn.shadowStyle && btn.shadowStyle !== 'none') {
             style.boxShadow = `0 2px 4px ${btn.shadowColor}66`;
        }

        return style;
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Themes</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {THEMES.map((theme) => {
                    const isSelected = profile?.design?.themeId === theme.id;
                    const { design } = theme;
                    
                    return (
                        <div 
                            key={theme.id} 
                            className="flex flex-col items-center cursor-pointer group"
                            onClick={() => handleSelectTheme(theme)}
                        >
                            {/* Khung Preview (Tỷ lệ 2:3 hoặc 3:4 tùy ý, ở đây dùng pt-[150%] cho dáng điện thoại) */}
                            <div className="relative w-full pt-[150%] mb-2">
                                <div 
                                    className={`
                                        absolute inset-0 
                                        rounded-xl 
                                        border-2 
                                        overflow-hidden
                                        transition-all duration-200
                                        ${isSelected 
                                            ? 'border-black ring-1 ring-black shadow-md' 
                                            : 'border-transparent hover:shadow-lg hover:-translate-y-1'
                                        }
                                    `}
                                >
                                    {/* --- LỚP 1: NỀN (BACKGROUND) --- */}
                                    <div 
                                        className="absolute inset-0 w-full h-full"
                                        style={getBackgroundStyle(design.background)}
                                    />

                                    {/* --- LỚP 2: NỘI DUNG PREVIEW (Aa + Button) --- */}
                                    {/* Chỉ hiển thị nếu không phải là icon (Custom) */}
                                    {theme.type !== 'icon' && (
                                        <div className="absolute inset-0 p-3 flex flex-col justify-between">
                                            
                                            {/* Phần trên: Chữ Aa (Preview Font & Màu chữ) */}
                                            <div className="flex justify-between items-start">
                                                <span 
                                                    className="text-3xl font-bold leading-none"
                                                    style={{ 
                                                        color: design.header.color,
                                                        fontFamily: design.header.font 
                                                    }}
                                                >
                                                    Aa
                                                </span>

                                                {/* Icon Premium (nếu có) */}
                                                {theme.premium && (
                                                    <div className="bg-black/40 backdrop-blur-sm text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                                                        <i className="fa-solid fa-bolt"></i>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Phần dưới: Button Preview */}
                                            <div 
                                                className="w-full h-10 flex items-center justify-center"
                                                style={getButtonStyle(design.buttons)}
                                            >
                                                {/* Vạch giả text bên trong nút */}
                                                <div 
                                                    className="h-1.5 w-1/2 rounded-full opacity-60"
                                                    style={{ backgroundColor: design.buttons.textColor }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    {/* --- LỚP 3: ICON (Cho theme Custom) --- */}
                                    {theme.type === 'icon' && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                            <i className="fa-solid fa-palette text-2xl text-gray-600"></i>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Tên Theme */}
                            <span className={`text-sm font-medium text-center ${isSelected ? 'text-black' : 'text-gray-500'}`}>
                                {theme.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}