import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import { creatorMenu, tools } from "../../constants/dashboard";
import AccountSettingModal from "../Modal/AccountSettingModal";
// import UserSettingDropDown from "../../pages/CreatorDashboard/Modal/UserSettingDropDown";

export default function Sidebar() {
    const { user, logout } = useAuth();
    const { profile } = useProfile();
    const navigate = useNavigate();
    const location = useLocation();
    
    // lưu index của menu cha đang dc mở (index/null)
    const [openIndex, setOpenIndex] = useState(0); 

    // lưu trạng thái bật tắt của user dropdown
    const [dropdown, setDropdown] = useState(false);
    
    const handleToggleDropdown = () => {
        setDropdown(!dropdown);
    }

    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

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
            // Main Menu
            'Links': '/dashboard/links',
            'Shop': '/dashboard/shop',
            'Design': '/dashboard/design',
            'Donation': '/dashboard/donation',
            'Insights': '/dashboard/insights',
            
            // Tools
            'Post ideas': '/dashboard/tools/post-ideas',
        };
        return map[label] || '/dashboard/links';
    };


    // Check xem item nào đang active dựa vào URL hiện tại
    const isActive = (label) => {
        const path = getPath(label);
        return location.pathname === path;
    };


    const handleClick = (item) => {
        navigate(getPath(item.label));
    };

    const handleAccountSetting = () => {
        setIsAccountModalOpen(true);
        setDropdown(false);
    }

    return (
        <div className="bg-[#ecede8] lg:w-[280px] md:w-[200px] rounded-tl-xl relative flex-shrink-0 hidden md:block h-full border-r border-[#d7d6d4]">
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
                        src={profile?.avatarUrl}
                        className="rounded-full h-[30px] w-[30px]"
                        alt="avatar"
                    />
                    <p className="ml-[4px] text-[#37181B] font-bold">
                        {user?.displayName}
                    </p>
                    <i className={`fa-solid fa-angle-down text-[10px] pt-1 ml-auto mr-1 transition-transform duration-300 ${dropdown? "rotate-180" : ""}`}/>

                    {/* user dropdown menu */}
                    {/* <UserSettingDropDown isOpen={dropdown} onClose={() => setDropdown(false)} /> */}
                </div>

                <div 
                    title="Setting" 
                    className="w-8 h-8 border border-gray-400 bg-white hover:bg-gray-200 cursor-pointer rounded-full p-2 flex items-center justify-center"
                    onClick={handleAccountSetting}
                >
                   <i className="fa-solid fa-gear"></i>
                </div>      
            </div>

            {/* 2. Menu Items */}
            <div className="overflow-y-auto flex flex-col h-[calc(100%-120px)]">
                <div className="px-6 lg:px-7">
                    {creatorMenu.map((item) => {
                        return (
                            <div key={item.label} className="mb-1">
                                <div
                                    onClick={() => handleClick(item)}
                                    className={`flex items-center py-2 px-2 -mx-2 my-2 rounded-xl cursor-pointer transition-all duration-150
                                        ${isActive(item.label) 
                                            ? "bg-gray-50 shadow-xs font-bold" // Style khi active
                                            : "hover:bg-[#d7d4cd] text-gray-600" // Style mặc định
                                        }`}
                                >
                                    <i className={`${isActive(item.label) ? 'text-blue-500' : ''} fa-solid ${item.icon}`} />
                                    <span className="ml-1.5">{item.label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 3. Tools Section */}
                <div className="px-6 lg:px-7 py-2">
                    <div className="-ml-3 font-medium text-[#9c9b95] w-[32px]">
                        Tools
                    </div>
                    {tools.map((t) => (
                        <div
                            key={t.label}
                            onClick={() => handleClick(t)} 
                            className={`flex items-center py-2 px-2 -mx-2 my-2 rounded-xl cursor-pointer transition-all duration-150
                                ${isActive(t.label) 
                                    ? "bg-gray-50 shadow-xs font-bold" // Style khi active
                                    : "hover:bg-[#d7d4cd] text-gray-600" // Style mặc định
                                }`}
                        >
                            <i className={` ${isActive(t.label) ? 'text-blue-500' : ''} fa-solid ${t.icon}`} />
                            <span className="ml-1.5">{t.label}</span>
                        </div>
                    ))}
                </div>

                <div className="mb-1 px-6 lg:px-7 text-gray-500 mt-auto cursor-pointer" onClick={handleAccountSetting}>
                    <div className="p-2 hover:bg-gray-50 hover:shadow-sm hover:text-blue-600 rounded-xl">
                        <i className="fa-solid fa-gear"></i>
                        <span className="ml-1.5 text-gray-600">Account setting</span>
                    </div>
                </div>
            </div>
        </div>
    );
}