
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { Validator } from "../../utils/validators";
import Input from "../../components/Shared/Input";
import Button from "../../components/Shared/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { profileService } from "../../services/profileService";
import { useProfile } from "../../context/ProfileContext";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [log, setLog] = useState({
        type: '',
        content: ''
    });
    // dùng trong trường hợp đang đăng nhập r ở chỗ khác mà tnhien nhảy vào trang login lại
    const [justLoggedIn, setJustLoggedIn] = useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login, isLogin } = useAuth();
    const { fetchProfile } = useProfile();

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

    // đã đăng nhập rồi mà vào lại -> tự redirect về dashboard
    useEffect(() => {
        if (isLogin && !justLoggedIn) {
            navigate('/dashboard', { replace: true })
        }
    }, [isLogin, justLoggedIn, navigate]);

    // Lắng nghe sự kiện gửi message của cửa sổ pop up gg/fb
    useEffect(() => {
        const receiveMessageFromPopUp = async(e) => {
            if (e.data.type === 'login_success') {
                const token = e.data.payload.token
                login(token);
                setJustLoggedIn(true);
                setLog({
                    type: 'success',
                    content: 'Login successfully! Redirecting...'
                });

                await fetchProfile();

                setTimeout(() => {
                    navigate('/dashboard', { replace: true })
                }, 2600);
            }
            else {
                setLog({
                    type: 'error',
                    content: e.data.payload?.message || 'Login failed'
                })
            }
        }
        window.addEventListener('message', receiveMessageFromPopUp)
        return () => window.removeEventListener('message', receiveMessageFromPopUp)
    }, [login, fetchProfile, navigate])

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate data
        const emailError = Validator.validateEmail(email);
        if (emailError) {
            setLog({ type: 'error', content: emailError });
            return;
        }

        const passwordError = Validator.validatePassword(password);
        if (passwordError) {
            setLog({ type: 'error', content: passwordError });
            return;
        }

        try {
            setLoading(true);
            const res = await authService.login({
                email,
                password
            });

            // Lấy token được trả về từ backend
            const { token } = res;
            // Lưu token vào localStorage
            login(token);
            setJustLoggedIn(true);
            setLoading(false);
            setLog({
                type: 'success',
                content: 'Login successfully! Redirecting...'
            });

            await fetchProfile();

            setTimeout(() => {
                navigate('/dashboard', { replace: true })
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

    // Hàm click vào mở pop up Auth GG
    const handleGoogleLogin = (e) => {
        //Chuyển hướng sang backend để xác thực GG
        const fullAuthUrl = authService.getGoogleAuthUrl();
        // Mở pop up xác nhận GG
        window.open(fullAuthUrl, 'googleAuthPopup', 'width=600,height=600');
    }

    // Hàm click vào mở pop up Auth FB
    const handleGFacebookLogin = (e) => {
        //Chuyển hướng sang backend để xác thực GG
        const fullAuthUrl = authService.getFacebookAuthUrl();
        // Mở pop up xác nhận GG
        window.open(fullAuthUrl, 'facebookAuthPopup', 'width=600,height=600');
    }


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
                    
                    <Link
                        to="/"
                        className="font-momo m-[20px] self-start md:self-end"
                    >
                        Linkify
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

                    <form
                        className="flex flex-col w-full justify-center items-center mt-[20px]"
                    >

                        <div>
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
                            <Link 
                                to="/auth/reset-password"
                                className="block text-sm text-gray-400 ml-2 hover:text-gray-700"
                            >
                                Forgot password?
                            </Link>
                        </div>


                        <div className={`mt-[4px] mb-[10px] ${log.type === 'error' ? 'text-[red]' : log.type === 'success' ? 'text-green-400 success-text' : ''} font-semibold`}>
                            {log.content}
                        </div>

                        <Button 
                            backgrond={{ normal: "#000", hover: "#676b5f "}} 
                            color="#fff" 
                            text="Continue" 
                            onClick={handleSubmit}
                            disabled={loading}
                        />

                    </form>

                    <div className="text-[#898b8c] mt-[10px]">
                        OR
                    </div>

                    <div className="flex flex-col w-full max-w-[300px] gap-5 mt-6">
                    
                        <div className="w-full">
                            <button 
                                type="button"
                                onClick={handleGoogleLogin} 
                                className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-gray-200 rounded-3xl cursor-pointer font-quicksand hover:bg-gray-50 transition-colors font-bold text-gray-700"
                            >
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                                Sign up with Google
                            </button>
                        </div>

                        <div className="">
                            <button 
                                type="button"
                                onClick={handleGFacebookLogin} 
                                className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-gray-200 rounded-3xl cursor-pointer font-quicksand hover:bg-gray-50 transition-colors font-bold text-gray-700"
                            >
                                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Google" />
                                Sign up with Facebook
                            </button>
                        </div>
    
                       
                    </div>

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