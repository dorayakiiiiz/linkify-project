import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <div className="relative">
            <div className="md:absolute left-[40px] right-[40px] bottom-[80px] px-[20px] md:px-[40px] min-h-[120px] md:min-h-[150px] rounded-3xl bg-[#fff] flex items-center justify-between gap-[20px]">
                
                <Link
                    to="/"
                    className="hidden md:block font-momo text-xl md:text-2xl lg:text-3xl flex-3 flex-shrink-0"
                >
                    Linktree
                    <i className="fa-brands fa-linktree text-[#43E660]"></i>
                </Link>

                <div className="w-full flex-2 flex flex-wrap gap-x-[40px] gap-y-[10px] md:gap-y-[20px] text-[#0b3abc] items-center justify-center">
                    {[
                        {
                            title: "Home",
                            link: "/",
                            onClick: () => window.scrollTo({ top: 0, behavior: "smooth" })
                        },
                        {
                            title: "About us",
                            link: "/about" // Sửa đường dẫn ở đây
                        },
                        {
                            title: "Features",
                            link: "/"
                        },
                       
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.link}
                            className="font-inter md:text-xl font-semibold"
                            onClick={item.onClick}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>

            </div>

            <div className="hidden md:flex w-full h-[150px] bg-[#502274] items-end justify-center">
                <div className="font-momo md:text-xl text-[#fff] mb-[30px]">
                    © 2025 Linkify. Built with ❤️ by group 10.
                </div>
            </div>
        
        </div>
    )
}