import { Link } from "react-router-dom"

export default function Home() {
    return (  
        <>
            <div className="w-full h-[500px] flex items-center justify-center mx-[50px] md:mx-[100px] lg:mx-[140px]">
                <div className="w-[50%] flex-1">
                    <div
                        className="text-[#fff] font-momo text-3xl md:text-5xl font-bold"
                    >
                        One link for everything you create
                    </div>

                    <div
                        className="text-[#E9C0E9] font-inter md:text-2xl font-bold mt-[20px]"
                    >
                        Turn your social bio into a smart hub.  
                        Share all your links, projects, and content in one beautiful page.
                    </div>

                    <Link
                        to="/auth/login"
                        className="block w-[140px] text-center py-[16px] bg-[#2bebf2] font-semibold mt-[40px] rounded-3xl cursor-pointer"
                    >
                        Get started
                    </Link> 
                </div>

                <video
                    src="/linkify_animation.webm"
                    autoPlay
                    loop
                    muted
                    className="w-[50%] flex-1 h-full mr-[20px]"
                ></video>

            </div>

            
        
        </>
    )
}