// code các page trong này, gọi các service xử lí API từ folder service

import { useState, useEffect, use } from "react"
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { Validator } from "../../utils/validators";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [log, setLog] = useState({
        type: '',
        content: ''
    });
    // dùng trong trường hợp đang đăng nhập r ở chỗ khác mà tnhien nhảy vào trang login lại
    const [justLoggedIn, setJustLoggedIn] = useState(false);
    // dùng để lựa chọn route khi user (creator) có profile rồi/chưa có
    const [hasProfile, setHasProfile] = useState(null);

    const navigate = useNavigate();
    const { login, user } = useAuth();

    // tự xóa log sau 3s
    useEffect(() => {
        if (log.content) {
            const timerId = setTimeout(() => setLog({
                type: '',
                content: ''
            }), 3000);
            return () => clearTimeout(timerId);
        }
    }, [log]);

    // tự redirect qua trang tương ứng sau 2s
    useEffect(() => {
        if (user) {
            // khi ấn button login thì chờ 2s mới redirect
            if (justLoggedIn) {
                const timerId = setTimeout(() => {
                    // nếu là creator mà chưa có profile -> onboarding 
                    if (user.role === 'creator' && !hasProfile)
                        navigate('/onboarding');
                    else 
                        navigate('/dashboard');
                }, 2000);
    
                return () => clearTimeout(timerId);
            } else {
            // khi ở chỗ khác (đã login) mà vào đây thì quay lại dashboard liền
            // TODO: fix khi ở onboarding mà vào đây thì sẽ check lại để redirect
            // vào đúng chỗ như logic phía trên
                navigate('/dashboard');
            }
        }
    }, [user, navigate, justLoggedIn, hasProfile]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate data
        const emailError = Validator.validateEmail(email);
        if (emailError) {
            setLog({
                type: 'error',
                content: emailError
            });
            return;
        }

        const passwordError = Validator.validatePassword(password);
        if (passwordError) {
            setLog({
                type: 'error',
                content: passwordError
            });
            return;
        }

        try {
            const res = await authService.login({
                email,
                password
            });

            // request lên api trả về token, lấy token ra lưu vào storage
            // const { token } = res;
            // localStorage.setItem('token', token);

            const { token, hasProfile } = res;
            login(token);
            setJustLoggedIn(true);
            setHasProfile(hasProfile);
            setLog({
                type: 'success',
                content: 'Login successfully! Redirecting to dashboard...'
            });


        } catch (err) {
            let errorMessage = 'Error occured. Try again later.';
            if (err.response && err.response.data) {
                errorMessage = err.response.data.message || errorMessage;
            }
            setLog({
                type: 'error',
                content: errorMessage
            });
        }
        
    }

    return (
        <>
            <div className="flex justify-center w-full h-screen">

                {/* Ảnh */}
                <img 
                    src="/social_background.jpeg" 
                    alt="Background" 
                    className="hidden lg:block w-[40%] h-full object-cover"
                />
                
                {/* Login panel */}
                <div className="w-full lg:w-[60%] p-[20px] bg-[#fff] rounded-3xl flex flex-col items-center">
                    
                    <Link
                        to="/"
                        className="font-momo m-[20px] self-start md:self-end"
                    >
                        Linktree
                        <i className="fa-brands fa-linktree text-[#43E660]"></i>
                    </Link>

                    <div
                        className="font-semibold text-3xl font-momo"
                    >
                        Welcome back
                    </div>

                    <div
                        className="text-[#898b8c] my-[10px]"
                    >
                        Log in to your Linkify
                    </div>

                    <div
                        className="flex flex-col w-full justify-center items-center mt-[20px]"
                    >

                        <Input 
                            type="email" 
                            value={email} 
                            placeholder="Input your email" 
                            setState={setEmail}
                        />

                        <Input 
                            type="password" 
                            value={password} 
                            placeholder="Input password" 
                            setState={setPassword}
                        />

                        <div className={`mt-[4px] mb-[10px] ${log.type == 'error' ? 'text-[red]' : 'text-[green]'} font-semibold`}>
                            {log.content}
                        </div>

                        <Button 
                            backgrond={{ normal: "#000", hover: "#676b5f "}} 
                            color="#fff" 
                            text="Continue" 
                            onClick={handleSubmit}
                        />

                    </div>

                    <div className="text-[#898b8c] mt-[10px]">
                        OR
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full max-w-[300px] md:max-w-[400px] py-[12px] border border-[#bfc1c9] hover:bg-[#f7f8f6] font-semibold mt-[10px] rounded-3xl"
                    >
                        <i className="fa-brands fa-google mr-[10px] text-[red]"></i>
                        Continue with Google
                    </button> 

                    <button
                        type="submit"
                        className="cursor-pointer w-full max-w-[300px] md:max-w-[400px] py-[12px] border border-[#bfc1c9] hover:bg-[#f7f8f6] font-semibold mt-[20px] rounded-3xl"
                    >
                        <i className="fa-brands fa-facebook mr-[10px] text-[blue]"></i>
                        Continue with Facebook
                    </button> 

                    <div className="mt-[20px] text-[#898b8c]">
                        Don't have an account?
                        <Link 
                            to="/auth/register"
                            className="ml-[4px] text-[#9029D9]"
                        >
                            Sign up
                        </Link>
                    </div>       


                </div>

            </div>
        </>
    )
}