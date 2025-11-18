import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import Button from "../../components/Button"
import Input from "../../components/Input"

import { useAuth } from "../../context/AuthContext"
import { SOCIALS } from "../../constants/socials"
import { linkService } from "../../services/linkService"
import { profileService } from "../../services/profileService"

export default function OnboardingLink() {
    const { user } = useAuth();

    // TODO: fix khi đã có profile rồi mà vào trang này thì nó vẫn chớp 1 cái rồi mới quay lại dashboard
    const navigate = useNavigate();
    useEffect(() => {
        const redirect = async () => {
            const res = await profileService.getProfile(user.id);
            if (res.profile) {
                navigate('/dashboard', { replace: true });
            }
        }
        redirect();
    }, [])

    const [step, setStep] = useState(1);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    
    const [links, setLinks] = useState({});

    const [log, setLog] = useState({ type: '', content: '' });

    const location = useLocation();
    const { profileId } = location.state || {};

    // thay đổi state 1 loạt các ô input link
    const handleValueChange = (platformId, value) => {
        setLinks(prev => ({
            ...prev,
            [platformId]: value
        }));
    }

    const handleTogglePlatform = (platform) => {
        const isSelected = selectedPlatforms.find(p => p.id === platform.id);

        if (isSelected) {
            setSelectedPlatforms(prev => prev.filter(p => p.id !== platform.id));
        } else {
            setSelectedPlatforms(prev => [...prev, platform]);
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

    const handleSubmit = async () => {
        // lọc ra title và url từ các social đã chọn, giữ lại các link có nhập thôi
        const linksToCreate = selectedPlatforms
            .map((platform, index) => ({
                profileId,
                title: platform.name,
                url: links[platform.id]
            }))
            .filter(link => link.url && link.url.trim() !== '');

        if (linksToCreate.length > 0) {
            try {
                // TODO: xử lí validate link...
                await linkService.createLink({ links: linksToCreate });
            } catch (err) {
                setLog({
                    type: 'error',
                    content: err?.response?.data?.message || 'Error occured. Try again later.'
                });
                return;
            }
        } 
        // thêm 1 state ready và click button mới navigate
        navigate('/dashboard');
    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-[url('/onboarding_link.jpg')] bg-cover">
            <div className="w-[700px] h-[600px] bg-[#fff] rounded-3xl flex flex-col items-center">
                
                <div className="flex justify-between w-full">               
                    <div 
                        className="cursor-pointer text-[#8129d9] mt-[20px] ml-[26px]"
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

                <div
                    className="font-semibold text-3xl font-momo"
                >
                    {step === 1 ? 'Select Your Social Media' : 'Link Your Accounts'}
                </div>

                <div
                    className="text-[#898b8c] mt-[10px] mb-[20px]"
                >
                    {step === 1 ? 'Pick the platforms you use to stay connected' : 'Provide the URLs so others can connect with you.'}
                </div>
                
                {step === 1 && (
                    <div className="grid grid-cols-4 gap-[20px] w-[540px] h-[340px] mb-[14px] p-[10px] rounded-xl overflow-y-auto">
                        {SOCIALS.map(platform => {
                            const isSelected = selectedPlatforms.find(p => p.id === platform.id);
                            return (
                                <div
                                    key={platform.id}
                                    className={`aspect-square bg-[#fff] flex items-center justify-center rounded-2xl border ${isSelected ? 'border-[#000] border-[2px]' : 'border-[#E0E2D9]'} shadow hover:translate-y-[-2px] transition`}
                                    onClick={() => handleTogglePlatform(platform)}
                                >
                                    <i className={`text-4xl ${platform.icon} text-[${platform.color}]`}></i>

                                </div>
                            )
                        })}
                    </div>
                )}

                {step === 2 && (
                    <div className="flex flex-col gap-[10px] w-[540px] h-[340px] mb-[14px] p-[10px] rounded-xl overflow-y-auto">
                        {selectedPlatforms.map(platform => (
                            <div 
                                className="flex items-center justify-center gap-[10px]"
                                key={platform.id}
                            >
                                <i className={`text-4xl ${platform.icon} text-[${platform.color}]`}></i>
                                <input 
                                    type="text"
                                    className="h-[50px] w-full max-w-[500px] my-[10px] rounded-xl bg-[#f7f8f6] px-[20px]"
                                    placeholder={platform.placeholder}
                                    onChange={e => handleValueChange(platform.id, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className={`mb-[10px] ${log.type == 'error' ? 'text-[red]' : 'text-[green]'} font-semibold`}>
                    {log.content}
                </div>

                <Button 
                    backgrond={{ normal: "#8129d9", hover: "#5D18A2 "}} 
                    color="#fff" 
                    text={step === 1 ? "Continue" : "Complete"} 
                    onClick={step === 1 ? handleContinue : handleSubmit}
                />


            </div>


        </div>
    )
}