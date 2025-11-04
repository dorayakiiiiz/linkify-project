import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

    const [show, setShow] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY.current && window.scrollY > 100)
                setShow(false);
            else
                setShow(true);
            lastScrollY.current = window.scrollY;
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav 
            className={`bg-[#fff] fixed left-[5%] right-[5%] top-[40px] h-[70px] rounded-full px-[20px] flex justify-between items-center gap-[30px] transition-transform duration-500
            ${show ? "translate-y-0" : "-translate-y-[160%]"}`}
        >
            <div className="flex justify-center items-center">
                <Link 
                    to="/"
                    className="flex-shrink-0 text-xl font-bold font-inter ml-[10px] cursor-pointer"
                >
                    Linkify
                    <i className="fa-brands fa-linktree"></i>

                </Link>

                <div className="hidden md:flex justify-center items-center md:ml-[10px] lg:ml-[70px] font-semibold">
                    <div className="py-[10px] px-[20px] hover:bg-[#EFF0EC] rounded-xl cursor-pointer">
                        Template
                    </div>
                    <div className="py-[10px] px-[20px] hover:bg-[#EFF0EC] rounded-xl cursor-pointer">
                        Marketplace
                    </div>
                    <div className="py-[10px] px-[20px] hover:bg-[#EFF0EC] rounded-xl cursor-pointer">
                        Learn
                    </div>
                </div>
            </div>

            <div className="flex">
                <Link 
                    to="/auth/login"
                    className="flex-shrink-0 font-semibold bg-[#EFF0EC] px-[20px] py-[14px] mr-[20px] rounded"
                >
                    Login
                </Link>

                <Link 
                    to="/auth/register"
                    className="flex-shrink-0 font-semibold bg-[#262D3E] text-[#fff] px-[20px] py-[14px] rounded-4xl"
                >
                    Sign up
                </Link>
            </div>

        </nav>
    )
}