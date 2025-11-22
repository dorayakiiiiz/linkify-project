import { useProfile } from "../../context/ProfileContext";
import { useLinks } from "../../context/LinkContext"
import LinkTreePreview from "../Shared/LinkTreePreview";

export default function MobilePreview() {
    const { profile, loading } = useProfile();
    const { links, loadingLinks } = useLinks(); 

   

    return (
        <div className="flex flex-col items-center gap-[10px]">
            <div className="bg-white py-[8px] px-[26px] rounded-3xl lg:w-[280px] md:w-[220px] mx-auto flex items-center justify-between">
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

        <div className="relative w-[280px] h-[560px] border-[8px] border-black rounded-[3rem] bg-black shadow-2xl overflow-hidden">
            
            {/* tai thỏ */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[18px] bg-black rounded-b-xl z-10"></div>

            {/* content bên trong điện thoại */}
            <div className="w-full h-full overflow-y-auto no-scrollbar">
                <LinkTreePreview 
                    profile={profile}
                    links={links}
                    loading={loading}
                    loadingLinks={loadingLinks}
                    isPreview={true}
                />
                
            </div>
        </div>
        </div>
    );
}