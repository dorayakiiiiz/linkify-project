import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useLinks } from "../../context/LinkContext"

import Button from "../../components/Shared/Button"

import { SOCIALS } from "../../constants/socials"
import { linkService } from "../../services/linkService"
import { Helper } from "../../utils/helper"
import { Validator } from "../../utils/validators"

export default function OnboardingLink() {

    const location = useLocation();
    const { profileId, fromOnboarding } = location.state || {};

    const navigate = useNavigate();

    const { fetchLinks } = useLinks();

    useEffect(() => {
        if (!fromOnboarding || !profileId) {
            navigate('/dashboard', { replace: true });
        }
    }, [fromOnboarding, profileId, navigate])

    const [step, setStep] = useState(1);
    // hiển thị thông báo redirect tới dashboard
    const [showReady, setShowReady] = useState(false);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    // lưu 1 object links với các key là platform id và value là url
    const [links, setLinks] = useState({});
    const [extraLinks, setExtraLinks] = useState(["", "", ""]);

    // mảng ref giữ các ô input để cái nào ko hợp lệ -> focus nhập lại
    const socialInputRefs = useRef({});
    const extraInputRefs = useRef([]);

    const [log, setLog] = useState({ type: '', content: '' });


    // thay đổi state 1 loạt các ô input link
    const handleValueChange = (platformId, value) => {
        setLinks(prev => ({
            ...prev,
            [platformId]: value
        }));
    }

    const handleExtraChange = (index, value) => {
        setExtraLinks(prev => {
            const next = [...prev];
            next[index] = value;
            return next;
        });
    }

    const handleTogglePlatform = (platform) => {
        const isSelected = selectedPlatforms.find(p => p.id === platform.id);

        if (isSelected) {
            setSelectedPlatforms(prev => prev.filter(p => p.id !== platform.id));
            setLinks(prev => {
                const newLinks = { ...prev };
                delete newLinks[platform.id];
                return newLinks;
            })
        } else {
            setSelectedPlatforms(prev => [...prev, platform]);
            setLinks(prev => ({
                ...prev,
                [platform.id]: platform.baseUrl
            }))
        }
    }

    useEffect(() => {
        if (log.content) {
            const timerId = setTimeout(() => setLog({ type: '', content: '' }), 2000);
            return () => clearTimeout(timerId);
        }
    }, [log]);

    const handleContinue = () => {
        if (selectedPlatforms.length > 0) 
            setStep(step + 1);
        else {
            setLog({
                type: 'error',
                content: 'Select at least one item.'
            })
        }
    }

    const handleSkip = () => {
        navigate('/dashboard');
    }

    const handleBack = () => {
        setStep(step - 1);
    }

    if (!fromOnboarding || !profileId) {
        return null;
    }

    const handleSubmit = async () => {
        // inline helper
        const validateInput = (url, inputRef) => {
            if (!url || url.trim() === '') return true;

            const error = Validator.validateUrl(url);
            
            if (error) {
                setLog({ type: 'error', content: error })
                if (inputRef) {
                    inputRef.focus();
                    inputRef.scrollIntoView({ behavior: 'smooth', block: 'center' });   
                }
                return false;
            }
            
            return true;
        }

        for (const platform of selectedPlatforms) {
            const url = links[platform.id];
            const ref = socialInputRefs.current[platform.id];
            
            if (!validateInput(url, ref)) return;
        }

        for (let i = 0; i < extraLinks.length; i++) {
            const url = extraLinks[i];
            const ref = extraInputRefs.current[i];

            if (!validateInput(url, ref)) return;
        }

        // lọc ra title và url từ các social đã chọn, giữ lại các link có nhập thôi
        const socialLinks = selectedPlatforms
        .map((platform) => ({
            profileId,
            title: platform.name,
            url: links[platform.id]
        }))
        .filter(link => link.url && link.url.trim() !== '');

        const additionalLinks = extraLinks
        .map((link) => ({
            profileId,
            title: Helper.getTitleFromUrl(link),
            url: link
        }))
        .filter(link => link.url && link.url.trim() !== '');

        const linksToCreate = [...socialLinks, ...additionalLinks];

        if (linksToCreate.length > 0) {
            try {
                await Promise.all(linksToCreate.map(link => linkService.addLink(link)));
            
                await fetchLinks();
                
            } catch (err) {
                setLog({
                    type: 'error',
                    content: err?.response?.data?.message || 'Error occured. Try again later.'
                });
                return;
            }
        } 
        setShowReady(true);

        setTimeout(() => {
            navigate('/dashboard', { replace: true });
        }, 2600);
    }


    return (
        <div className="flex justify-center items-center w-full min-h-screen md:bg-[url('/onboarding_link.jpg')] bg-cover">
            <div className="absolute inset-0 bg-black opacity-10 backdrop-blur-lg"></div>
            <div className="w-[700px] h-screen md:h-[600px] bg-[#fff] md:rounded-3xl flex flex-col items-center z-10">

                {!showReady && (
                    <>
                        <div className="flex justify-between w-full">               
                            <div 
                                className="cursor-pointer text-[#8129d9] mt-[20px] mb-[10px] md:mb-0 ml-[26px]"
                                onClick={handleSkip}
                            >
                                Skip
                            </div>

                            {step === 2 && (
                                <div 
                                    className="cursor-pointer text-[#8129d9] mt-[20px] mr-[26px]"
                                    onClick={handleBack}
                                >
                                    Back
                                </div>
                            )}

                        </div>

                        <div className="font-semibold text-3xl font-momo px-[24px] mt-2 md:mt-0">
                            {step === 1 ? 'Select Your Social Media' : 'Link Your Accounts'}
                        </div>

                        <div
                            className="text-[#898b8c] mt-[10px] mb-[20px]"
                        >
                            {step === 1 ? 'Pick the platforms you use to stay connected' : 'Provide the URLs so others can connect with you.'}
                        </div>
                        
                        {step === 1 && (
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-[20px] w-full max-w-[540px] h-full max-h-[500px] md:max-h-[340px] mb-[14px] px-[20px] rounded-xl overflow-y-auto">
                                {SOCIALS.map(platform => {
                                    const isSelected = selectedPlatforms.find(p => p.id === platform.id);
                                    return (
                                        <div
                                            key={platform.id}
                                            className={`cursor-pointer aspect-square bg-[#fff] flex flex-col items-center gap-[4px] justify-center rounded-2xl border ${isSelected ? 'border-[#000] border-[2px]' : 'border-[#E0E2D9]'} shadow hover:translate-y-[-2px] transition`}
                                            onClick={() => handleTogglePlatform(platform)}
                                        >
                                            <i className={`text-4xl ${platform.icon} text-[${platform.color}]`}></i>
                                            <div className="text-[#9f9fa5] font-quicksand text-sm">
                                                {platform.name}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="flex flex-col gap-[10px] w-full max-w-[540px] h-[400px] md:h-[340px] mb-[10px] px-[20px] py-[10px] rounded-xl overflow-y-auto">
                                {selectedPlatforms.map(platform => (
                                    <div 
                                        className="flex items-center justify-center gap-[10px]"
                                        key={platform.id}
                                    >
                                        <div className="h-[50px] w-full max-w-[50px] border border-[#d6d6d6] rounded-2xl flex items-center justify-center">
                                            <i className={`text-3xl ${platform.icon} text-[${platform.color}]`}></i>
                                        </div>
                                        <input 
                                            type="text"
                                            ref={el => socialInputRefs.current[platform.id] = el}
                                            className="h-[50px] w-full my-[10px] rounded-xl bg-[#f7f8f6] px-[20px]"
                                            placeholder={platform.placeholder}
                                            value={links[platform.id] || ''}
                                            onChange={e => handleValueChange(platform.id, e.target.value)}
                                        />
                                    </div>
                                ))}

                                {/* additional links */}
                                <div className="text-center font-semibold text-xl font-momo mt-[24px]">
                                    Additional links (optional)
                                </div>
                                {extraLinks.map((item, idx) => (
                                    <div 
                                        className="flex items-center justify-center gap-[10px]"
                                        key={idx}
                                    >
                                        <div className="h-[50px] w-full max-w-[50px] border border-[#d6d6d6] rounded-2xl flex items-center justify-center">
                                            <i className="text-3xl fa-solid fa-link text-[#19a5fc]"></i>
                                        </div>
                                        <input 
                                            type="text"
                                            ref={el => extraInputRefs.current[idx] = el}
                                            className="h-[50px] w-full my-[10px] rounded-xl bg-[#f7f8f6] px-[20px]"
                                            placeholder="url"
                                            onChange={e => handleExtraChange(idx, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className={`mb-[10px] min-h-[20px] text-center ${log.type == 'error' ? 'text-[red]' : 'text-[green]'} font-semibold`}>
                            {log.content}
                        </div>

                        <Button 
                            backgrond={{ normal: "#8129d9", hover: "#5D18A2 "}} 
                            color="#fff" 
                            text={step === 1 ? "Continue" : "Complete"} 
                            onClick={step === 1 ? handleContinue : handleSubmit}
                        />
                    </>
                )}

                {showReady && (
                    <div className="">
                        <div
                            className={`font-momo mx-[20px] mt-[100px] ${step > 3 ? 'mb-[100px]' : step === 3 ? 'mb-[40px]' : step === 2 ? 'mb-[50px]' : 'mb-[80px]'} self-start md:self-end`}
                        >
                            Linkify
                            <i className="fa-brands fa-linktree text-[#43E660]"></i>
                        </div>
                        <div className="font-semibold text-3xl font-momo px-[24px] mt-[100px]">
                            <div>You're all set!</div>
                            <div>Let's build your profile together.</div>
                        </div>
                        <div className="text-[#43e660] font-semibold text-xl mt-[10px] mb-[20px] px-[24px] success-text">
                            Redirecting to your dashboard...
                        </div>
                    </div>
                )}


            </div>


        </div>
    )
}