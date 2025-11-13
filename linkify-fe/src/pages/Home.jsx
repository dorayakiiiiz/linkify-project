import { Link } from "react-router-dom"

export default function Home() {
    return (  
        <>
            <div className="w-full min-h-[500px] md:min-h-[600px] flex gap-[20px] items-center justify-center px-[50px] md:px-[100px] lg:px-[140px]">
                <div className="w-full md:w-[50%]">
                    <div
                        className="text-[#fff] font-momo text-3xl md:text-4xl lg:text-5xl font-bold"
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
                    className="hidden md:block w-[50%] h-full mr-[20px]"
                />

            </div>

            <div className="w-full flex flex-col items-center min-h-[740px] pb-[50px] bg-[#d4b5ff]">
                <div className="text-[#002795] font-momo text-3xl md:text-5xl my-[100px]">
                    Why choose Linkify?
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px] mx-[40px]">
                    {[
                        {
                            title: "All links in one place",
                            description: "Keep your social, business, and personal links organized and easy to share."
                        },
                        {
                            title: "Customizable themes",
                            description: "Express yourself with unique layouts, colors, and fonts — no coding needed."
                        },
                        {
                            title: "Smart analytics",
                            description: "Track your link clicks and audience engagement in real time."
                        },
                        {
                            title: "Fast & Simple",
                            description: "Create your page in under a minute — it just works."
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-[#fff] max-w-[300px] min-h-[300px] px-[30px] py-[10px] rounded-4xl flex flex-col items-center">
                            <div className="flex-2 text-[#1c3672] mt-[40px] font-momo text-2xl text-center">
                                {item.title}
                            </div>
                            <div className="flex-3 text-[#54564f] font-inter text-center">
                                {item.description}
                            </div>
                        </div>
                    ))}
                </div>

            </div>



            <div className="bg-[#96d6ff] w-full min-h-[500px] md:min-h-[740px] flex gap-[20px] items-center justify-center px-[50px] md:px-[100px] lg:px-[140px]">
                <video
                    src="/linkify_animation.webm"
                    autoPlay
                    loop
                    muted
                    className="hidden md:block w-[50%] h-full"
                />
                <div className="w-full md:w-[50%]">
                    <div
                        className="text-[#fff] font-momo text-3xl md:text-4xl lg:text-5xl font-bold"
                    >
                        Designed for Creators, Artists, and Entrepreneurs 
                    </div>

                    <div
                        className="text-[#fff] font-inter md:text-2xl font-bold mt-[20px]"
                    >
                        Whether you're a content creator, a small business, or just someone who wants to share their world —  
                        Linkify helps you connect everything that matters.
                    </div>

                    <Link
                        to="/auth/login"
                        className="block w-[140px] text-center py-[16px] bg-[#4583ef] text-[#fff] font-semibold mt-[40px] rounded-3xl cursor-pointer"
                    >
                        Explore
                    </Link> 
                </div>

            </div>

            <div className="w-full bg-[#780016] min-h-[500px] md:min-h-[800px] flex flex-col items-center justify-center gap-[30px] md:gap-[60px] px-[50px] md:px-[100px] lg:px-[140px]">
                <div className="text-center font-momo font-bold text-[#E9C0E9] text-3xl md:text-5xl">
                    Ready to build your own Linkify page?
                </div>
                <div className="font-inter font-bold text-[#fff] md:text-2xl">
                    Start sharing your world with one simple link. 
                </div>
                <Link
                        to="/auth/login"
                        className="block w-full max-w-[250px] text-center py-[16px] mt-[10px] md:mt-[30px] bg-[#DE9FDE] font-semibold rounded-3xl cursor-pointer"
                    >
                        Create my page now
                </Link> 
            </div>

            
        
        </>
    )
}