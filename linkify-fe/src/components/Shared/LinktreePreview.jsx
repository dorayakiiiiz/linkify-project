import { useState, useEffect } from "react";
import { analyticService } from "../../services/analyticService";

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

// Helper lấy class shape riêng cho donation (tránh conflict nếu cần)
const getDonationShapeClass = (shape) => {
    switch (shape) {
        case 'square': return 'rounded-none';
        case 'medium': return 'rounded-xl';
        case 'round': default: return 'rounded-full';
    }
};

export default function LinktreePreview({
    profile, // lấy được cái profile hiện tại từ ProfileContext
    loading,
    links,
    loadingLinks,
    products,
    loadingProducts,
    isPreview = false,
    tab = "link",
    extractedColor = null
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

    const handleItemClick = (item, type) => {
        // Nếu đang là chế độ xem trước (trong dashboard) thì KHÔNG track
        if (isPreview) return;

        analyticService.trackEvent({
            profileId: profile._id,
            type: type === 'link' ? 'link_click' : 'shop_click',
            targetId: item._id,
            referrer: document.referrer
        });
    }

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

    // --- LOGIC MÀU SẮC CHO TOGGLE ---
    const getToggleTheme = () => {
        // Mặc định dùng màu nút
        let activeBg = buttonColor;
        let activeText = buttonTextColor;
        let inactiveText = buttonColor;

        // Nếu Background là ẢNH -> Dùng màu trích xuất từ ảnh (extractedColor)
        if (backgroundType === 'image' && extractedColor) {
            // Để nút nổi bật trên nền ảnh, ta dùng màu trích xuất làm điểm nhấn
            // Bg inactive sẽ là trắng mờ (glass), Bg active sẽ là màu trích xuất
            activeBg = extractedColor;
            activeText = '#ffffff'; // Chữ trắng trên nền màu ảnh
            inactiveText = extractedColor; // Chữ màu ảnh trên nền trắng
        } 
        // Nếu Background là Gradient/Màu -> Dùng logic cũ (dựa theo buttonColor) hoặc headerColor để tương phản
        else {
             // Có thể tùy chỉnh thêm logic ở đây nếu muốn
        }

        return { activeBg, activeText, inactiveText };
    };

    const toggleTheme = getToggleTheme();
    
    // TÍNH TOÁN STYLE CHO BACKGROUND
    const getPageBackground = () => {
        if (backgroundType === 'image') {
            if (backgroundImage) return { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: backgroundColor };
            if (backgroundColor.startsWith('http')) return { backgroundImage: `url(${backgroundColor})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' };
            return { backgroundColor: backgroundColor };
        }
        if (backgroundType === 'gradient') return { background: `linear-gradient(180deg, ${backgroundColor} 0%, ${backgroundToColor} 100%)` };
        if (backgroundType === 'blur') return { background: `radial-gradient(circle, ${backgroundColor} 0%, ${backgroundToColor} 100%)` };
        return { backgroundColor: backgroundColor };
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

    // --- [MỚI] HÀM TÍNH STYLE RIÊNG CHO DONATION BUTTON ---
    const getDonationButtonStyle = () => {
        const dConfig = design.donationButton || {};

        // Case 1: Dùng Global Style -> Trả về y hệt nút thường
        if (dConfig.useGlobal) {
            return {
                style: dynamicButtonStyle,
                className: buttonShapeClass
            };
        }

        // Case 2: Dùng Style Riêng
        const customShapeClass = getDonationShapeClass(dConfig.shape);
        const dColor = dConfig.color || '#ff4081'; // Màu mặc định hồng nếu chưa set
        const dTextColor = dConfig.textColor || '#ffffff';

        let customStyleProps = {
            color: dTextColor,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)' // Shadow mặc định nhẹ cho đẹp
        };

        if (dConfig.style === 'outline') {
            customStyleProps.backgroundColor = 'transparent';
            customStyleProps.border = `2px solid ${dColor}`;
            customStyleProps.color = dColor; // Outline thì chữ màu giống viền
        } else if (dConfig.style === 'glass') {
            customStyleProps.backgroundColor = hexToRgba(dColor, 0.6);
            customStyleProps.backdropFilter = 'blur(5px)';
            customStyleProps.border = '1px solid rgba(255,255,255,0.4)';
        } else {
            // Solid
            customStyleProps.backgroundColor = dColor;
            customStyleProps.border = '2px solid transparent';
        }

        return {
            style: customStyleProps,
            className: customShapeClass
        };
    };

    const donationBtnInfo = getDonationButtonStyle();

    // --- [MỚI] STYLE CHO FOOTER ---
    const footerStyle = {
        backgroundColor: design.footer?.backgroundColor || '#ffffff',
        color: design.footer?.textColor || '#6b7280',
    };

    return (
        <div className="w-full h-screen md:h-full flex justify-center items-center">
            <div
                className={`relative w-full h-full p-[30px] md:p-4 max-w-[580px] ${!isPreview ? "md:h-[1160px] md:rounded-4xl py-8" : ""
                    } bg-[#ECEEF1] shadow-2xl overflow-y-auto no-scrollbar flex flex-col items-center`}
                    style={pageBackgroundStyle} 
            >
                {/* content */}
                {/* <div className="w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center"> */}
                <div className="w-full flex justify-between items-center">
                    <a
                        className={`${!isPreview ? "w-10 h-10" : "w-[34px] h-[34px]"
                            } rounded-full cursor-pointer bg-white flex justify-center items-center`}
                            href="/"
                    >
                        <i className="fa-brands fa-linktree"></i>
                    </a>
                    
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
                    <div className="w-full h-full flex flex-col items-center">
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


                        {!loading && profile?.donation?.isEnabled && (
                            <div className={`${isPreview ? 'mb-4' : 'mb-10'} animate-fade-in-up w-full flex justify-center`}>
                                <a 
                                    href={profile.donation.url.match(/^https?:\/\//) ? profile.donation.url : "https://" + profile.donation.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`
                                        py-3 px-6 ${!isPreview ? "md:py-4 md:px-8" : "md:py-2 md:px-4"} 
                                        flex items-center justify-center gap-2.5 font-bold cursor-pointer 
                                        ${!isPreview ? 'md:text-xl' : 'text-sm'}
                                        hover:scale-[1.02] active:scale-95 transition-transform
                                        ${donationBtnInfo.className} 
                                    `}
                                    style={donationBtnInfo.style}
                                >
                                    {/* Render Icon nếu có và không phải global style (hoặc global cũng hiện nếu muốn, ở đây t để hiện luôn cho đẹp) */}
                                    {design.donationButton?.icon && (
                                        <i className={`${design.donationButton.icon} ${!isPreview ? 'text-xl' : ''}`}></i>
                                    )}
                                    
                                    {profile.donation.text || "Support Me"}
                                </a>
                            </div>
                        )}
                        {/* toggle đổi giữa link và shop */}
                        <div 
                            className={`${products.length === 0 && 'hidden'} relative flex items-center justify-center font-bold font-quicksand p-1 rounded-full mb-[30px] shadow-sm backdrop-blur-sm`}
                            style={{ 
                                // Nền của thanh toggle: Nếu là ảnh -> dùng màu trắng mờ, Nếu là màu -> dùng màu nút mờ
                                backgroundColor: backgroundType === 'image' ? 'rgba(255, 255, 255, 0.25)' : hexToRgba(toggleTheme.inactiveText, 0.15),
                                border: backgroundType === 'image' ? '1px solid rgba(255,255,255,0.3)' : 'none'
                            }}
                        >
                            {/* Lớp trượt (Active Background) */}
                            <div
                                className={`absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] rounded-full shadow-md transition-all duration-300 ease-in-out ${isLinkTab ? "translate-x-0" : "translate-x-full"}`}
                                style={{ backgroundColor: toggleTheme.activeBg }} 
                            ></div>

                            <div
                                className={`z-10 px-[18px] py-1.5 ${!isPreview ? "md:px-[30px] md:py-2.5" : "md:px-3.5 md:py-0.5"} rounded-full text-center cursor-pointer transition-colors duration-300`}
                                onClick={() => setIsLinkTab(true)}
                                style={{ color: isLinkTab ? toggleTheme.activeText : toggleTheme.inactiveText }}
                            >
                                Link
                            </div>

                            <div
                                className={`z-10 px-[18px] py-1.5 ${!isPreview ? "md:px-[30px] md:py-2.5" : "md:px-3.5 md:py-0.5"} rounded-full text-center cursor-pointer transition-colors duration-300`}
                                onClick={() => setIsLinkTab(false)}
                                style={{ color: !isLinkTab ? toggleTheme.activeText : toggleTheme.inactiveText }}
                            >
                                Shop
                            </div>
                        </div>

                        {/* links list */}
                        <div className={`${products.length === 0 && 'mt-3'} w-full flex-1 flex flex-col gap-5`}>
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
                                                    rel="noopener noreferrer"
                                                    onClick={() => handleItemClick(link, 'link')}
                                                    className={`flex justify-center py-4 ${!isPreview ? "md:py-5 md:mx-[40px]" : "md:py-3"
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
                                    <div className="grid grid-cols-2 gap-3 w-full">
                                        {products && products.map((product, index) => {
                                            if (!product.isEnable) return null;

                                            // Check schedule time
                                            if (product.scheduledEnable && now < new Date(product.scheduledEnable)) return null;
                                            if (product.scheduledDisable && now > new Date(product.scheduledDisable)) return null;

                                            // Logic span: Nếu là phần tử cuối cùng VÀ tổng số lẻ -> Full width (col-span-2)
                                            // Hoặc logic: 3 cái -> 2 cái đầu grid, cái 3 full width
                                            const isLastItem = index === products.length - 1;
                                            const isOddTotal = products.length % 2 !== 0;
                                            const spanClass = (isLastItem && isOddTotal) ? "col-span-2" : "col-span-1";
                                            
                                            // Điều chỉnh style nếu là Full width
                                            const containerStyle = (isLastItem && isOddTotal) ? "flex-row text-left p-3" : "flex-col text-center p-3";
                                            const imgStyle = (isLastItem && isOddTotal) ? "w-24 h-24 md:w-32 md:h-32 mr-4" : "w-full aspect-square mb-3";

                                            return (
                                                <a
                                                    key={product._id}
                                                    href={product.buyLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => handleItemClick(product, 'shop')}
                                                    className={`
                                                        ${spanClass} 
                                                        group relative flex ${containerStyle} 
                                                        ${buttonShapeClass} 
                                                        overflow-hidden hover:-translate-y-1 
                                                        transition-transform duration-300
                                                    `}
                                                    style={{
                                                        ...dynamicButtonStyle, // Áp dụng style background, border, shadow, color từ Link
                                                        // Nếu style là 'outline', ta cần đảm bảo nền không trong suốt hoàn toàn đè lên nội dung nếu cần, 
                                                        // nhưng thường outline là transparent. Nếu muốn card dễ đọc hơn có thể thêm background nhẹ ở đây:
                                                        backgroundColor: design.buttons?.style === 'outline' ? 'rgba(255,255,255,0.1)' : dynamicButtonStyle.backgroundColor
                                                    }}
                                                >
                                                    {/* Image Container */}
                                                    <div className={`relative overflow-hidden rounded-lg shrink-0 ${imgStyle} bg-black/5`}>
                                                        {product.imageUrl ? (
                                                            <img
                                                                src={product.imageUrl}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center opacity-50">
                                                                <i className="fa-solid fa-shop text-3xl"></i>
                                                            </div>
                                                        )}
                                                        {/* Quick action button overlay */}
                                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <div className="bg-white/90 p-2 rounded-full shadow-sm backdrop-blur-sm">
                                                                <i className="fa-solid fa-arrow-up-right-from-square text-black text-xs"></i>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Content Info */}
                                                    <div className="flex flex-col justify-between flex-1 min-w-0">
                                                        <div>
                                                            <h3 
                                                                className={`font-semibold line-clamp-2 leading-snug mb-1 ${pageFontClass} ${!isPreview ? "md:text-lg" : "text-sm"}`}
                                                                style={{ color: 'inherit' }} // Kế thừa màu chữ từ thẻ cha (dynamicButtonStyle)
                                                            >
                                                                {product.name}
                                                            </h3>
                                                        </div>
                                                        
                                                        <div className="mt-auto pt-1 flex items-center justify-between">
                                                            <span 
                                                                className="font-bold text-sm md:text-base opacity-90"
                                                                style={{ color: 'inherit' }}
                                                            >
                                                                ${product.price}
                                                            </span>
                                                            {/* Bag Icon Container */}
                                                            <div 
                                                                className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                                                                style={{ backgroundColor: 'rgba(128, 128, 128, 0.2)' }}
                                                            >
                                                                <i 
                                                                    className="fa-solid fa-bag-shopping text-xs text-gray-400 group-hover:text-purple-600"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            );
                                        })}

                                        {/* Empty State */}
                                        {(!products || products.length === 0) && (
                                            <div className="col-span-2 py-10 flex flex-col items-center justify-center text-gray-400 bg-white/50 rounded-2xl border-2 border-dashed border-gray-200">
                                                <i className="fa-solid fa-shop"></i>
                                                <span className="mt-2 text-sm">No products available</span>
                                            </div>
                                        )}
                                    </div>
                                ))}

                            {/* --- HIỂN THỊ FOOTER --- */}
                            {profile?.footerEnable && (
                                <div className="w-full mt-auto pt-8 pb-4 flex justify-center">
                                    <a className="cursor-pointer" href="/">
                                        <div
                                            className={`
                                                py-2 px-4 ${!isPreview ? "md:py-3 md:px-6" : "text-xs"} 
                                                font-bold text-center rounded-3xl shadow-sm flex items-center justify-center gap-2
                                                hover:opacity-90 transition-opacity
                                            `}
                                            style={footerStyle}
                                        >
                                            <i className="fa-brands fa-linktree"></i>
                                            <span>Join {profile.username} on Linkify</span>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {/* </div> */}
            </div>
        </div>
    );
}
