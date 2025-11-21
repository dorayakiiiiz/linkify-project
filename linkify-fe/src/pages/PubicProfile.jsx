import { useProfile } from "../context/ProfileContext";
import { useLinks } from "../context/LinkContext"
import LinkTreePreview from "../components/Shared/LinkTreePreview";

export default function PublicProfile() {
    const { profile, loading } = useProfile();
    const { links, loadingLinks } = useLinks(); 

    return (
        <div className="w-full flex justify-center items-center bg-[#A6A8AA] md:py-[40px]">

            <LinkTreePreview 
                profile={profile}
                links={links}
                loading={loading}
                loadingLinks={loadingLinks}
            />
        </div>
    );
}