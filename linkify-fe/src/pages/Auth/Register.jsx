// code các page trong này, gọi các service xử lí API từ folder service

import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { authService } from "../../services/authService";
import { Validator } from "../../utils/validators";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate data
        const usernameError = Validator.validateUsername(username);
        if (usernameError) {
            setError(usernameError);
            return;
        }

        const passwordError = Validator.validatePassword(username);
        if (passwordError) {
            setError(passwordError);
            return;
        }
        
        if (password !== repassword) {
            setError('Mật khẩu nhập lại không khớp.');
            return;
        }

        try {
            await authService.register({
                username,
                password
            });

            navigate('/');

        } catch (err) {
            let errorMessage = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
            if (err.response && err.response.data) {
                errorMessage = err.response.data.message || errorMessage;
            }
            setError(errorMessage);
        }
        
    }

    return (
        <div className="w-[300px] h-[360px] bg-[green] rounded-3xl flex flex-col justify-center items-center">
            <div
                className="text-[#fff] font-semibold text-2xl mb-[20px]"
            >
                Đăng kí
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

                <input 
                    type="text"
                    value={repassword}
                    className="bg-[white] outline-none w-[250px] h-[30px] px-[10px] mt-[20px]"
                    placeholder="Nhập lại mật khẩu"
                    onChange={e => setRepassword(e.target.value)}
                />

                <div className="mt-[20px] h-[10px] text-[yellow]">
                    {error}
                </div>

                <button
                    type="submit"
                    className="h-[40px] w-[150px] bg-[#1f5] mt-[30px] rounded-xl"
                >
                    Đăng kí
                </button>

            </form>
        </div>
    )
}