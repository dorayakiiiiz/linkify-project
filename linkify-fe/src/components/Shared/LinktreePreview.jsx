import { useState, useEffect } from "react"

export default function LinkTreePreview({ profile, loading, links, loadingLinks, products, loadingProducts, isPreview = false, tab = 'link' }) {

    // Component Skeleton cho các nút Link
    const ListSkeleton = () => (
        <div className="w-full flex flex-col gap-3 w-full animate-pulse">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-[50px] ${!isPreview ? 'md:h-[70px]' : ''} bg-white rounded-xl shadow text-center font-medium hover:scale-[1.02] transition-transform truncate`}></div>
            ))}
        </div>
    );

    const now = new Date();

    const [isLinkTab, setIsLinkTab] = useState(tab === 'link');

    useEffect(() => {
        setIsLinkTab(tab === 'link')
    }, [tab]);

    return (
        <div className="w-full flex justify-center items-center">

            <div className={`relative w-full p-[30px] max-w-[580px] h-full ${!isPreview ? 'md:h-[1160px] md:rounded-4xl' : 'md:h-[580px]'} bg-[#ECEEF1] shadow-2xl overflow-hidden flex flex-col items-center`}>

                <div className="w-full flex justify-between items-center">
                    <div className={`${!isPreview ? 'w-[40px] h-[40px]' : 'w-[34px] h-[34px]'} rounded-full bg-[#fff] flex justify-center items-center`}>
                        <i className="fa-brands fa-linktree"></i>
                    </div>
                    <div className={`${!isPreview ? 'w-[40px] h-[40px]' : 'w-[34px] h-[34px]'} rounded-full bg-[#fff] flex justify-center items-center`}>
                        <i className="fa-regular fa-bell"></i>
                    </div>
                </div>

                {/* content */}
                <div className="w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center pb-">

                    {loading ? (
                        <div className="w-full flex flex-col items-center animate-pulse mt-2">
                            {/* avatar skeleton */}
                            <div className="w-20 h-20 rounded-full bg-gray-300 mb-4 border-2 border-white/20"></div>
                            {/* name skeleton */}
                            <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
                            {/* bio skeleton */}
                            <div className="h-3 w-48 bg-gray-300 rounded mb-6"></div>
                            {/* links skeleton */}
                            <ListSkeleton />
                        </div>
                    ) : (
                        <div className="w-full min-h-full flex flex-col items-center">
                            {/* avatar */}
                            <div className={`w-[80px] h-[80px] ${!isPreview ? 'md:w-[120px] md:h-[120px]' : ''} rounded-full overflow-hidden border-2 border-white shadow-sm mb-4 shrink-0`}>
                                <img
                                    src={profile?.avatarUrl || "/anonymous-avatar.jpg"}
                                    className="w-full h-full object-cover"
                                    alt="avatar"
                                />
                            </div>

                            {/* info */}
                            <h2 className={`font-bold text-xl ${!isPreview ? 'md:text-4xl' : ''} text-center mb-1`}>{profile?.username || "@username"}</h2>
                            <p className={`${!isPreview ? 'md:text-xl' : ''} text-center text-gray-600 ${!isPreview ? 'mb-[30px]' : 'mb-[20px]'} px-2`}>{profile?.bio}</p>

                            {/* toggle đổi giữa link và shop */}
                            <div className="relative flex items-center justify-center bg-[#8D8F90] font-bold font-quicksand p-[4px] rounded-full mb-[30px]">
                                
                                {/* lớp trắng che trượt qua lại */}
                                <div className={`absolute left-[4px] top-[4px] bottom-[4px] w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out ${isLinkTab ? 'translate-x-0' : 'translate-x-full'}`}></div>
                                
                                <div
                                    className={`z-10 px-[18px] py-[6px]  ${!isPreview ? 'md:px-[30px] md:py-[10px]' : 'md:px-[14px] md:py-[2px]'} rounded-full text-center cursor-pointer transition-colors duration-300 ${isLinkTab ? 'text-[#000]' : 'text-[#fff]'}`}
                                    onClick={() => setIsLinkTab(true)}
                                >
                                    Link
                                </div>

                                <div
                                    className={`z-10 px-[18px] py-[6px] ${!isPreview ? 'md:px-[30px] md:py-[10px]' : 'md:px-[14px] md:py-[2px]'} rounded-full text-center cursor-pointer transition-colors duration-300 ${!isLinkTab ? 'text-[#000]' : 'text-[#fff]'}`}
                                    onClick={() => setIsLinkTab(false)}
                                >
                                    Shop
                                </div>
                                
                            </div>

                            {/* links list */}
                            <div className="w-full flex-1 flex flex-col gap-[20px]">
                                {isLinkTab && (

                                    loadingLinks ? (
                                        <ListSkeleton />
                                    ) : (
                                        <>
                                            {links.map((link) => {

                                                if (!link.isEnable)
                                                    return null;

                                                if (link.scheduledEnable && now < new Date(link.scheduledEnable))
                                                    return null;

                                                if (link.scheduledDisable && now > new Date(link.scheduledDisable))
                                                    return null;

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
                                                )
                                            })}
                                            {links.length === 0 && (
                                                <div className="text-center text-gray-400 mt-10">No links added yet</div>
                                            )}
                                        </>
                                    )
                                )}

                                {!isLinkTab && (

                                    loadingProducts ? (
                                        <ListSkeleton />
                                    ) : (
                                        <>
                                            {/* {links.map((link) => {

                                                if (!link.isEnable)
                                                    return null;

                                                if (link.scheduledEnable && now < new Date(link.scheduledEnable))
                                                    return null;

                                                if (link.scheduledDisable && now > new Date(link.scheduledDisable))
                                                    return null;

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
                                                )
                                            })}
                                            {links.length === 0 && (
                                                <div className="text-center text-gray-400 mt-10">No links added yet</div>
                                            )} */}
                                        </>
                                    )
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