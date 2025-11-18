import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useLayoutEffect } from "react"

import Button from "../../components/Button"
import Input from "../../components/Input"

import { useAuth } from "../../context/AuthContext"
import { Validator } from "../../utils/validators"
import { profileService } from "../../services/profileService"

export default function OnboardingProfile() {
    const { user } = useAuth();

    // TODO: fix khi đã có profile rồi mà vào trang này thì nó vẫn chớp 1 cái rồi mới quay lại dashboard
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

    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');
    const [avatar, setAvatar] = useState(null);

    const navigate = useNavigate();

    const [log, setLog] = useState({ type: '', content: '' });

    // tự xóa log sau 2s
    useEffect(() => {
        if (log.content) {
            const timerId = setTimeout(() => setLog({
                type: '',
                content: ''
            }), 2000);
            return () => clearTimeout(timerId);
        }
    }, [log]);

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

        try {

            // TODO: nhận về 
            const { profileId } = await profileService.createOnboardingProfile({
                username,
                bio,
                avatar
            })

            // TODO: khi nhận kqua từ res sẽ hiện tbao có muốn thêm link ko
            // và có thể ấn bỏ qua để naviagte thẳng vào dashboard
            // -> thêm 1 state ready
            navigate('/onboarding/link', { state: { profileId }});

        } catch (err) {
            setLog({
                type: 'error',
                content: err?.response?.data?.message || 'Error occured. Try again later.'
            });
        }
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
                                    className="w-0 h-0 opacity-0 hidden"
                                />

                                <label
                                    htmlFor="avatar"
                                    className="w-[150px] h-[50px] rounded-4xl bg-[#15d8ea] hover:bg-[#21abb7] text-[#fff] flex items-center justify-center"
                                >
                                    {avatar ? 'Change' : 'Upload avatar'}
                                </label>

                                {avatarPreview && (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        className="w-[500px] md:w-[450px]"
                                    />
                                )}
                            </div>

                            
                        </>
                    )}

                    {step === 4 && (
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



                    <div className={`mt-[4px] mb-[10px] ${log.type == 'error' ? 'text-[red]' : 'text-[green]'} font-semibold`}>
                        {log.content}
                    </div>

                    <Button 
                        backgrond={{ normal: "#8129d9", hover: "#5D18A2 "}} 
                        color="#fff" 
                        text={step === 4 ? "Create" : "Continue"} 
                        onClick={step === 4 ? handleSubmit : handleContinue}
                    />

                </form>

            </div>
        </>
    )
}