// code các page trong này, gọi các service xử lí API từ folder service

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

import { authService } from "../../services/authService";
import { Validator } from "../../utils/validators";

import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (error) {
            const timerId = setTimeout(() => setError(''), 3000);
            return () => clearTimeout(timerId);
        }
    }, [error]);

    const navigate = useNavigate();

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
            await authService.register({
                username,
                password
            });

            navigate('/');

        } catch (err) {
            let errorMessage = 'Error occured. Try again later.';
            if (err.response && err.response.data) {
                errorMessage = err.response.data.message || errorMessage;
            }
            setError(errorMessage);
        }
        
    }

    return (
        // <>
        //     <div className="flex justify-center w-full h-screen">
                
        //         {/* Login panel */}
        //         <div className="w-full lg:w-[60%] bg-[#fff] rounded-3xl flex flex-col items-center">
                    
        //             <Link
        //                 to="/"
        //                 className="font-momo m-[20px] self-start"
        //             >
        //                 Linktree
        //                 <i className="fa-brands fa-linktree text-[#43E660]"></i>
        //             </Link>

        //             <div
        //                 className="font-semibold text-3xl font-momo"
        //             >
        //                 Join Linkify
        //             </div>

        //             <div
        //                 className="text-[#898b8c] my-[10px]"
        //             >
        //                 Sign up for free!
        //             </div>

        //             <form 
        //                 onSubmit={handleSubmit}
        //                 className="flex flex-col justify-center items-center mt-[20px]"
        //             >

        //                 <Input 
        //                     type="text" 
        //                     value={username} 
        //                     placeholder="Input your username" 
        //                     setState={setUsername}
        //                 />

        //                 <Input 
        //                     type="password" 
        //                     value={password} 
        //                     placeholder="Input password" 
        //                     setState={setPassword}
        //                 />

        //                 <Input 
        //                     type="password" 
        //                     value={repassword} 
        //                     placeholder="Input password again" 
        //                     setState={setRepassword}
        //                 />

        //                 <div className="mt-[4px] mb-[10px]  text-[red] font-semibold">
        //                     {error}
        //                 </div>

        //                 <div className="w-[520px] text-[#898b8c] mb-[10px] text-center">
        //                     By clicking 
        //                     <span className="font-semibold"> Create account</span>
        //                     , you agree to Linkify's 
        //                     <span className="font-semibold underline"> privacy notice</span>, 
        //                     <a href="/" className="font-semibold underline">T&Cs </a> 
        //                     and to receive offers, news and updates.
        //                 </div>

        //                 <SubmitButton backgrond={{ normal: "#000", hover: "#676b5f "}} color="#fff" text="Create account" />

        //             </form>

        //             <div className="text-[#898b8c] mt-[10px]">
        //                 OR
        //             </div>

        //             <button
        //                 type="submit"
        //                 className="w-[400px] py-[12px] border border-[#bfc1c9] hover:bg-[#f7f8f6] font-semibold mt-[10px] rounded-3xl"
        //             >
        //                 <i className="fa-brands fa-google mr-[10px] text-[red]"></i>
        //                 Sign up with Google
        //             </button> 

        //             <button
        //                 type="submit"
        //                 className="w-[400px] py-[12px] border border-[#bfc1c9] hover:bg-[#f7f8f6] font-semibold mt-[20px] rounded-3xl"
        //             >
        //                 <i className="fa-brands fa-facebook mr-[10px] text-[blue]"></i>
        //                 Sign up with Facebook
        //             </button>      


        //         </div>

        //         {/* Ảnh */}
        //         <img 
        //             src="../../../public/social_background.jpeg" 
        //             alt="Background" 
        //             className="hidden lg:block w-[40%] h-full object-cover"
        //         />
        //     </div>
        // </>
        <div className="w-full h-screen md:bg-[url('/background_authentication.jpeg')] bg-cover bg-center flex flex-col justify-center items-center md:items-start">
            
            <Link
                to="/"
                className="font-momo md:text-[#fff] mt-[50px] md:mt-[30px] ml-[30px] md:ml-[50px] self-start"
            >
                Linktree
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
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center mt-[10px]"
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

                    <div className="mt-[4px] mb-[10px]  text-[red] font-semibold">
                        {error}
                    </div>

                    <div className="w-full max-w-[520px] text-[#898b8c] mb-[10px] text-center">
                        By clicking 
                        <span className="font-semibold"> Create account</span>
                        , you agree to Linkify's 
                        <a href="" className="font-semibold underline"> privacy notice</a>, 
                        <a href="" className="font-semibold underline">T&Cs </a> 
                        and to receive offers, news and updates.
                    </div>

                    <SubmitButton backgrond={{ normal: "#000", hover: "#676b5f "}} color="#fff" text="Create account" />

                </form>

                <div className="text-[#898b8c] mt-[10px]">
                    OR
                </div>

                <button
                    type="submit"
                    className="cursor-pointer w-full max-w-[400px] py-[12px] border border-[#bfc1c9] hover:bg-[#f7f8f6] font-semibold mt-[10px] rounded-3xl"
                >
                    <i className="fa-brands fa-google mr-[10px] text-[red]"></i>
                    Sign up with Google
                </button> 

                <button
                    type="submit"
                    className="cursor-pointer w-full max-w-[400px] py-[12px] border border-[#bfc1c9] hover:bg-[#f7f8f6] font-semibold mt-[20px] rounded-3xl"
                >
                    <i className="fa-brands fa-facebook mr-[10px] text-[blue]"></i>
                    Sign up with Facebook
                </button>

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