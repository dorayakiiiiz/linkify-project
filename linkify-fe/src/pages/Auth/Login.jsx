// code các page trong này, gọi các service xử lí API từ folder service

import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await authService.login({
                username,
                password
            });

            console.log('login successfully')

            navigate('/');

        } catch (err) {
            console.error('Login error:', err, err.response?.data);
            let errorMessage = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
            if (err.response && err.response.data) {
                errorMessage = err.response.data.message || errorMessage;
            }
            setError(errorMessage);
        }
        
    }

    return (
        <div className="w-[300px] h-[300px] bg-[green] rounded-3xl flex flex-col justify-center items-center">
            <div
                className="text-[#fff] font-semibold text-2xl mb-[20px]"
            >
                Đăng nhập
            </div>
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center"
            >

                <input 
                    type="text"
                    value={username}
                    className="bg-[white] outline-none w-[250px] h-[30px] px-[10px]"
                    placeholder="Nhập username của bạn"
                    onChange={e => setUsername(e.target.value)}
                />

                <input 
                    type="text"
                    value={password}
                    className="bg-[white] outline-none w-[250px] h-[30px] px-[10px] mt-[20px]"
                    placeholder="Nhập mật khẩu"
                    onChange={e => setPassword(e.target.value)}
                />

                <div className="mt-[20px] h-[10px] text-[yellow]">
                    {error}
                </div>

                <button
                    type="submit"
                    className="h-[40px] w-[150px] bg-[#1f5] mt-[30px] rounded-xl"
                >
                    Đăng nhập
                </button>

            </form>
        </div>
    )
}