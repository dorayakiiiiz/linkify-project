import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

    return (
        <nav className="w-screen h-[100px] px-[20px] flex justify-between items-center gap-[30px] bg-[#11ff55]">
            <div>
                <Link 
                    to="/"
                    className="bg-[aqua] p-[10px] rounded"
                >
                    Home
                </Link>
            </div>

            <div className="">
                <Link 
                    to="/auth/login"
                    className="bg-[yellow] p-[10px] mr-[20px] rounded"
                >
                    Đăng nhập
                </Link>

                <Link 
                    to="/auth/register"
                    className="bg-[red] text-[#fff] p-[10px] rounded"
                >
                    Đăng kí
                </Link>
            </div>

        </nav>
    )
}