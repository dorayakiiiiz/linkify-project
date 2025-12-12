import { useState, useEffect } from "react";
import Button from "../../../components/Shared/Button";
import { useProfile } from "../../../context/ProfileContext";
import { profileService } from "../../../services/profileService";

export default function DonationModal({ onClose }) {
    const { profile, fetchProfile } = useProfile();
    
    const [isEnabled, setIsEnabled] = useState(profile?.donation?.isEnabled || false);
    const [url, setUrl] = useState(profile?.donation?.url || "");
    const [text, setText] = useState(profile?.donation?.text || "Support Me");
    
    const [loading, setLoading] = useState(false);
    const [log, setLog] = useState({ type: "", content: "" });

    useEffect(() => {
        if (log.content) {
            const timer = setTimeout(() => setLog({ type: "", content: "" }), 3000);
            return () => clearTimeout(timer);
        }
    }, [log]);

    const handleSubmit = async () => {
        // Validate URL cơ bản
        if (isEnabled && !url) {
            setLog({ type: "error", content: "Please enter a donation URL." });
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("profileId", profile._id);
            
            // Gửi object donation dưới dạng JSON string
            const donationData = JSON.stringify({
                isEnabled,
                url,
                text: text || "Support Me"
            });
            formData.append("donation", donationData);

            await profileService.updateProfile(formData);
            await fetchProfile(); 
            
            setLog({ type: "success", content: "Donation settings updated!" });
            setTimeout(onClose, 1000);

        } catch (error) {
            setLog({ type: "error", content: err.response?.data?.message || "Failed to update settings." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="flex flex-col w-full max-w-[600px] px-8 py-6 bg-white md:rounded-3xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="w-full flex justify-between items-center mb-6">
                    <div className="font-momo text-2xl flex items-center gap-2">
                        <i className="fa-solid fa-heart text-pink-500"></i>
                        Support Me
                    </div>
                    <div
                        className="text-gray-400 hover:text-red-500 text-2xl cursor-pointer transition-colors"
                        onClick={onClose}
                    >
                        <i className="fa-regular fa-circle-xmark"></i>
                    </div>
                </div>

                {/* Body */}
                <div className="flex flex-col">
                    
                    {/* Toggle Switch */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="font-bold text-gray-800">Enable Support Button</div>
                            <div className="text-sm text-gray-500">Show a support button on your profile</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={isEnabled}
                                onChange={(e) => setIsEnabled(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                        </label>
                    </div>

                    {/* Inputs (Chỉ hiện khi Enable) */}
                    <div className={`flex flex-col gap-6 mb-4 transition-all duration-300 ${isEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                        <div>
                            <div className="text-gray-600 font-semibold mb-1.5">
                                Donation URL <span className="text-red-500">*</span>
                            </div>
                            <input
                                type="text"
                                placeholder="https://paypal.me/yourname"
                                className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5 border border-transparent focus:border-pink-500 focus:bg-white transition-all outline-none"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <div className="text-xs text-gray-400 mt-1 ml-1">
                                Link to PayPal, Buy Me a Coffee, Momo, etc.
                            </div>
                        </div>

                        <div>
                            <div className="text-gray-600 font-semibold mb-1.5">
                                Button Text
                            </div>
                            <input
                                type="text"
                                placeholder="Support Me"
                                className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5 border border-transparent focus:border-pink-500 focus:bg-white transition-all outline-none"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Preview Button */}
                    <div className="flex justify-center py-2">
                        <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-pink-100 shadow-sm text-gray-800 font-bold">
                            <i className="fa-solid fa-heart text-pink-500 animate-pulse"></i>
                            {text || "Support Me"}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="w-full text-center">
                        <div className={`h-6 mb-2 ${log.type === "error" ? "text-red-500" : "text-green-500"} font-semibold text-sm`}>
                            {log.content}
                        </div>

                        <Button
                            backgrond={{ normal: "#ec4899", hover: "#db2777" }} // Pink color
                            color="#fff"
                            text={loading ? "Saving..." : "Save Settings"}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}