// cung cấp data profile toàn cục

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { profileService } from "../services/profileService";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const refreshProfile = async () => {
        if (!user?.id) {
            setProfile(null);
            return;
        }
        try {
            
            const res = await profileService.getProfile(user.id);
            setProfile(res?.profile || null);
        } catch (err) {
            if (err?.response?.status === 404) {
                setProfile(null);
            } else {
                console.log('Error while getting user profile: ', err);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user?.id) {
            refreshProfile();
        } else {
            setProfile(null);
        }
    }, [user?.id])

    // if (loading) {
    //     return (
    //         <div className="h-screen w-full flex justify-center items-center bg-[#0060AD] text-5xl text-[#fff] font-momo">
    //             Linkify is loading...
    //         </div>
    //     )
    // }

    return (
        <ProfileContext.Provider value={{ profile, loading, setProfile, refreshProfile }}>
            {children}
        </ProfileContext.Provider>
    )
    
}