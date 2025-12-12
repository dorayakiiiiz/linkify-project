import { useState, useEffect } from "react";
import { SOCIALS } from "../../constants/socials";


// Map tên font sang class Tailwind (khớp với index.css)
const getFontClass = (fontName) => {
    switch (fontName) {
        case 'Momo Trust': return 'font-momo';
        case 'Quicksand': return 'font-quicksand';
        case 'Roboto': return 'font-roboto';
        case 'Poppins': return 'font-poppins';
        case 'Lato': return 'font-lato';
        case 'Montserrat': return 'font-montserrat';
        case 'Open Sans': return 'font-opensans';
        case 'Playfair': return 'font-playfair';
        // Các font mới
        case 'Merriweather': return 'font-merriweather';
        case 'Nunito': return 'font-nunito';
        case 'Raleway': return 'font-raleway';
        case 'Ubuntu': return 'font-ubuntu';
        case 'PT Serif': return 'font-ptserif';
        case 'Oswald': return 'font-oswald';
        
        case 'Inter': 
        default: return 'font-inter';
    }
};

// Hàm helper lấy class size
const getUsernameSizeClass = (size, isPreview) => {
    // Nếu không phải preview (màn hình desktop thật), ta nhân đôi size lên cho đẹp
    if (!isPreview) {
        switch (size) {
            case 'small': return 'md:text-2xl';
            case 'large':
            default: return 'md:text-4xl';
        }
    }
    
    // Size cho mobile preview
    switch (size) {
        case 'small': return 'text-xl font-semibold';
        case 'large':
        default: return 'text-4xl font-bold';
    }
};

// Hàm helper lấy class bo góc cho button
const getButtonShapeClass = (shape) => {
    switch (shape) {
        case 'square': return 'rounded-none'; // Vuông
        case 'medium': return 'rounded-xl';  // Tròn 2 đầu
        case 'round': 
        default: return 'rounded-full';        // Bo nhẹ (Medium)
    }
};

// Helper chuyển Hex sang RGBA để làm mờ màu
const hexToRgba = (hex, alpha = 1) => {
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
    }
    return hex;
}
export default function LinkTreePreview({
    profile, // lấy được cái profile hiện tại từ ProfileContext
    loading,
    links,
    loadingLinks,
    products,
    loadingProducts,
    isPreview = false,
    tab = "link",
}) {

    // Component Skeleton cho các nút Link
    const ListSkeleton = () => (
        <div className="w-full flex flex-col gap-3 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className={`h-[50px] ${!isPreview ? "md:h-[70px]" : ""
                        } bg-white rounded-xl shadow text-center font-medium hover:scale-[1.02] transition-transform truncate`}
                ></div>
            ))}
        </div>
    );

    const now = new Date();

    const [isLinkTab, setIsLinkTab] = useState(tab === "link");

    useEffect(() => {
        setIsLinkTab(tab === "link");
    }, [tab]);

    //dùng profile để update khi có thay đổi
    const design = profile?.design || {};

    //[LẤY TỪ DESIGN ĐỂ RENDER]
    //Background
    const backgroundColor = design.background?.value || '#FFFFFF';
    const backgroundToColor = design.background?.toColor || '#FFFFFF';
    const backgroundType = design.background?.type || 'fill';
    const backgroundImage = design.background?.imageUrl; // Lấy URL ảnh riêng

    //Màu chữ
    const headerColor = design.header?.color || '#000000';
    const pageTextColor = design.text?.color || '#000000';

    //Màu chữ của nút và màu nền nút
    const buttonTextColor = design.buttons?.textColor || '#ffffff';
    const buttonColor = design.buttons?.color || '#000000';
    const buttonStyleType = design.buttons?.style || 'solid'; // Lấy style type
    // Lấy thông tin Shadow
    const shadowStyle = design.buttons?.shadowStyle || 'none';
    const shadowColor = design.buttons?.shadowColor || '#000000';

    //Lấy font class từ design
    const headerFontClass = getFontClass(design.header?.font);
    const pageFontClass = getFontClass(design.text?.font); // Dùng cho body text và buttons

    // Lấy size class
    const usernameSizeClass = getUsernameSizeClass(design.header?.sizeUsername, isPreview);

    // Lấy shape class
    const buttonShapeClass = getButtonShapeClass(design.buttons?.shape);

    
    // TÍNH TOÁN STYLE CHO BACKGROUND
    const getPageBackground = () => {


        if (backgroundType === 'image') {
            // Ưu tiên dùng imageUrl
            if (backgroundImage) {
                return {
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: backgroundColor // Fallback color
                };
            }
            // Nếu type=image nhưng không có imageUrl (lỗi data cũ), thử dùng value nếu nó là URL
            if (backgroundColor.startsWith('http')) {
                 return {
                    backgroundImage: `url(${backgroundColor})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                };
            }
             // Fallback cuối cùng
            return { backgroundColor: backgroundColor };
        }
        
        if (backgroundType === 'gradient') {
            // Gradient: Từ màu chọn -> Trắng (để thấy rõ hiệu ứng dải màu)
            return {
                background: `linear-gradient(180deg, ${backgroundColor} 0%, ${backgroundToColor} 100%)`,
            };
        }
        if (backgroundType === 'blur') {
            // Blur (giả lập bằng Radial Gradient): Màu chọn ở tâm -> Trắng ở viền
            return {
                background: `radial-gradient(circle, ${backgroundColor} 0%, ${backgroundToColor} 100%)`,
            };
        }
        // Default Fill: Chỉ màu nền đặc
        return {
            backgroundColor: backgroundColor
        };
    };

    const pageBackgroundStyle = getPageBackground();

    // TÍNH TOÁN STYLE CHO BUTTON
    const getButtonStyle = () => {
        const baseStyle = {
            color: buttonTextColor,
            transition: 'all 0.3s ease',
        };

        // Tính toán Box Shadow
        let boxShadow = 'none';
        switch (shadowStyle) {
            case 'subtle':
                boxShadow = `0 4px 6px -1px ${hexToRgba(shadowColor, 0.1)}, 0 2px 4px -1px ${hexToRgba(shadowColor, 0.06)}`;
                break;
            case 'strong':
                boxShadow = `0 10px 15px -3px ${hexToRgba(shadowColor, 0.3)}, 0 4px 6px -2px ${hexToRgba(shadowColor, 0.15)}`;
                break;
            case 'hard':
                // Hard shadow kiểu retro/brutalism (đổ bóng cứng, không mờ)
                boxShadow = `4px 4px 0px 0px ${shadowColor}`;
                break;
            case 'none':
            default:
                boxShadow = 'none';
                break;
        }

        // Tính toán Background & Border cho button (Logic cũ)
        let styleProps = {};
        switch (buttonStyleType) {
            case 'glass':
                styleProps = {
                    backgroundColor: hexToRgba(buttonColor, 0.5),
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                };
                break;
            case 'outline':
                styleProps = {
                    backgroundColor: hexToRgba(buttonColor, 0.2),
                    border: '2px solid white'
                };
                break;
            case 'solid':
            default:
                styleProps = {
                    backgroundColor: buttonColor,
                    border: '2px solid transparent'
                };
                break;
        }

        return {
            ...baseStyle,
            ...styleProps,
            boxShadow: boxShadow // Áp dụng shadow
        };
    };


    const dynamicButtonStyle = getButtonStyle();

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div
                className={`relative w-full p-[20px] max-w-[580px] h-full ${!isPreview ? "md:h-[1160px] md:rounded-4xl" : "md:h-[580px]"
                    } bg-[#ECEEF1] shadow-2xl overflow-y-auto no-scrollbar flex flex-col items-center`}
                    style={pageBackgroundStyle} 
            >
                {/* content */}
                {/* <div className="w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center"> */}
                <div className="w-full flex justify-between items-center">
                    <div
                        className={`${!isPreview ? "w-10 h-10" : "w-[34px] h-[34px]"
                            } rounded-full bg-white flex justify-center items-center`}
                    >
                        <i className="fa-brands fa-linktree"></i>
                    </div>
                    <div
                        className={`${!isPreview ? "w-10 h-10" : "w-[34px] h-[34px]"
                            } rounded-full bg-white flex justify-center items-center`}
                    >
                        <i className="fa-regular fa-bell"></i>
                    </div>
                </div>

                {loading ? (
                    <div className="w-full flex flex-col items-center animate-pulse mt-2">
                        {/* avatar skeleton */}
                        <div className="w-20 h-20 rounded-full bg-gray-300 mb-4 border-2 border-white/20"></div>
                        {/* name skeleton */}
                        <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
                        {/* bio skeleton */}
                        <div className="h-3 w-48 bg-gray-300 rounded mb-6"></div>
                        {/* links skeleton */}
                        <ListSkeleton />
                    </div>
                ) : (
                    <div className="w-full  flex flex-col items-center">
                        {/* avatar */}
                        <div
                            className={`w-20 h-20 mt-2 ${!isPreview ? "md:w-[120px] md:h-[120px]" : "md:w-15 md:h-15 lg:w-20 lg:h-20"
                                } rounded-full overflow-hidden border-2 border-white shadow-sm mb-4 shrink-0`}
                        >
                            <img
                                src={profile?.avatarUrl || "/anonymous-avatar.jpg"}
                                className="w-full h-full object-cover"
                                alt="avatar"
                            />
                        </div>

                        {/* info */}
                        <h2
                            className={`font-bold ${usernameSizeClass} text-center mb-1 ${headerFontClass}`}
                            style={{ color: headerColor }} // <--- SỬA Ở ĐÂY: Dùng style inline
                        >
                            {profile?.username || "@username"}
                        </h2>
                        <p
                            className={`${!isPreview ? "md:text-xl" : ""
                                } text-center ${!isPreview ? "mb-[30px]" : "mb-5"
                                } px-2 ${pageFontClass}`}
                            style={{ color: pageTextColor }} // <--- SỬA Ở ĐÂY: Dùng style inline (hoặc pageTextColor nếu muốn)
                        >
                            {profile?.bio}
                        </p>

                        {/* toggle đổi giữa link và shop */}
                        <div className="relative flex items-center justify-center bg-[#8D8F90] font-bold font-quicksand p-1 rounded-full mb-[30px]">
                            {/* lớp trắng che trượt qua lại */}
                            <div
                                className={`absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out ${isLinkTab ? "translate-x-0" : "translate-x-full"
                                    }`}
                            ></div>

                            <div
                                className={`z-10 px-[18px] py-1.5  ${!isPreview ? "md:px-[30px] md:py-2.5" : "md:px-3.5 md:py-0.5"
                                    } rounded-full text-center cursor-pointer transition-colors duration-300 ${isLinkTab ? "text-black" : "text-white"
                                    }`}
                                onClick={() => setIsLinkTab(true)}
                            >
                                Link
                            </div>

                            <div
                                className={`z-10 px-[18px] py-1.5 ${!isPreview ? "md:px-[30px] md:py-2.5" : "md:px-3.5 md:py-0.5"
                                    } rounded-full text-center cursor-pointer transition-colors duration-300 ${!isLinkTab ? "text-black" : "text-white"
                                    }`}
                                onClick={() => setIsLinkTab(false)}
                            >
                                Shop
                            </div>
                        </div>

                        {/* links list */}
                        <div className="w-full flex-1 flex flex-col gap-5">
                            {isLinkTab &&
                                (loadingLinks ? (
                                    <ListSkeleton />
                                ) : (
                                    <>
                                        {links.map((link) => {
                                            if (!link.isEnable) return null;

                                            if (
                                                link.scheduledEnable &&
                                                now < new Date(link.scheduledEnable)
                                            )
                                                return null;

                                            if (
                                                link.scheduledDisable &&
                                                now > new Date(link.scheduledDisable)
                                            )
                                                return null;

                                            const social = SOCIALS.find((social) => social.name === link.title);

                                            let icon = social?.icon;
                                            let color = social?.color;

                                            if (!icon || !color) {
                                                icon = 'fa-solid fa-earth-asia';
                                                color = '#48c62b';
                                            }

                                            return (
                                                <a
                                                    key={link._id}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`flex justify-center py-3 ${!isPreview ? "md:py-5 md:mx-[40px]" : "md:py-2"
                                                        } ${buttonShapeClass} shadow text-center font-medium hover:scale-[1.02] transition-transform truncate ${pageFontClass}`}
                                                    // SỬA Ở ĐÂY: Dùng style inline cho background và color
                                                    style={dynamicButtonStyle}
                                                >

                                                    <div className={`${!isPreview ? 'text-xl md:text-2xl lg:text-3xl' : ''} mr-[10px]`}>
                                                        {/* SỬA Ở ĐÂY: Xóa class text-${buttonTextColor} vì thẻ cha (<a>) đã có color rồi */}
                                                        {icon && <i className={`${icon}`} />}
                                                    </div>
                                                    <div className={`${!isPreview ? `md:text-xl lg:text-2xl` : ''}`}>
                                                        {/* SỬA Ở ĐÂY: Xóa class text-${buttonTextColor} */}
                                                        {link.title}
                                                    </div>
                                                </a>
                                            );
                                        })}
                                        {links.length === 0 && (
                                            <div className="text-center text-gray-400 mt-10">
                                                No links added yet
                                            </div>
                                        )}
                                    </>
                                ))}

                            {!isLinkTab &&
                                (loadingProducts ? (
                                    <ListSkeleton />
                                ) : (
                                    <>
                                        {products && products.map((product) => {
                                            if (!product.isEnable) return null;

                                            if (
                                                product.scheduledEnable &&
                                                now < new Date(product.scheduledEnable)
                                            )
                                                return null;

                                            if (
                                                product.scheduledDisable &&
                                                now > new Date(product.scheduledDisable)
                                            )
                                                return null;

                                            return (
                                                <a
                                                    key={product._id}
                                                    href={product.buyLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`py-3 ${!isPreview ? "md:py-5 md:mx-[50px]" : ""
                                                        } bg-white rounded-xl shadow text-center font-medium hover:scale-[1.02] transition-transform block`}
                                                >
                                                    <div className="flex flex-col items-center justify-center gap-[4px] px-4">
                                                        {product.imageUrl ? (
                                                            <img
                                                                src={product.imageUrl}
                                                                alt={product.name}
                                                                className="w-full max-w-[250px] h-full max-h-[250px] object-cover rounded shrink-0"
                                                            />
                                                        ) : (
                                                            <i className="fa-solid fa-shop text-purple-600 text-sm"></i>
                                                        )}

                                                        <span className="w-full">{product.name}</span>

                                                        <span className="text-purple-600 font-semibold shrink-0">
                                                            ${product.price}
                                                        </span>
                                                    </div>
                                                </a>
                                            );
                                        })}

                                        {/* Logic hiển thị empty state giống Link */}
                                        {(!products || products.length === 0) && (
                                            <div className="text-center text-gray-400 mt-10">
                                                No products available
                                            </div>
                                        )}
                                    </>
                                ))}

                            <div className="mt-auto mb-[30px]">
                                <div
                                    className={`py-3 px-1 ${!isPreview ? "md:py-5 md:mx-5" : "text-sm"
                                        } font-bold bg-white text-center rounded-4xl shadow flex items-center justify-center cursor-pointer`}
                                >
                                    Join {profile.username} on Linktree
                                </div>
                                {/* <div className="flex justify-center gap-3 text-[10px] my-2">
                                        <span>Report</span>
                                        <span>.</span>
                                        <span>Privacy</span>
                                    </div> */}
                            </div>
                        </div>
                    </div>
                )}
                {/* </div> */}
            </div>
        </div>
    );
}
