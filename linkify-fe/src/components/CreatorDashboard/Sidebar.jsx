import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import { mainMenu, tools } from "../../constants/dashboard";

export default function Sidebar() {
    const { user } = useAuth();
    const { profile } = useProfile();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [openIndex, setOpenIndex] = useState(0); 

    // Map Label sang URL 
    const getPath = (label) => {
        const map = {
            // Main Menu
            'Links': '/dashboard/links',
            'Shop': '/dashboard/shop',
            'Design': '/dashboard/design',
            'Insights': '/dashboard/insights',
            
            // Tools
            'Post ideas': '/dashboard/tools/post-ideas',
            'Link shortener': '/dashboard/tools/link-shortener',
            'Instagram auto-reply': '/dashboard/tools/instagram-auto-reply'
        };
        return map[label] || '/dashboard/links';
    };


    // Check xem item nào đang active dựa vào URL hiện tại
    const isActive = (label) => {
        const path = getPath(label);
        return location.pathname === path;
    };

    // Check xem Parent (vd: My Linkify) có đang active không (nếu con nó active)
    const isParentActive = (item) => {
        if (item.hasDropdown) {
            return item.subItems.some(sub => isActive(sub.label));
        }
        return isActive(item.label);
    };

    const handleMainClick = (item, index) => {
        if (item.hasDropdown) {
            setOpenIndex(openIndex === index ? null : index);
        } else {
            navigate(getPath(item.label));
        }
    };

    const handleSubClick = (subLabel) => {
        navigate(getPath(subLabel));
    };

    const handleToolClick = (toolLabel) => {
        navigate(getPath(toolLabel));
    };

    return (
        <div className="bg-[#ecede8] lg:w-[280px] md:w-[200px] rounded-tl-xl relative flex-shrink-0 hidden md:block h-full border-r border-[#d7d6d4]">
            {/* 1. User Info & Noti */}
            <div className="flex justify-between items-center px-[12px] py-[8px] mt-1">
                <div className="flex items-center gap-1.5 px-2 py-2 -mx-2 hover:bg-[#d7d4cd] hover:cursor-pointer hover:rounded-xl">
                    <img
                        src={profile?.avatarUrl}
                        className="rounded-full h-[30px] w-[30px]"
                        alt="avatar"
                    />
                    <p className=" text-[#6a6968]">
                        {user?.displayName}
                    </p>
                    <i className="fa-solid fa-angle-down text-[10px] pt-1 text-[#6a6968]"></i>
                </div>
                <span className="px-2 py-2 -mx-2 -my-2 hover:bg-[#d7d4cd] hover:cursor-pointer hover:rounded-xl">
                    <i className="fa-regular fa-bell "></i>
                </span>
            </div>

            {/* 2. Menu Items */}
            <div className="overflow-y-auto h-[calc(100%-120px)]">
                <div className="px-3 py-2">
                    {mainMenu.map((item, index) => {
                        const parentActive = isParentActive(item);
                        
                        return (
                            <div key={item.label} className="mb-1">
                                {/* Main Item */}
                                <div
                                    onClick={() => handleMainClick(item, index)}
                                    // đang active mà ko subitem thì / đang active mà có subitem thì
                                    className={`flex items-center py-2 px-1 -mx-1 transition-all duration-150 cursor-pointer
                                        ${parentActive && item.hasDropdown 
                                            ? "hover:bg-[#d7d4cd] hover:rounded-xl text-[#6a6968]" // Active nhưng là dropdown cha
                                            : parentActive && !item.hasDropdown
                                                ? "bg-[#d7d4cd] font-semibold text-black rounded-xl" // Active và là link đơn
                                                : "hover:bg-[#d7d4cd] hover:rounded-xl text-[#6a6968]" // Inactive
                                        }`}
                                >
                                    <i className={`fa-solid ${item.icon}`} />
                                    <span className="ml-1.5">{item.label}</span>
                                    {item.hasDropdown && (
                                        <i className={`fa-solid fa-angle-down text-[10px] pt-1 ml-auto mr-1 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}/>
                                    )}
                                </div>

                                {/* Sub Items Dropdown */}
                                {item.hasDropdown && openIndex === index && (
                                    <div className="ml-6 mt-1 space-y-1">
                                        {item.subItems.map((sub) => (
                                            <div
                                                key={sub.label}
                                                onClick={() => handleSubClick(sub.label)}
                                                className={`py-1.5 px-2 rounded-md cursor-pointer text-sm transition-all duration-150
                                                    ${isActive(sub.label)
                                                        ? "bg-[#d7d4cd] font-semibold text-black"
                                                        : "hover:bg-[#d7d4cd] text-[#6a6968]"
                                                    }`}
                                            >
                                                {sub.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* 3. Tools Section */}
                <div className="px-3 py-2">
                    <div className="text-s font-medium text-[#9c9b95] w-[32px] pb-2">
                        Tools
                    </div>
                    {tools.map((t) => (
                        <div
                            key={t.label}
                            onClick={() => handleToolClick(t.label)} 
                            className={`flex items-center py-2 px-2 -mx-2 my-2 rounded-xl cursor-pointer transition-all duration-150
                                ${isActive(t.label) 
                                    ? "bg-[#d7d4cd] font-semibold text-black" // Style khi active
                                    : "hover:bg-[#d7d4cd] text-black" // Style mặc định
                                }`}
                        >
                            <i className={t.icon}></i>
                            <span className="ml-1.5">{t.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Bottom Actions  */}
            <div className="px-3 py-3 mb-3 flex justify-between w-full absolute bottom-0 bg-[#ecede8]">
                <i className="fa-regular fa-circle-question pl-2 pr-7 py-2 -mx-2 -my-2 hover:bg-[#d7d4cd] hover:cursor-pointer hover:rounded-full text-lg"></i>
                <i className="fa-solid fa-bullhorn pl-2 pr-7 py-2 -mx-2 -my-2 hover:bg-[#d7d4cd] hover:cursor-pointer hover:rounded-full text-lg"></i>
            </div>
        </div>
    );
}