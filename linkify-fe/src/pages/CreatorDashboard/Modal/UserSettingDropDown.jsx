import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useProfile } from "../../../context/ProfileContext";
import SwitchProfileModal from "./SwitchProfileModal";
import AccountSettingModal from "../../../components/Modal/AccountSettingModal";

export default function UserSettingDropDown({ onClose, isOpen = true, className = "" }) {
    // lưu trạng thái bật tắt của user dropdown
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isSwitchProfileModalOpen, setIsSwitchProfileModalOpen] = useState(false);
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

    const { user, logout } = useAuth();
    const { profile } = useProfile();
    const navigate = useNavigate();

    const handleSwitchProfile = () => {
        setIsSwitchProfileModalOpen(true);
        if (onClose) onClose();
    }

    const handleCreateProfile = () => {
        navigate('/onboarding/profile', { state: { isAddingNew: true } });
        if (onClose) onClose();
    }

    const handleAccountSetting = () => {
        setIsAccountModalOpen(true);
        if (onClose) onClose();
    }

    const handleLogout = () => {
        if (isLoggingOut)
            return;
        setIsLoggingOut(true);
        setTimeout(() => {
            logout();
            if (onClose) onClose();
        }, 1000);
    }
    return (
        <>
            <div
                className={`text-[#212529] absolute shadow-xl top-[calc(100%+4px)] w-[220px] bg-[#fff] rounded-xl flex flex-col ${isOpen ? 'scale-100' : 'scale-0'} transition duration-200 z-[50] ${className}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="w-full border-b border-[#e0dfde] py-[10px] flex items-center justify-center gap-[10px]">
                    <img
                        src={profile?.avatarUrl}
                        className="rounded-full h-[36px] w-[36px]"
                        alt="avatar"
                    />
                    <div className="">
                        <div className="font-semibold">
                            {profile?.username}
                        </div>

                        <div className="text-sm">
                            linkify.com/{profile?.username}
                        </div>
                    </div>
                </div>

                <div className="border-b border-[#e0dfde]">
                    <div
                        className="pl-[16px] py-[4px] mx-[4px] mt-[4px] rounded-md hover:bg-[#F1F0EE] cursor-pointer"
                        onClick={handleSwitchProfile}
                    >
                        <i className="fa-solid fa-shuffle mr-[6px]"></i>
                        Switch linkify profile
                    </div>

                    <div
                        className="pl-[16px] py-[4px] mx-[4px] mb-[4px] rounded-md hover:bg-[#F1F0EE] cursor-pointer"
                        onClick={handleCreateProfile}
                    >
                        <i className="fa-regular fa-square-plus mr-[6px]"></i>
                        Create new linkify
                    </div>
                </div>

                <div className="">
                    <div
                        className="pl-[16px] py-[4px] mx-[4px] mt-[4px] rounded-md hover:bg-[#F1F0EE] cursor-pointer"
                        onClick={handleAccountSetting}
                    >
                        <i className="fa-regular fa-user mr-[6px]"></i>
                        Account
                    </div>
                </div>

                <div
                    className={`pl-[16px] py-[4px] mx-[4px] mb-1 rounded-md transition-all duration-200
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
            {isSwitchProfileModalOpen && <SwitchProfileModal onClose={() => setIsSwitchProfileModalOpen(false)} />}
            {isAccountModalOpen && <AccountSettingModal onClose={() => setIsAccountModalOpen(false)} />}
        </>
    )
}
