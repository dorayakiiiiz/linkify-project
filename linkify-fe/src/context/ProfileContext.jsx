// cung cấp data profile toàn cục

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { profileService } from "../services/profileService";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
    const { user } = useAuth();
    const [profiles, setProfiles] = useState([]);
    // current profile
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const fetchProfile = useCallback(async () => {
        if (!user?.id) {
            setProfile(null);
            setProfiles([]);
            setLoading(false);
            return;
        }
        try {
            
            // Lấy tất cả profile của user (Gọi API từ BE)
            const data = await profileService.getProfiles().catch(() => null);
            
            const profileList = data?.profiles || [];
            
            //ProfileList là mảng các profile của user hiện tại
            setProfiles(profileList);

            if (profileList.length > 0) {
                const savedProfileId = localStorage.getItem("currentProfileId");
                const savedProfile = profileList.find(p => p._id === savedProfileId);

                if (savedProfile) {
                    // nếu local storage có lưu profile id -> dùng
                    setProfile(savedProfile);
                } else if (profile) {
                    // nếu local storage ko có -> dùng profile hiện tại
                    const currentStillExists = profileList.find(p => p._id === profile._id);
                    setProfile(currentStillExists || profileList[0]);
                } else {
                    // lấy cái đầu tiên
                    setProfile(profileList[0]);
                }

            } else {
                setProfile(null);
            }
        } catch (err) {
            console.log('Error while getting user profiles: ', err);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    const switchProfile = (profileId) => {
        // Chuyển profile hiện tại
        const target = profiles.find(p => p._id === profileId);
        if (target) {
            setProfile(target);
            localStorage.setItem("currentProfileId", profileId);
        }
    }

    // Cập nhật design (dùng trong CreatorDashboard)
    const updateDesign = async (newDesignData) => {
        if (!profile) return;

        // 1. Cập nhật ngay lập tức ở Client (Optimistic Update)
        setProfile(prev => ({
            ...prev, //Các thuộc tính khác giữ nguyên
            design: {
                ...prev.design, // Giữ design cũ
                ...newDesignData // Gộp với design mới
            }
        }));

        // 2. Gọi API lưu ngầm
        try {
            //Gọi API từ profileService để update design
            await profileService.updateDesign(profile._id, newDesignData);
        } catch (err) {
            console.error("Failed to save design:", err);
        }
    }

    useEffect(() => {
        if (user?.id) {
            fetchProfile();
        } else {
            setProfile(null);
            setProfiles([]);
            setLoading(false);
        }
    }, [user?.id])

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center bg-[#0060AD] text-5xl text-[#fff] font-momo">
                Linkify is loading...
            </div>
        )
    }

    return (
        <ProfileContext.Provider value={{ profile, profiles, loading, setProfile, fetchProfile, switchProfile, updateDesign }}>
            {children}
        </ProfileContext.Provider>
    )
    
}