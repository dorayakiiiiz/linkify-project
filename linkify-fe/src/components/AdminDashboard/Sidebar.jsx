import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import { adminMenu, tools } from "../../constants/dashboard";

export default function Sidebar() {
    const { user, logout } = useAuth();
    const { profile } = useProfile();
    const navigate = useNavigate();
    const location = useLocation();
    
    // lưu index của menu cha đang dc mở
    const [openIndex, setOpenIndex] = useState(0); 
    // lưu trạng thái bật tắt của user dropdown
    const [dropdown, setDropdown] = useState(false);
    // lưu trạng thái đăng xuất
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleToggleDropdown = () => {
        setDropdown(!dropdown);
    }

    // Map Label sang URL 
    const getPath = (label) => {
        const map = {
            'User': '/dashboard/admin/users',
            'Links': '/dashboard/admin/links',
            'Shop': '/dashboard/admin/shop',
            'Theme': '/dashboard/admin/themes'
        };
        return map[label] || '/dashboard/admin/users';
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

    const handleLogout = () => {
        if (isLoggingOut) 
            return;
        setIsLoggingOut(true);
        setTimeout(() => {
            logout();
        }, 1000);
    }

    return (
        <div className="bg-[#ecede8] lg:w-[280px] md:w-[200px] rounded-tl-xl relative flex-shrink-0 hidden md:block h-full border-r border-[#d7d6d4]">
            {/* User Info & Noti */}
            <div className="flex justify-between items-center px-[12px] py-[8px] mt-1">
                <div 
                    className="relative flex items-center gap-1.5 px-2 py-[4px] -mx-2 hover:bg-[#d7d4cd] hover:cursor-pointer hover:rounded-xl"
                    onClick={handleToggleDropdown}    
                >
                    <img
                        src="/admin_avatar.png"
                        className="h-[26px]"
                        alt="avatar"
                    />
                    <p className="ml-[4px] text-[#37181B] font-bold">
                        {user?.displayName}
                    </p>
                    <i className={`fa-solid fa-angle-down text-[10px] pt-1 ml-auto mr-1 transition-transform duration-300 ${dropdown? "rotate-180" : ""}`}/>

                    <div 
                        className={`text-[#212529] absolute shadow-xl top-[calc(100%+4px)] w-[200px] bg-[#fff] rounded-xl flex flex-col ${dropdown ? 'scale-100' : 'scale-0'} transition duration-200`}
                        onClick={e => e.stopPropagation()}
                    >

                        <div className="border-b border-[#e0dfde]">
                            <div className="pl-[16px] py-[4px] mx-[4px] mt-[4px] rounded-md hover:bg-[#F1F0EE]">
                                <i className="fa-regular fa-user mr-[6px]"></i>
                                Account
                            </div>

                            <div className="pl-[16px] py-[4px] mx-[4px] mb-[4px] rounded-md hover:bg-[#F1F0EE]">
                                <i className="fa-regular fa-circle-question mr-[6px]"></i>
                                Help
                            </div>         
                        </div>

                        <div 
                            className={`pl-[16px] py-[4px] m-[4px] rounded-md transition-all duration-200
                                ${isLoggingOut ? 'bg-gray-100 text-gray-400 cursor-wait' : 'hover:bg-[#F1F0EE] cursor-pointer'}`}
                            onClick={handleLogout}
                        >
                            {isLoggingOut ? (
                                <div className="flex items-center">
                                    <i className="fa-solid fa-circle-notch fa-spin mr-[6px]"></i>
                                    <span>Logging out...</span>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <i className="fa-solid fa-arrow-right-from-bracket mr-[6px]"></i>
                                    <span>Log out</span>
                                </div>
                            )}
                        </div> 

                         
                        
                    </div>
                </div>


                <span className="px-2 py-2 -mx-2 -my-2 hover:bg-[#d7d4cd] hover:cursor-pointer hover:rounded-xl">
                    <i className="fa-regular fa-bell "></i>
                </span>
            </div>

            {/* 2. Menu Items */}
            <div className="overflow-y-auto h-[calc(100%-120px)]">
                <div className="px-3 py-2">
                    {adminMenu.map((item, index) => {
                        const parentActive = isParentActive(item);
                        
                        return (
                            <div key={item.label} className="mb-1">
                                {/* Main Item */}
                                <div
                                    onClick={() => handleMainClick(item, index)}
                                    // đang active mà ko subitem thì / đang active mà có subitem thì
                                    className={`flex text-[#37181B] items-center py-2 px-1 -mx-1 transition-all duration-150 cursor-pointer
                                        ${parentActive && item.hasDropdown 
                                            ? "hover:bg-[#E2E2DF] hover:rounded-xl" // Active nhưng là dropdown cha
                                            : parentActive && !item.hasDropdown
                                                ? "bg-[#E2E2DF] font-bold rounded-xl" // Active và là link đơn
                                                : "hover:bg-[#E2E2DF] hover:rounded-xl" // Inactive
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
                                    <div className="ml-6 mt-1 space-y-1 text-[#37181B]">
                                        {item.subItems.map((sub) => (
                                            <div
                                                key={sub.label}
                                                onClick={() => handleSubClick(sub.label)}
                                                className={`py-1.5 px-2 rounded-md cursor-pointer text-sm transition-all duration-150
                                                    ${isActive(sub.label)
                                                        ? "bg-[#E2E2DF] font-bold"
                                                        : "hover:bg-[#E2E2DF]"
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
            </div>

            {/* 4. Bottom Actions  */}
            <div className="px-3 py-3 mb-3 flex justify-between w-full absolute bottom-0 bg-[#ecede8]">
                <i className="fa-regular fa-circle-question pl-2 pr-7 py-2 -mx-2 -my-2 hover:bg-[#d7d4cd] hover:cursor-pointer hover:rounded-full text-lg"></i>
                <i className="fa-solid fa-bullhorn pl-2 pr-7 py-2 -mx-2 -my-2 hover:bg-[#d7d4cd] hover:cursor-pointer hover:rounded-full text-lg"></i>
            </div>
        </div>
    );
}