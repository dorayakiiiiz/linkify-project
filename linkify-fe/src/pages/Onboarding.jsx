import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../services/api"
import { useAuth } from "../context/AuthContext"

import Button from "../components/Button"
import Input from "../components/Input"

import { Validator } from "../utils/validators"

export default function Onboarding() {
    const [step, setStep] = useState(1);

    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');
    const [avatar, setAvatar] = useState(null);


    const [log, setLog] = useState({
        type: '',
        content: ''
    });

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

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewURL = URL.createObjectURL(file);
        setAvatarPreview(previewURL);

        setAvatar(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (step === 1) {
            const error = Validator.validateUsername(username);
            if (error) {
                setLog({
                    type: 'error',
                    content: error
                });
                return;
            }
        }
        if (step <= 3) {
            setStep(step + 1);
        } else {
            // gọi api


        }
    }
    
    return (
        <>
            <div className="flex justify-center w-full min-h-screen">

                {/* Ảnh */}
                <img 
                    src="/background_onboarding.jpg" 
                    alt="Background" 
                    className="hidden lg:block w-[40%] h-screen object-cover"
                />
                
                {/* panel */}
                <div className="w-full lg:w-[60%] p-[20px] bg-[#fff] rounded-3xl flex flex-col items-center">
                    
                    <Link
                        to="/"
                        className="font-momo mx-[20px] my-[80px] md:mt-[0px] self-start md:self-end"
                    >
                        Linktree
                        <i className="fa-brands fa-linktree text-[#43E660]"></i>
                    </Link>

                    {step === 1 && (
                        <>
                            <div>
                                <div
                                    className="font-semibold text-3xl font-momo"
                                >
                                    Pick a username for your page
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
                                    className="font-semibold text-3xl font-momo"
                                >
                                    Choose a profile pic that pops
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



                    <div className={`mt-[4px] mb-[10px] ${log.type == 'error' ? 'text-[red]' : 'text-[green]'} font-semibold`}>
                        {log.content}
                    </div>

                    <Button 
                        backgrond={{ normal: "#8129d9", hover: "#5D18A2 "}} 
                        color="#fff" 
                        text="Continue" 
                        onClick={handleSubmit}
                    />

                </div>

            </div>
        </>
    )
}