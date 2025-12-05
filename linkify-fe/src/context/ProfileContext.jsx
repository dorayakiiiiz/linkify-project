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

            const data = await profileService.getProfiles().catch(() => null);
            
            const profileList = data?.profiles || [];
            
            setProfiles(profileList);

            if (profileList.length > 0) {
                // lấy lại profile hiện tại trong localstor
                const savedProfileId = localStorage.getItem("currentProfileId");
                const savedProfile = profileList.find(p => p._id === savedProfileId);

                // nếu state profile đang có data (refetch ko reload web) thì set tiếp cái cũ
                if (profile) {
                    const currentStillExists = profileList.find(p => p._id === profile._id);
                    setProfile(currentStillExists || savedProfile || profileList[0]);
                } else {
                    setProfile(savedProfile || profileList[0]);
                }
            } else {
                setProfile(null);
            }
        } catch (err) {
            console.log('Error while getting user profiles: ', err);
        } finally {
            setLoading(false);
        }
    }, [user?.id, profile]);

    const switchProfile = (profileId) => {
        const target = profiles.find(p => p._id === profileId);
        if (target) {
            setProfile(target);
            localStorage.setItem("currentProfileId", profileId);
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
        <ProfileContext.Provider value={{ profile, profiles, loading, setProfile, fetchProfile, switchProfile }}>
            {children}
        </ProfileContext.Provider>
    )
    
}