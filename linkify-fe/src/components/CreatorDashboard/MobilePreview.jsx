import { useProfile } from "../../context/ProfileContext";
import { useLinks } from "../../context/LinkContext"

export default function MobilePreview() {
    const { profile, loading } = useProfile();
    const { links, loadingLinks } = useLinks(); 

    // Component Skeleton cho các nút Link
    const LinkListSkeleton = () => (
        <div className="w-full flex flex-col gap-3 w-full animate-pulse">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full h-[44px] bg-white/50 rounded-full shadow-sm"></div>
            ))}
        </div>
    );

    return (
        <div className="relative w-[300px] h-[600px] border-[12px] border-black rounded-[3rem] bg-[#dad1f0] shadow-2xl overflow-hidden flex flex-col items-center pt-10 px-4">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-10"></div>

            {/* Content bên trong điện thoại */}
            <div className="w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center pb-10">
                
                {loading ? (
                    <div className="w-full flex flex-col items-center animate-pulse mt-2">
                        {/* Avatar Skeleton */}
                        <div className="w-20 h-20 rounded-full bg-gray-300 mb-4 border-2 border-white/20"></div>
                        {/* Name Skeleton */}
                        <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
                        {/* Bio Skeleton */}
                        <div className="h-3 w-48 bg-gray-300 rounded mb-6"></div>
                        {/* Links Skeleton */}
                        <LinkListSkeleton />
                    </div>
                ) : (
                    <>
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm mb-4 shrink-0">
                            <img 
                                src={profile?.avatarUrl || "/anonymous-avatar.jpg"} 
                                className="w-full h-full object-cover" 
                                alt="avatar"
                            />
                        </div>

                        {/* Info */}
                        <h2 className="font-bold text-lg text-center mb-1">{profile?.username || "@username"}</h2>
                        <p className="text-xs text-center text-gray-600 mb-6 px-2">{profile?.bio}</p>

                        {/* Links List */}
                        <div className="w-full flex flex-col gap-3">
                            {loadingLinks ? (
                                <LinkListSkeleton />
                            ) : (
                                <>
                                    {links.map((link) => (
                                        <a 
                                            key={link._id}
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-full py-3 px-4 bg-white rounded-full shadow-sm text-center text-sm font-medium hover:scale-[1.02] transition-transform truncate"
                                        >
                                            {link.title}
                                        </a>
                                    ))}
                                    {links.length === 0 && (
                                        <div className="text-center text-gray-400 text-xs mt-10">No links added yet</div>
                                    )}
                                </>
                            )}
                            
                            <div className="">
                                <div className="mt-5 lg:text-sm md:text-[10px] text-black font-bold bg-white px-4 py-2 rounded-2xl shadow-lg md:h-[35px] flex items-center justify-center hover:cursor-pointer">
                                    Join {profile.username} on Linktree
                                </div>
                                <div className="flex justify-center gap-3 text-[10px] my-2">
                                    <span>Report</span>
                                    <span>.</span>
                                    <span>Privacy</span>
                                </div>
                            </div>

                        </div>
                    </>
                )}
            </div>
        </div>
    );
}