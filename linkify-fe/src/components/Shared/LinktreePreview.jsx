import { useState, useEffect } from "react";

import { SOCIALS } from "../../constants/socials";

export default function LinkTreePreview({
    profile,
    loading,
    links,
    loadingLinks,
    products,
    loadingProducts,
    isPreview = false,
    tab = "link",
}) {
    // Component Skeleton cho các nút Link
    const ListSkeleton = () => (
        <div className="w-full flex flex-col gap-3 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className={`h-[50px] ${!isPreview ? "md:h-[70px]" : ""
                        } bg-white rounded-xl shadow text-center font-medium hover:scale-[1.02] transition-transform truncate`}
                ></div>
            ))}
        </div>
    );

    const now = new Date();

    const [isLinkTab, setIsLinkTab] = useState(tab === "link");

    useEffect(() => {
        setIsLinkTab(tab === "link");
    }, [tab]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div
                className={`relative w-full p-[20px] max-w-[580px] h-full ${!isPreview ? "md:h-[1160px] md:rounded-4xl" : "md:h-[580px]"
                    } bg-[#ECEEF1] shadow-2xl overflow-y-auto no-scrollbar flex flex-col items-center`}
            >
                {/* content */}
                {/* <div className="w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center"> */}
                <div className="w-full flex justify-between items-center">
                    <div
                        className={`${!isPreview ? "w-10 h-10" : "w-[34px] h-[34px]"
                            } rounded-full bg-white flex justify-center items-center`}
                    >
                        <i className="fa-brands fa-linktree"></i>
                    </div>
                    <div
                        className={`${!isPreview ? "w-10 h-10" : "w-[34px] h-[34px]"
                            } rounded-full bg-white flex justify-center items-center`}
                    >
                        <i className="fa-regular fa-bell"></i>
                    </div>
                </div>

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
                    <div className="w-full  flex flex-col items-center">
                        {/* avatar */}
                        <div
                            className={`w-20 h-20 mt-2 ${!isPreview ? "md:w-[120px] md:h-[120px]" : "md:w-15 md:h-15 lg:w-20 lg:h-20"
                                } rounded-full overflow-hidden border-2 border-white shadow-sm mb-4 shrink-0`}
                        >
                            <img
                                src={profile?.avatarUrl || "/anonymous-avatar.jpg"}
                                className="w-full h-full object-cover"
                                alt="avatar"
                            />
                        </div>

                        {/* info */}
                        <h2
                            className={`font-bold sm:text-sm lg:text-lg ${!isPreview ? "md:text-4xl" : ""
                                } text-center mb-1`}
                        >
                            {profile?.username || "@username"}
                        </h2>
                        <p
                            className={`${!isPreview ? "md:text-xl" : ""
                                } text-center text-gray-600 ${!isPreview ? "mb-[30px]" : "mb-5"
                                } px-2`}
                        >
                            {profile?.bio}
                        </p>

                        {/* toggle đổi giữa link và shop */}
                        <div className="relative flex items-center justify-center bg-[#8D8F90] font-bold font-quicksand p-1 rounded-full mb-[30px]">
                            {/* lớp trắng che trượt qua lại */}
                            <div
                                className={`absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out ${isLinkTab ? "translate-x-0" : "translate-x-full"
                                    }`}
                            ></div>

                            <div
                                className={`z-10 px-[18px] py-1.5  ${!isPreview ? "md:px-[30px] md:py-2.5" : "md:px-3.5 md:py-0.5"
                                    } rounded-full text-center cursor-pointer transition-colors duration-300 ${isLinkTab ? "text-black" : "text-white"
                                    }`}
                                onClick={() => setIsLinkTab(true)}
                            >
                                Link
                            </div>

                            <div
                                className={`z-10 px-[18px] py-1.5 ${!isPreview ? "md:px-[30px] md:py-2.5" : "md:px-3.5 md:py-0.5"
                                    } rounded-full text-center cursor-pointer transition-colors duration-300 ${!isLinkTab ? "text-black" : "text-white"
                                    }`}
                                onClick={() => setIsLinkTab(false)}
                            >
                                Shop
                            </div>
                        </div>

                        {/* links list */}
                        <div className="w-full flex-1 flex flex-col gap-5">
                            {isLinkTab &&
                                (loadingLinks ? (
                                    <ListSkeleton />
                                ) : (
                                    <>
                                        {links.map((link) => {
                                            if (!link.isEnable) return null;

                                            if (
                                                link.scheduledEnable &&
                                                now < new Date(link.scheduledEnable)
                                            )
                                                return null;

                                            if (
                                                link.scheduledDisable &&
                                                now > new Date(link.scheduledDisable)
                                            )
                                                return null;

                                            const social = SOCIALS.find((social) => social.name === link.title);

                                            let icon = social?.icon;
                                            let color = social?.color;

                                            if (!icon || !color) {
                                                icon = 'fa-solid fa-earth-asia';
                                                color = '#48c62b';
                                            }

                                            return (
                                                <a
                                                    key={link._id}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`flex justify-center py-3 ${!isPreview ? "md:py-5 md:mx-[40px]" : "md:py-2"
                                                        } bg-white rounded-xl shadow text-center font-medium hover:scale-[1.02] transition-transform truncate`}
                                                >

                                                    <div className={`${!isPreview ? 'text-xl md:text-2xl lg:text-3xl' : ''} mr-[10px]`}>
                                                        {icon && <i className={`${icon} text-[${color}]`} />}
                                                    </div>
                                                    <div className={`${!isPreview ? 'md:text-xl lg:text-2xl' : ''}`}>
                                                        {link.title}
                                                    </div>
                                                </a>
                                            );
                                        })}
                                        {links.length === 0 && (
                                            <div className="text-center text-gray-400 mt-10">
                                                No links added yet
                                            </div>
                                        )}
                                    </>
                                ))}

                            {!isLinkTab &&
                                (loadingProducts ? (
                                    <ListSkeleton />
                                ) : (
                                    <>
                                        {products && products.map((product) => {
                                            if (!product.isEnable) return null;

                                            if (
                                                product.scheduledEnable &&
                                                now < new Date(product.scheduledEnable)
                                            )
                                                return null;

                                            if (
                                                product.scheduledDisable &&
                                                now > new Date(product.scheduledDisable)
                                            )
                                                return null;

                                            return (
                                                <a
                                                    key={product._id}
                                                    href={product.buyLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`py-3 ${!isPreview ? "md:py-5 md:mx-[50px]" : ""
                                                        } bg-white rounded-xl shadow text-center font-medium hover:scale-[1.02] transition-transform block`}
                                                >
                                                    <div className="flex flex-col items-center justify-center gap-[4px] px-4">
                                                        {product.imageUrl ? (
                                                            <img
                                                                src={product.imageUrl}
                                                                alt={product.name}
                                                                className="w-full max-w-[250px] h-full max-h-[250px] object-cover rounded shrink-0"
                                                            />
                                                        ) : (
                                                            <i className="fa-solid fa-shop text-purple-600 text-sm"></i>
                                                        )}

                                                        <span className="w-full">{product.name}</span>

                                                        <span className="text-purple-600 font-semibold shrink-0">
                                                            ${product.price}
                                                        </span>
                                                    </div>
                                                </a>
                                            );
                                        })}

                                        {/* Logic hiển thị empty state giống Link */}
                                        {(!products || products.length === 0) && (
                                            <div className="text-center text-gray-400 mt-10">
                                                No products available
                                            </div>
                                        )}
                                    </>
                                ))}

                            <div className="mt-auto mb-[30px]">
                                <div
                                    className={`py-3 px-1 ${!isPreview ? "md:py-5 md:mx-5" : "text-sm"
                                        } font-bold bg-white text-center rounded-4xl shadow flex items-center justify-center cursor-pointer`}
                                >
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
                {/* </div> */}
            </div>
        </div>
    );
}
