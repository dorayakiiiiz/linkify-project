import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

    return (
        <nav className="w-screen h-[100px] flex justify-end items-center gap-[30px] bg-[green]">

            <Link 
                to="/auth/login"
                className="bg-[blue] p-[10px]"
            >
                Đăng nhập
            </Link>

            <Link 
                to="/auth/register"
                className="bg-[red] p-[10px]"
            >
                Đăng kí
            </Link>

        </nav>
    )
}