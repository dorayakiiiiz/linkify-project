import { useState, useEffect } from "react";
import Button from "../../components/Shared/Button";
import { useProfile } from "../../context/ProfileContext";
import { profileService } from "../../services/profileService";

export default function DonationPage() {
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

    const handleToggleEnabled = async (checked) => {
        setIsEnabled(checked);
        try {
            const formData = new FormData();
            formData.append("profileId", profile._id);
            const donationPayload = {
                ...(profile?.donation || {}),
                isEnabled: checked,
                url,
                text
            };
            formData.append("donation", JSON.stringify(donationPayload));
            await profileService.updateProfile(formData);
            await fetchProfile();
        } catch (err) {
            setLog({ type: "error", content: err.response?.data?.message || "Failed to update enable status." });
        }
    };

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
            const donationPayload = {
                ...(profile?.donation || {}),
                isEnabled: isEnabled,
                url,
                text: text || "Support Me"
            };
            formData.append("donation", JSON.stringify(donationPayload));

            await profileService.updateProfile(formData);
            await fetchProfile(); 
            
            setLog({ type: "success", content: "Donation settings updated!" });

        } catch (err) {
            setLog({ type: "error", content: err.response?.data?.message || "Failed to update settings." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="w-full h-full flex flex-col"
        >
            <div className="p-6 md:px-[10px] lg:px-[20px] xl:px-[60px]">
    
                {/* Toggle Switch */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="font-bold text-lg text-gray-800">Enable Support Button</div>
                        <div className="text-gray-500">Show a support button on your profile</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={isEnabled}
                            onChange={(e) => handleToggleEnabled(e.target.checked)}
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
                        disabled={!isEnabled}
                    />
                </div>
            </div>
        </div>
    );
}