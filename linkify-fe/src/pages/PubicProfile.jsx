import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import LinkTreePreview from '../components/Shared/LinktreePreview';
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

    // State lưu màu chủ đạo trích xuất từ ảnh (nếu có)
    const [extractedColor, setExtractedColor] = useState(null);

    // Hàm trích xuất màu trung bình từ ảnh (Client-side)
    const getAverageColor = (imageUrl) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "Anonymous"; // Quan trọng để tránh lỗi CORS
            img.src = imageUrl;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 1;
                canvas.height = 1;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, 1, 1);
                const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
                resolve(`rgb(${r},${g},${b})`);
            };
            img.onerror = () => {
                resolve(null); // Fallback nếu lỗi load ảnh
            };
        });
    };

    // Dùng ref để lưu lại ID profile đã track, tránh track trùng lặp do React.StrictMode
    const trackedProfileRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(false);
                const { profile: publicProfile } = await profileService.getPublicProfile(username);
                setProfile(publicProfile);

                // --- LOGIC TRÍCH XUẤT MÀU ---
                const bg = publicProfile?.design?.background;
                if (bg?.type === 'image' && bg?.imageUrl) {
                    const color = await getAverageColor(bg.imageUrl);
                    if (color) setExtractedColor(color);
                }
                // -----------------------------

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


    // Tính toán Outer Background (Vùng bao quanh)
    const getOuterStyle = () => {
        if (!profile || !profile.design) return { backgroundColor: '#ECEEF1' };

        const bg = profile.design.background || {};
        
        // CASE 1: Nền là ẢNH -> Dùng màu trích xuất (hoặc màu fallback)
        if (bg.type === 'image') {
            // Dùng màu trích xuất được từ ảnh, giảm độ sáng một chút để làm nổi bật Profile Card
            // Hoặc dùng filter brightness để tạo sự tách biệt như bạn yêu cầu
            const finalColor = extractedColor || bg.value || '#ccc';
            return { 
                backgroundColor: finalColor,
                // Thêm lớp phủ mờ nhẹ để tạo chiều sâu và tách biệt với ảnh gốc trong card
                boxShadow: 'inset 0 0 100px rgba(0,0,0,0.2)' 
            };
        }
        
        // CASE 2: Gradient -> Dùng chính gradient đó (hoặc lấy màu đầu tiên)
        if (bg.type === 'gradient') {
            return {
                background: `linear-gradient(180deg, ${bg.value} 0%, ${bg.toColor} 100%)`,
                backgroundAttachment: 'fixed',
            };
        }

        // CASE 3: Màu đơn
        return { backgroundColor: bg.value || '#FFFFFF' };
    };

    // --- [MỚI] HÀM LẤY MÀU NỀN ĐỂ TRUYỀN CHO QR CODE ---
    // QR Code nằm ở góc dưới, nên ta cần biết màu ở phía dưới cùng là gì
    const getCurrentBottomColor = () => {
        if (!profile?.design?.background) return '#ffffff';
        
        const bg = profile.design.background;

        // Nếu là ảnh: Dùng màu trích xuất hoặc màu fallback
        if (bg.type === 'image') {
            return extractedColor || bg.value || '#cccccc';
        }

        // Nếu là Gradient: QR Code ở dưới đáy, nên lấy màu kết thúc (toColor)
        // Mặc định gradient là 'to bottom' nên toColor nằm ở dưới
        if (bg.type === 'gradient') {
            return bg.toColor || '#ffffff';
        }

        // Nếu là màu đơn (fill)
        return bg.value || '#ffffff';
    }

    if (error) {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600">Profile not found or does not exist.</p>
            </div>
        )
    }

    return (
        <div 
            className="w-full min-h-screen flex justify-center items-center md:py-10 relative transition-colors duration-700"
            style={getOuterStyle()}
        >
            <LinkTreePreview
                profile={profile}
                links={links}
                loading={loading}
                loadingLinks={loading}
                products={products}
                loadingProducts={loading}
                extractedColor={extractedColor}
            />

            {!loading && profile && (
                <ShareQRCode parentBgColor={getCurrentBottomColor()} />
            )}
        </div>

    );
}
