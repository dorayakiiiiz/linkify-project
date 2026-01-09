import React, { useState, useEffect } from 'react';
import ColorPickerItem from './ColorPickerItem';
import { profileService } from "../../../services/profileService";
import { useProfile } from '../../../context/ProfileContext';

export default function FooterDesign() {
    const { profile, updateDesign, fetchProfile } = useProfile();
    const design = profile?.design || {};

    // --- 1. FOOTER LOGIC ---
    const [footerEnable, setFooterEnable] = useState(
        profile?.footerEnable !== undefined ? profile.footerEnable : true
    );

    const handleToggleFooter = async (checked) => {
        setFooterEnable(checked);
        try {
            // Update root field (footerEnable)
            const formData = new FormData();
            formData.append("profileId", profile._id);
            formData.append("footerEnable", checked);
            await profileService.updateProfile(formData);
            await fetchProfile();
        } catch (err) {
            console.error(err);
        }
    };

    // --- 2. DONATION LOGIC ---
    const donationConfig = design.donationButton || {};

    // Hàm update riêng cho Donation Button trong Design object
    const updateDonationDesign = (field, value) => {
        updateDesign({
            donationButton: {
                ...donationConfig,
                [field]: value
            }
        });
    };

    return (
        <div className="w-full p-4">
            {/* ================= PHẦN 1: FOOTER ================= */}
            <div className="mb-10">
                <h3 className="text-gray-700 text-lg font-semibold mb-4">Footer</h3>
                
                {/* Toggle Footer */}
                <div className="flex bg-[#E6E5E3] p-4 rounded-2xl items-center justify-between mb-6">
                    <div>
                        <div className="font-semibold text-gray-800">Show Linktree Logo</div>
                        <div className="text-sm text-gray-500">Display the branding at the bottom</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={footerEnable}
                            onChange={e => handleToggleFooter(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                </div>

                {/* Footer Colors (Chỉ hiện khi bật footer) */}
                {footerEnable && (
                    <div className="space-y-4">
                        <ColorPickerItem 
                            label="Footer Background" 
                            designSection="footer" 
                            colorKey="backgroundColor" 
                        />
                        <ColorPickerItem 
                            label="Footer Text" 
                            designSection="footer" 
                            colorKey="textColor" 
                        />
                    </div>
                )}
            </div>

            <hr className="mb-8 border-gray-300" />

            {/* ================= PHẦN 2: DONATION BUTTON ================= */}
            <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="text-gray-700 text-lg font-semibold">Donation Button</h3>
                    {/* Link nhắc nhở user bật chức năng này ở trang khác nếu chưa bật */}
                    {!profile?.donation?.isEnabled && (
                        <span className="text-xs text-orange-500 font-medium bg-orange-100 px-2 py-1 rounded">
                            Currently Disabled (Enable in Donation Page)
                        </span>
                    )}
                </div>

                {/* Toggle Use Global Style */}
                <div className="flex bg-[#E6E5E3] p-4 rounded-2xl items-center justify-between mb-6">
                    <div>
                        <div className="font-semibold text-gray-800">Use Global Button Styles</div>
                        <div className="text-sm text-gray-500">Match the style of your other links</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={donationConfig.useGlobal}
                            onChange={e => updateDonationDesign('useGlobal', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                </div>

                {/* Các tùy chỉnh riêng (Chỉ hiện khi tắt Global Style) */}
                {!donationConfig.useGlobal && (
                    <div className="animate-fade-in space-y-6">
                        
                        {/* Shape Selector */}
                        <div>
                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Shape</label>
                            <div className="flex space-x-3">
                                {['square', 'medium', 'round'].map(shape => (
                                    <button
                                        key={shape}
                                        onClick={() => updateDonationDesign('shape', shape)}
                                        className={`flex-1 py-2 border rounded-lg font-medium transition-colors capitalize
                                            ${donationConfig.shape === shape 
                                                ? 'text-gray-900 border-gray-900 bg-white shadow-sm ring-1 ring-gray-900' 
                                                : 'text-gray-500 border-gray-200 bg-gray-100 hover:bg-gray-200'}`}
                                    >
                                        {shape}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Style Selector */}
                        <div>
                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Style</label>
                            <div className="flex space-x-3">
                                {['solid', 'outline', 'glass'].map(style => (
                                    <button
                                        key={style}
                                        onClick={() => updateDonationDesign('style', style)}
                                        className={`flex-1 py-2 border rounded-lg font-medium transition-colors capitalize
                                            ${donationConfig.style === style 
                                                ? 'text-gray-900 border-gray-900 bg-white shadow-sm ring-1 ring-gray-900' 
                                                : 'text-gray-500 border-gray-200 bg-gray-100 hover:bg-gray-200'}`}
                                    >
                                        {style}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="space-y-4 pt-2">
                            <ColorPickerItem 
                                label="Button Color" 
                                designSection="donationButton" 
                                colorKey="color" 
                            />
                            <ColorPickerItem 
                                label="Text & Icon Color" 
                                designSection="donationButton" 
                                colorKey="textColor" 
                            />
                        </div>

                        {/* Icon Selector (Basic) */}
                        <div>
                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Icon</label>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {['fa-heart', 'fa-coffee', 'fa-star', 'fa-gift', 'fa-gem', 'fa-hand-holding-dollar'].map(iconClass => {
                                    const fullIconClass = `fa-solid ${iconClass}`;
                                    const isSelected = donationConfig.icon === fullIconClass;
                                    return (
                                        <button
                                            key={iconClass}
                                            onClick={() => updateDonationDesign('icon', fullIconClass)}
                                            className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center border transition-all shrink-0
                                                ${isSelected 
                                                    ? 'bg-black border-black text-white' 
                                                    : 'bg-white border-gray-300 text-gray-500 hover:border-gray-400'}`}
                                        >
                                            <i className={fullIconClass}></i>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}