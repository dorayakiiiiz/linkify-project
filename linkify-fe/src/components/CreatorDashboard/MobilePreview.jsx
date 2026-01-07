import { useProfile } from "../../context/ProfileContext";
import { useLinks } from "../../context/LinkContext";
import { useShop } from "../../context/ShopContext";
import LinktreePreview from "../Shared/LinktreePreview";
import { useLocation } from "react-router-dom";

export default function MobilePreview({ isDesignPanelOpen }) {
    const { profile, loading } = useProfile();
    const { links, loadingLinks } = useLinks();
    const { products, loadingProducts } = useShop();
    const location = useLocation();
    const currentTab = location.pathname.includes("/dashboard/shop")
        ? "shop"
        : "link";

    //Phần class để điều khiển hiệu ứng thu nhỏ và animation khi design panel mở (ở mobile)
    const previewClasses = `
        transition-all duration-500 ease-in-out
        ${isDesignPanelOpen 
            ? 'transform scale-[0.8] translate-y-[-180px] opacity-100' // Thu nhỏ và đẩy lên
            : 'transform scale-100 translate-y-0 opacity-100' // Trạng thái bình thường
        }
    `;

    return (
        <div className={`flex flex-col h-screen ${previewClasses}`}>
            {/* Link ở trên */}
            <div className="hidden mt-3 md:flex items-center">
                <div className="bg-white py-2 px-[26px] rounded-3xl xl:w-[280px] lg:w-[240px] md:w-[200px] mx-auto flex items-center justify-between">
                    {!loading ? (
                        <>
                            <a
                                className="text-center flex-1"
                                href={`/${profile.username}`}
                                target="_blank"
                            >
                                linkify.com/{profile.username}
                            </a>
                        </>
                    ) : (
                        <>
                            <div className="text-center flex-1">Loading...</div>
                        </>
                    )}
                    <i className="fa-regular fa-share-from-square"></i>
                </div>
            </div>
            
            {/* Điện thoại preview */}
            <div className="flex-1 flex items-center justify-center px-12">
                <div className="w-[85vw] max-w-[320px] xl:w-[300px] lg:w-[280px] md:w-[200px] h-auto relative aspect-[9/19] border-[8px] border-black rounded-[3rem] bg-black shadow-2xl overflow-auto max-h-[93%] no-scrollbar">              
                    {/* tai thỏ */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[18px] bg-black rounded-b-xl z-10"></div>

                    {/* content bên trong điện thoại */}
                    <div className="w-full h-full">
                        <LinktreePreview
                            profile={profile}
                            loading={loading}
                            links={links}
                            loadingLinks={loadingLinks}
                            products={products}
                            loadingProducts={loadingProducts}
                            isPreview={true}
                            tab={currentTab}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
