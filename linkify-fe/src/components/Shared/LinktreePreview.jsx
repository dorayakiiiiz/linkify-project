import React from 'react'

export default function LinkTreePreview({ profile, links, loading, loadingLinks, isPreview = false }) {
    
    // Component Skeleton cho các nút Link
    const LinkListSkeleton = () => (
        <div className="w-full flex flex-col gap-3 w-full animate-pulse">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-[50px] ${!isPreview ? 'md:h-[70px]': ''} bg-white rounded-xl shadow text-center font-medium hover:scale-[1.02] transition-transform truncate`}></div>
            ))}
        </div>
    );

    return (
        <div className="w-full flex justify-center items-center">

            <div className={`relative w-full p-[30px] max-w-[580px] h-screen ${!isPreview ? 'md:h-[1160px] md:rounded-4xl' : ''} bg-[#ECEEF1] shadow-2xl overflow-hidden flex flex-col items-center`}>
                
                <div className="w-full flex justify-between items-center">
                    <div className={`${!isPreview ? 'w-[40px] h-[40px]' : 'w-[34px] h-[34px]'} rounded-full bg-[#fff] flex justify-center items-center`}>
                        <i className="fa-brands fa-linktree"></i>
                    </div>
                    <div className={`${!isPreview ? 'w-[40px] h-[40px]' : 'w-[34px] h-[34px]'} rounded-full bg-[#fff] flex justify-center items-center`}>
                        <i className="fa-regular fa-bell"></i>
                    </div>
                </div>
            
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
                        <div className="w-full min-h-full flex flex-col items-center">
                            {/* Avatar */}
                            <div className={`w-[80px] h-[80px] ${!isPreview ? 'md:w-[120px] md:h-[120px]' : ''} rounded-full overflow-hidden border-2 border-white shadow-sm mb-4 shrink-0`}>
                                <img 
                                    src={profile?.avatarUrl || "/anonymous-avatar.jpg"} 
                                    className="w-full h-full object-cover" 
                                    alt="avatar"
                                />
                            </div>

                            {/* Info */}
                            <h2 className={`font-bold text-xl ${!isPreview ? 'md:text-4xl' : ''} text-center mb-1`}>{profile?.username || "@username"}</h2>
                            <p className={`${!isPreview ? 'md:text-xl' : ''} text-center text-gray-600 ${!isPreview ? 'mb-[60px]' : 'mb-[30px]'} px-2`}>{profile?.bio}</p>

                            {/* Links List */}
                            <div className="w-full flex-1 flex flex-col gap-[20px]">
                                {loadingLinks ? (
                                    <LinkListSkeleton />
                                ) : (
                                    <>
                                        {links.map((link) => {
                                        
                                        if (!link.isEnable) return null;
                                        return (
                                            <a 
                                                key={link._id}
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={`py-[12px] ${!isPreview ? 'md:py-[20px] md:mx-[20px]' : ''} bg-white rounded-xl shadow text-center font-medium hover:scale-[1.02] transition-transform truncate`}
                                            >
                                                {link.title}
                                            </a>
                                        )})}
                                        {links.length === 0 && (
                                            <div className="text-center text-gray-400 mt-10">No links added yet</div>
                                        )}
                                    </>
                                )}

                                <div className="mt-auto">
                                    <div className={`py-[12px] ${!isPreview ? 'md:py-[20px] md:mx-[20px]' : ''} font-bold bg-white text-center rounded-4xl shadow flex items-center justify-center cursor-pointer`}>
                                        Join {profile.username} on Linktree
                                    </div>
                                    {/* <div className="flex justify-center gap-3 text-[10px] my-2">
                                        <span>Report</span>
                                        <span>.</span>
                                        <span>Privacy</span>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}