import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import { adminMenu, tools } from "../../constants/dashboard";
import AccountSettingModal from "../Modal/AccountSettingModal";

export default function Sidebar() {
    const { user, logout } = useAuth();
    const { profile } = useProfile();
    const navigate = useNavigate();
    const location = useLocation();
    
    // lưu index của menu cha đang dc mở
    const [openIndex, setOpenIndex] = useState(0); 
    // lưu trạng thái bật tắt của user dropdown
    const [dropdown, setDropdown] = useState(false);
    // lưu trạng thái đang đăng xuất (cho hiệu ứng spinner)
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    
    const handleToggleDropdown = () => {
        setDropdown(!dropdown);
    }

    // ref cho user dropdown menu
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // nếu dropdown đang mở và click không nằm trong dropdownRef -> đóng lại
            if (dropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdown]);

    // Map Label sang URL 
    const getPath = (label) => {
        const map = {
            'User': '/dashboard/admin/users',
            'Links': '/dashboard/admin/links',
            'Shop': '/dashboard/admin/shop',
            'Analytics': '/dashboard/admin/analytics'
        };
        return map[label] || '/dashboard/admin/users';
    };


    // Check xem item nào đang active dựa vào URL hiện tại
    const isActive = (label) => {
        const path = getPath(label);
        return location.pathname === path;
    };

    const handleClick = (item, index) => {
        navigate(getPath(item.label));
    };

    const handleSubClick = (subLabel) => {
        navigate(getPath(subLabel));
    };

    const handleAccountSetting = () => {
        setIsAccountModalOpen(true);
        setDropdown(false);
    }

    const handleLogout = () => {
        if (isLoggingOut) 
            return;
        setIsLoggingOut(true);
        setTimeout(() => {
            logout();
        }, 1000);
    }

    return (
        <div className="bg-[#f1f0ee] w-[90px] lg:w-[280px] rounded-tl-xl relative flex-shrink-0 hidden md:block h-full border-r border-[#d7d6d4]">
            {isAccountModalOpen && (
                <AccountSettingModal 
                    onClose={() => setIsAccountModalOpen(false)}
                />
            )}

            {/* User Info & Noti */}
            <div className="flex border-b border-gray-300 justify-between items-center px-5 py-2 my-2.5">
                <div 
                    ref={dropdownRef}
                    className="relative flex items-center gap-1.5 px-2 py-[4px] -mx-2 hover:bg-[#d7d4cd] hover:cursor-pointer hover:rounded-xl"
                    onClick={handleToggleDropdown}    
                >
                    <img
                        src="/admin_avatar.png"
                        className="h-[30px] rounded-full"
                        alt="avatar"
                    />
                    <p className="ml-[4px] text-[#37181B] font-bold hidden lg:block">
                        {user?.displayName}
                    </p>
                    <i className={`fa-solid fa-angle-down text-[10px] pt-1 ml-auto mr-1 transition-transform duration-300 ${dropdown? "rotate-180" : ""}`}/>

                    <div 
                        className={`text-[#212529] absolute shadow-xl top-[calc(100%+4px)] w-[200px] bg-[#fff] rounded-xl flex flex-col ${dropdown ? 'scale-100' : 'scale-0'} transition duration-200`}
                        onClick={e => e.stopPropagation()}
                    >

                        <div 
                            className="pl-[16px] py-[4px] mx-[4px] mt-[4px] rounded-md hover:bg-[#F1F0EE]"
                            onClick={handleAccountSetting}
                        >
                            <i className="fa-regular fa-user mr-[6px]"></i>
                            Account
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


                
            </div>

            {/* 2. Menu Items */}
            <div className="overflow-y-auto flex flex-col h-[calc(100%-120px)]">
                <div className="px-6 lg:px-7">
                    {adminMenu.map((item, index) => {
                        return (
                            <div key={item.label} className="mb-1">
                                <div
                                    onClick={() => handleClick(item)}
                                    className={`flex items-center justify-center lg:justify-start py-2 px-2 -mx-2 my-2 rounded-xl cursor-pointer transition-all duration-150
                                        ${isActive(item.label) 
                                            ? "bg-gray-50 shadow-xs font-bold" // Style khi active
                                            : "hover:bg-[#d7d4cd] text-gray-600" // Style mặc định
                                        }`}
                                >
                                    <i className={`${isActive(item.label) ? 'text-blue-500' : ''} w-6 fa-solid py-1 ${item.icon}`} />
                                    <span className="ml-1.5 hidden lg:block">{item.label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="px-6 lg:px-7 text-gray-500 mt-auto cursor-pointer" onClick={handleAccountSetting}>
                <div className="p-2 hover:bg-gray-50 hover:shadow-sm hover:text-blue-600 rounded-xl">
                    <i className="fa-solid fa-gear"></i>
                    <span className="ml-1.5 text-gray-600 hidden lg:inline">Account setting</span>
                </div>
            </div>
        </div>
    );
}