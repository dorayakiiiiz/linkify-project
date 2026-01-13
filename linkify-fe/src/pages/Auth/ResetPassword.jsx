
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { Validator } from "../../utils/validators";
import Input from "../../components/Shared/Input";
import Button from "../../components/Shared/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { profileService } from "../../services/profileService";
import { useProfile } from "../../context/ProfileContext";


export default function ResetPassword() {
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [otp, setOtp] = useState(new Array(6).fill(''));
    const otpInputRefs = useRef([]);

    const [log, setLog] = useState({ type: '', content: '' });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { isLogin } = useAuth();

    useEffect(() => {
        if (log.content) {
            const timerId = setTimeout(() => setLog({ type: '', content: '' }), 3000);
            return () => clearTimeout(timerId);
        }
    }, [log]);

    useEffect(() => {
        if (isLogin) 
            navigate('/dashboard', { replace: true })
    }, [isLogin, navigate]);

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.value && index < 5) {
            otpInputRefs.current[index + 1].focus();
        }
    }

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpInputRefs.current[index - 1].focus();
        }
    }

    const handleSubmitStep1 = async (e) => {
        e.preventDefault();

        const emailError = Validator.validateEmail(email);
        if (emailError) {
            setLog({ type: 'error', content: emailError });
            return;
        }

        try {
            setLoading(true);
            await authService.forgotPassword(email);
            setLog({ type: 'success', content: 'OTP send to your email.' });
            setTimeout(() => {
                setStep(2);
                setLog({ type: '', content: '' });
            }, 2600);
            
        } catch (err) {
            setLog({
                type: 'error',
                content: err?.response?.data?.message || 'Error occured. Try again later.'
            });
        } finally {
            setLoading(false);
        }
    }

    const handleSubmitStep2 = async (e) => {
        e.preventDefault();

        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            setLog({ type: 'error', content: 'Please enter full 6-digit OTP.' });
            return;
        }

        const passwordError = Validator.validatePassword(newPassword);
        if (passwordError) {
            setLog({ type: 'error', content: passwordError });
            return;
        }

        try {
            setLoading(true);
            await authService.resetPassword({
                email,
                otp: otpValue,
                newPassword
            });

            setLog({ type: 'success', content: 'Password reset successfully. Redirecting...' });

            setTimeout(() => {
                navigate('/auth/login');
            }, 2000);
        } catch (err) {
            setLog({
                type: 'error',
                content: err?.response?.data?.message || 'Invalid OTP or error.'
            });
        } finally {
            setLoading(false);
        }

    }

    const renderStep1 = () => (
        <>
            <Link to="/" className="font-momo m-[20px] self-start md:self-end">
                Linkify
                <i className="fa-brands fa-linktree text-[#43E660]"></i>
            </Link>

            <div className="font-semibold text-3xl font-momo mt-10">
                Reset your password
            </div>

            <div className="text-[#898b8c] my-[10px]">
                Enter your email to receive a reset link.
            </div>

            <form className="flex flex-col w-full justify-center items-center mt-[30px]">
                <Input 
                    type="email" 
                    value={email} 
                    placeholder="Input your email" 
                    setState={setEmail}
                />
                <div className={`mt-[6px] mb-[12px] ${log.type === 'error' ? 'text-[red]' : log.type === 'success' ? 'text-[green] success-text' : ''} font-semibold`}>
                    {log.content}
                </div>
                <Button 
                    backgrond={{ normal: "#000", hover: "#676b5f "}} 
                    color="#fff" 
                    text={!loading ? "Continue" : "Sending..."}
                    disabled={loading}
                    onClick={handleSubmitStep1}
                />
            </form>
        </>
    );

    const renderStep2 = () => (
        <>
            <Link to="/" className="font-momo m-[20px] self-start md:self-end">
                Linkify
                <i className="fa-brands fa-linktree text-[#43E660]"></i>
            </Link>

            <div className="font-semibold text-3xl font-momo mt-10">
                Verify OTP
            </div>

            <div className="text-[#898b8c] my-[10px]">
                Enter 6-digit code sent to {email}.
            </div>

            <form className="flex flex-col w-full justify-center items-center mt-[20px]">
                
                {/* 6 Ô OTP */}
                <div className="flex gap-2 mb-6">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            className="w-10 h-12 md:w-12 md:h-14 border-2 border-gray-300 rounded-xl text-center text-xl font-bold focus:border-black focus:outline-none transition"
                            value={data}
                            ref={el => otpInputRefs.current[index] = el}
                            onChange={e => handleOtpChange(e.target, index)}
                            onKeyDown={e => handleOtpKeyDown(e, index)}
                            onFocus={e => e.target.select()}
                        />
                    ))}
                </div>
                    <Input 
                        type="password" 
                        value={newPassword} 
                        placeholder="Enter new password" 
                        setState={setNewPassword} 
                    />

                <div className={`mt-[6px] mb-[12px] min-h-[24px] ${log.type === 'error' ? 'text-[red]' : 'text-[green]'} font-semibold`}>
                    {log.content}
                </div>

                <Button 
                    backgrond={{ normal: "#000", hover: "#333"}} 
                    color="#fff" 
                    text={loading ? "Verifying..." : "Reset Password"} 
                    onClick={handleSubmitStep2}
                />
                
                <div 
                    className="mt-4 text-sm text-gray-500 hover:text-black cursor-pointer"
                    onClick={() => setStep(1)}
                >
                    Back to Email
                </div>
            </form>
        </>
    );


    return (
        <>
            <div className="flex justify-center w-full h-screen">

                {/* Ảnh */}
                <img 
                    src="/bg.jpg" 
                    alt="Background" 
                    className="hidden lg:block w-[40%] h-full object-cover"
                />
                
                {/* Login panel */}
                <div className="w-full lg:w-[60%] p-[20px] bg-[#fff] rounded-3xl flex flex-col items-center">
                    
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
    
                </div>

            </div>
        </>
    )
}