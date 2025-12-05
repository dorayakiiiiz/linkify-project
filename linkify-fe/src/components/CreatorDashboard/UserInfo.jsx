import { useProfile } from "../../context/ProfileContext";
import { useState, useEffect } from 'react'
import EditProfileModal from "../../pages/CreatorDashboard/Modal/EditProfileModal";

export function UserInfo() {
    const { profile, loading, fetchProfile } = useProfile();

    const [currentProfile, setCurrentProfile] = useState(null);

    const handleEditProfile = () => {
        setCurrentProfile(profile);
    }

    if (loading) {
        return (
            <div className="w-full py-4 flex gap-2 animate-pulse">
                <div className="rounded-full w-20 h-20 bg-gray-300"></div>
                <div className="flex flex-col gap-2 justify-center">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    <div className="h-3 w-32 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className=" w-full py-4 flex gap-[20px]">
            {currentProfile && (
                <EditProfileModal
                    onClose={() => setCurrentProfile(null)}
                    profile={currentProfile}
                    onSuccess={async () => {
                        await fetchProfile();
                    }}
                />
            )}
            <img
                src={profile.avatarUrl}
                alt="avatar"
                className="rounded-full w-20 h-20 mb-2"
            />
            <div className="flex flex-col">
                <div className="text-lg font-semibold">{profile.username}</div>
                <div className="text-gray-600 text-">
                    {profile.bio}
                </div>
                <div 
                    className="flex items-center justify-center gap-2 mt-2 text-gray-400 hover:text-purple-600 cursor-pointer"
                    onClick={handleEditProfile}    
                >
                    Edit your profile
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
            </div>
        </div>
    )
}