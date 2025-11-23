import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import Button from "../../components/Button"
import Input from "../../components/Input"

import { useAuth } from "../../context/AuthContext"
import { useProfile } from "../../context/ProfileContext"
import { Validator } from "../../utils/validators"
import { profileService } from "../../services/profileService"

export default function OnboardingProfile() {
    const { refreshProfile, profile, loading } = useProfile();

    const { user } = useAuth();

    
    const [step, setStep] = useState(1);
    
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');
    const [avatar, setAvatar] = useState(null);
    // để hiển thị màn hình skip/continue tới onboarding link
    const [showReady, setShowReady] = useState(false);
    // lưu profile id để gửi qua onboarding link
    const [profileId, setProfileId] = useState(null);
    
    const navigate = useNavigate();
    
    const [log, setLog] = useState({ type: '', content: '' });
    
    // tự xóa log sau 2s
    useEffect(() => {
        if (log.content && log.type === 'error') {
            const timerId = setTimeout(() => setLog({
                type: '',
                content: ''
            }), 2000);
            return () => clearTimeout(timerId);
        }
    }, [log]);

    useEffect(() => {
        if (!loading && profile) {
            navigate('/dashboard/links', { replace: true })
        }
    }, [profile, loading, navigate]);
    

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatarPreview);
        }
    }, [avatar]);

    // avatar change
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewURL = URL.createObjectURL(file);
        setAvatarPreview(previewURL);

        setAvatar(file);
    }

    const handleBack = (e) => {
        setStep(step - 1);
    }

    const handleContinue = async (e) => {
        e.preventDefault();

        if (step === 1) {
            const error = Validator.validateUsername(username);
            if (error) {
                setLog({ type: 'error', content: error });
                return;
            }

            const { isAvailable } = await profileService.checkUsername(username);
            if (!isAvailable) {
                setLog({
                    type: 'error',
                    content: 'This username is already taken.'
                });
                return;
            }
        }
        else if (step === 3) {
            if (!avatar) {
                setLog({
                    type: 'error',
                    content: 'Please upload an avatar.'
                });
                return;
            }
        }
        setStep(step + 1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLog({
            type: 'success',
            content: 'Wait a sec. Creating your profile...'
        });

        try {

            // TODO: nhận về 
            const { profileId } = await profileService.createOnboardingProfile({
                username: username.toLowerCase(),
                bio,
                avatar
            })

            await refreshProfile();

            setShowReady(true);
            setProfileId(profileId);

        } catch (err) {
            setLog({
                type: 'error',
                content: err?.response?.data?.message || 'Error occured. Try again later.'
            });
        }
    }

    const handleNext = (e) => {
        e.preventDefault();
        navigate('/onboarding/link', { state: { profileId, fromOnboarding: true }})
    };

    const handleSkip = (e) => {
        e.preventDefault();
        navigate('/dashboard', { replace: true });
    }
    
    return (
        <>
            <div className="flex justify-center w-full min-h-screen">

                {/* Ảnh */}
                <img 
                    src="/onboarding_profile.jpg" 
                    alt="Background" 
                    className="hidden lg:block w-[40%] h-screen object-cover"
                />
                
                {/* panel */}
                <form className="w-full lg:w-[60%] p-[20px] bg-[#fff] rounded-3xl flex flex-col items-center">
                    
                    <Link
                        to="/"
                        className={`font-momo mx-[20px] mt-[40px] ${step > 3 ? 'mb-[100px]' : step === 3 ? 'mb-[40px]' : step === 2 ? 'mb-[50px]' : 'mb-[80px]'} self-start md:self-end`}
                    >
                        Linkify
                        <i className="fa-brands fa-linktree text-[#43E660]"></i>
                    </Link>

                    {step === 1 && (
                        <>
                            <div>
                                <div
                                    className="font-semibold text-3xl font-momo"
                                >
                                    Pick a username for your page
                                    <span className="text-[#f95757] ml-[6px]">*</span>
                                </div>

                                <div
                                    className="text-[#898b8c] mt-[10px] mb-[20px]"
                                >
                                    Example: dorayakiiiiz
                                </div>
                            </div>
                            
                            <Input 
                                type="text" 
                                value={username} 
                                placeholder="Input your username" 
                                setState={setUsername}
                            />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div>
                                <div 
                                    className="cursor-pointer text-[#8129d9] mb-[6px]"
                                    onClick={handleBack}
                                >
                                    <i className="fa-solid fa-arrow-left mr-[4px]"></i>
                                    Back
                                </div>

                                <div
                                    className="font-semibold text-3xl font-momo"
                                >
                                    Tell your followers who you are
                                </div>

                                <div
                                    className="text-[#898b8c] mt-[10px] mb-[20px]"
                                >
                                    Example: I make digital art & share tutorials
                                </div>
                            </div>
                            
                            <Input 
                                type="text" 
                                value={bio} 
                                placeholder="Input your bio" 
                                setState={setBio}
                            />
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div>
                                <div 
                                    className="cursor-pointer text-[#8129d9] mb-[4px]"
                                    onClick={handleBack}
                                >
                                    <i className="fa-solid fa-arrow-left mr-[4px]"></i>
                                    Back
                                </div>

                                <div
                                    className="font-semibold text-3xl font-momo"
                                >
                                    Choose a profile pic that pops
                                    <span className="text-[#f95757] ml-[6px]">*</span>
                                </div>

                                <div
                                    className="text-[#898b8c] mt-[10px] mb-[20px]"
                                >
                                    Max size 2MB. Clear headshot or logo works best.
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-[30px] md:mt-[30px] mb-[10px]">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    id="avatar"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />

                                <label
                                    htmlFor="avatar"
                                    className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-full overflow-hidden border border-[4px] border-[#ccc]"
                                >
                                    
                                    {avatarPreview ? (
                                        <img
                                            src={avatarPreview}
                                            alt="Avatar Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-full ">
                                            <img
                                                src="/anonymous-avatar.jpg"
                                                alt="Default avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </label>

                            </div>

                            
                        </>
                    )}

                    {step === 4 && !showReady && (
                        <>
                            <div>

                                <div 
                                    className="cursor-pointer text-[#8129d9] mb-[4px]"
                                    onClick={handleBack}
                                >
                                    <i className="fa-solid fa-arrow-left mr-[4px]"></i>
                                    Back
                                </div>

                                <div
                                    className="font-semibold text-4xl font-momo"
                                >
                                    Everything looks good
                                </div>

                                <div
                                    className="text-[#898b8c] mt-[10px] mb-[30px]"
                                >
                                    Create your profile now!
                                </div>
                            </div>
                        </>
                    )}

                    {!showReady && (
                        <>
                            <div className={`mb-[16px] ${log.type === 'error' ? 'text-[red]' : log.type === 'success' ? 'text-[#43e660] blink-text font-semibold' : ''} font-semibold`}>
                                {log.content}
                            </div>
        
                            <Button 
                                backgrond={{ normal: "#8129d9", hover: "#5D18A2 "}} 
                                color="#fff" 
                                text={step === 4 ? "Create" : "Continue"} 
                                onClick={step === 4 ? handleSubmit : handleContinue}
                            />
                        </>
                    )}

                    {showReady && (
                        <div>
                            <div
                                className="font-semibold text-3xl font-momo"
                            >
                                Add your social link now?
                            </div>

                            <div
                                className="text-[#39ce52] font-semibold mt-[10px] mb-[20px]"
                            >
                                Profile created successfully!
                            </div>

                            <div className="flex gap-[30px] mt-[30px]">
                                <Button 
                                    backgrond={{ normal: "#ccc", hover: "#a5a0a0 "}} 
                                    color="#fff" 
                                    text={"Skip"} 
                                    onClick={handleSkip}
                                />
                                <Button 
                                    backgrond={{ normal: "#8129d9", hover: "#5D18A2 "}} 
                                    color="#fff" 
                                    text={"Add links"} 
                                    onClick={handleNext}
                                />
                            </div>
                        </div>
                    )}
                </form>

            </div>
        </>
    )
}