import { useProfile } from "../../../context/ProfileContext";

export function UserInfo() {
    const { profile, loading } = useProfile();

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
        <div className=" w-full py-4 flex gap-2 ">
            <img
                src={profile.avatarUrl}
                alt="avatar"
                className="rounded-full w-20 h-20 mb-2"
            />
            <div className="flex flex-col gap-2">
                <div className="text-lg font-semibold">{profile.username}</div>
                <div className="text-gray-500 text-sm text-center">
                    {profile.bio}
                </div>
                <i className="fa-solid fa-plus text-xs bg-[#f1f0ee] pl-1 pr-4 py-1 rounded-full border border-[#ccc] border-solid"></i>
            </div>
        </div>
    )
}