// code các page trong này, gọi các service xử lí API từ folder service

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

import { authService } from "../../services/authService";
import { Validator } from "../../utils/validators";
import { useAuth } from "../../context/AuthContext";

import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Register() {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [log, setLog] = useState({ type: '', content: '' });

    useEffect(() => {
        if (log.content) {
            const timerId = setTimeout(() => setLog({ type: '', content: ''}), 2600);
            return () => clearTimeout(timerId);
        }
    }, [log]);

    const navigate = useNavigate();
    const { isLogin } = useAuth();

    // đã đăng nhập rồi mà vào lại -> tự redirect về dashboard
    useEffect(() => {
        if (isLogin) {
            navigate('/dashboard', { replace: true });
        }
    }, [isLogin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate data
        const emailError = Validator.validateEmail(email);
        if (emailError) {
            setLog({ type: 'error', content: emailError });
            return;
        }

        const displayNameError = Validator.validateDisplayName(displayName);
        if (displayNameError) {
            setLog({ type: 'error', content: displayNameError });
            return;
        }

        const passwordError = Validator.validatePassword(password);
        if (passwordError) {
            setLog({ type: 'error', content: passwordError });
            return;
        }
        
        try {
            await authService.register({
                email,
                displayName,
                password
            });

            setLog({
                type: 'success',
                content: 'Register successfully! Redirecting to login page...'
            });

            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);

        } catch (err) {
            setLog({
                type: 'error',
                content: err?.response?.data?.message || 'Error occured. Try again later.'
            });
        }
        
    }

    return (
      
        <div className="w-full h-screen md:bg-[url('/background_authentication.jpeg')] bg-cover bg-center flex flex-col justify-center items-center md:items-start">
            
            <Link
                to="/"
                className="font-momo md:text-[#fff] mt-[50px] md:mt-[30px] ml-[30px] md:ml-[50px] self-start"
            >
                Linkify
                <i className="fa-brands fa-linktree text-[#43E660]"></i>
            </Link>
            
            <div className="w-full max-w-[660px] max-h-[600px] mt-[16px] mb-[60px] md:ml-[100px] p-[20px] bg-[#fff] rounded-3xl flex flex-col items-center">
                

                <div
                    className="font-semibold text-3xl font-momo"
                >
                    Join Linkify
                </div>

                <div
                    className="text-[#898b8c] my-[5px]"
                >
                    Sign up for free!
                </div>

                <form
                    className="flex flex-col justify-center items-center mt-[10px]"
                >

                    <Input 
                        type="email" 
                        value={email} 
                        placeholder="Input your email" 
                        setState={setEmail}
                    />

                    <Input 
                        type="text" 
                        value={displayName} 
                        placeholder="Input your display name" 
                        setState={setDisplayName}
                    />

                    <Input 
                        type="password" 
                        value={password} 
                        placeholder="Input password" 
                        setState={setPassword}
                    />

                    <div className={`mt-[4px] mb-[10px] ${log.type === 'error' ? 'text-[red]' : log.type === 'success' ? 'text-[green] success-text' : ''} font-semibold`}>
                        {log.content}
                    </div>

                    <div className="w-full max-w-[520px] text-[#898b8c] mb-[10px] text-center">
                        By clicking 
                        <span className="font-semibold"> Create account</span>
                        , you agree to Linkify's 
                        <a href="" className="font-semibold underline"> privacy notice</a>, 
                        <a href="" className="font-semibold underline">T&Cs </a> 
                        and to receive offers, news and updates.
                    </div>

                    <Button 
                        backgrond={{ normal: "#000", hover: "#676b5f "}} 
                        color="#fff" 
                        text="Create account" 
                        onClick={handleSubmit}
                    />

                </form>

                <div className="text-[#898b8c] mt-[10px]">
                    OR
                </div>

                <div className="flex w-full max-w-[250px] md:max-w-[500px] gap-[30px] mt-[4px]">
                    <button
                        type="submit"
                        className="cursor-pointer flex-1 flex items-center justify-center py-[16px] md:py-[12px] border bg-[#ff2821] hover:bg-[#f96666] text-[#fff] font-semibold rounded-3xl"
                    >
                        <i className="fa-brands fa-google md:mr-[10px]"></i>
                        <div className="hidden md:block">Sign up with Google</div>
                    </button> 

                    <button
                        type="submit"
                        className="cursor-pointer flex-1 flex items-center justify-center py-[16px] md:py-[12px] bg-[#295ff4] hover:bg-[#5683ff] text-[#fff] font-semibold rounded-3xl"
                    >
                        <i className="fa-brands fa-facebook md:mr-[10px]"></i>
                        <div className="hidden md:block">Sign up with Facebook</div>
                    </button>
                </div>
                

                <div className="mt-[10px] text-[#898b8c]">
                    Already have an account?
                    <Link 
                        to="/auth/login"
                        className="ml-[4px] text-[#9029D9]"
                    >
                        Log in
                    </Link>
                </div>      


            </div>
        </div>
    )
}