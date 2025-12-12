import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import LinkTreePreview from "../components/Shared/LinkTreePreview";
import { profileService } from '../services/profileService';
import { linkService } from '../services/linkService';
import { shopService } from '../services/shopService';
import { analyticService } from '../services/analyticService';
import ShareQRCode from '../components/Shared/ShareQRCode';

export default function PublicProfile() {
    const { username } = useParams();

    const [profile, setProfile] = useState(null);
    const [links, setLinks] = useState([]);
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Dùng ref để lưu lại ID profile đã track, tránh track trùng lặp do React.StrictMode
    const trackedProfileRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(false);
                const { profile: publicProfile } = await profileService.getPublicProfile(username);
                setProfile(publicProfile);

                if (publicProfile) {
                    if (trackedProfileRef.current !== publicProfile._id) {
                        analyticService.trackEvent({
                            profileId: publicProfile._id,
                            type: 'view',
                            referrer: document.referrer 
                        });
                        trackedProfileRef.current = publicProfile._id;
                    }

                    const [{ links: publicLinks }, { products: publicProducts }] = await Promise.all([
                        linkService.getPublicLinks(publicProfile._id),
                        shopService.getPublicProducts(publicProfile._id)
                    ]);

                    setLinks(publicLinks);
                    setProducts(publicProducts);
                } 
            } catch(err) {
                console.error("Error fetching public profile:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        } 

        if (username) {
            fetchData();
        }
    }, [username]);

    

    if (error) {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600">Profile not found or does not exist.</p>
            </div>
        )
    }

    return (
        <div className="w-full flex justify-center items-center bg-[#A6A8AA] md:py-10 relative">
            <LinkTreePreview
                profile={profile}
                links={links}
                loading={loading}
                loadingLinks={loading}
                products={products}
                loadingProducts={loading}
            />

            {!loading && profile && <ShareQRCode />}
        </div>

    );
}
