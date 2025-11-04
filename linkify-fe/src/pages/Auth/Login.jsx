// code các page trong này, gọi các service xử lí API từ folder service

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { Validator } from "../../utils/validators";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import { Link } from "react-router-dom";


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            const timerId = setTimeout(() => setError(''), 3000);
            return () => clearTimeout(timerId);
        }
    }, [error]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate data
        const usernameError = Validator.validateUsername(username);
        if (usernameError) {
            setError(usernameError);
            return;
        }

        const passwordError = Validator.validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        try {
            await authService.login({
                username,
                password
            });

            console.log('login successfully')

            navigate('/');

        } catch (err) {
            console.error('Login error:', err, err.response?.data);
            let errorMessage = 'Error occured. Try again later.';
            if (err.response && err.response.data) {
                errorMessage = err.response.data.message || errorMessage;
            }
            setError(errorMessage);
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

                    <form 
                        onSubmit={handleSubmit}
                        className="flex flex-col w-full justify-center items-center mt-[20px]"
                    >

                        <Input 
                            type="text" 
                            value={username} 
                            placeholder="Input your username" 
                            setState={setUsername}
                        />

                        <Input 
                            type="password" 
                            value={password} 
                            placeholder="Input password" 
                            setState={setPassword}
                        />

                        <div className="mt-[4px] mb-[10px] text-[red] font-semibold">
                            {error}
                        </div>

                        <SubmitButton backgrond={{ normal: "#000", hover: "#676b5f "}} color="#fff" text="Continue" />

                    </form>

                    <div className="text-[#898b8c] mt-[10px]">
                        OR
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full max-w-[400px] py-[12px] border border-[#bfc1c9] hover:bg-[#f7f8f6] font-semibold mt-[10px] rounded-3xl"
                    >
                        <i className="fa-brands fa-google mr-[10px] text-[red]"></i>
                        Continue with Google
                    </button> 

                    <button
                        type="submit"
                        className="cursor-pointer w-full max-w-[400px] py-[12px] border border-[#bfc1c9] hover:bg-[#f7f8f6] font-semibold mt-[20px] rounded-3xl"
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