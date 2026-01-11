import { Link } from "react-router-dom"

export default function Home() {
    return (  
        <>
            <div className="w-full min-h-screen md:min-h-[600px] flex flex-col md:flex-row gap-10 md:gap-6 items-center justify-center px-[50px] md:px-[100px] lg:px-[140px]">
                <div className="w-full md:w-[50%] flex flex-col items-center md:items-start">
                    <div
                        className="text-center md:text-left text-white font-momo text-4xl lg:text-5xl font-bold"
                    >
                        One link for everything you create
                    </div>

                    <div
                        className="text-center md:text-left text-gray-200 font-inter md:text-2xl font-bold mt-[20px]"
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
                    className="w-full md:w-[45%] lg:w-[40%] h-full mr-[20px]"
                />

            </div>
            {/* bg: cae7c3, text: 26936d, subtext: 8ad39a */}
            {/* bg: cd2553, text: white, subtext: a9141e */}
            <div className="w-full flex flex-col items-center min-h-[740px] pb-[50px] bg-[#cae7c3]">
                <div className="text-[#26936d] font-momo text-3xl md:text-5xl my-[60px] md:my-[100px]">
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
                        <div key={idx} className="bg-[#fff] max-w-[300px] min-h-[250px] md:min-h-[300px] px-[30px] py-[10px] rounded-4xl flex flex-col items-center">
                            <div className="flex-2 text-[#8ad39a] mt-[40px] font-momo text-2xl text-center">
                                {item.title}
                            </div>
                            <div className="flex-3 text-[#54564f] font-inter text-center">
                                {item.description}
                            </div>
                        </div>
                    ))}
                </div>

            </div>



            <div className="bg-[#96d6ff] w-full min-h-screen md:min-h-[740px] flex flex-col md:flex-row gap-10 md:gap-6 items-center justify-center px-[50px] md:px-[100px] lg:px-[140px]">
                <video
                    src="/linkify_animation.webm"
                    autoPlay
                    loop
                    muted
                    className="w-full md:w-[45%] lg:w-[40%] h-full"
                />
                <div className="w-full md:w-[50%] flex flex-col items-center md:items-start">
                    <div
                        className="text-center md:text-left text-[#fff] font-momo text-3xl md:text-4xl lg:text-5xl font-bold"
                    >
                        Designed for Creators, Artists, and Entrepreneurs 
                    </div>

                    <div
                        className="text-center md:text-left text-[#fff] font-inter md:text-2xl font-bold mt-[20px]"
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

            <div className="w-full bg-[#00697f] min-h-[800px] md:min-h-[600px] flex flex-col items-center justify-center gap-12 md:gap-8 md:gap-[60px] px-[50px] md:px-[100px] lg:px-[140px]">
                <div className="text-center font-momo font-bold text-[#e0fffa] text-4xl md:text-5xl">
                    Ready to build your own Linkify page?
                </div>
                <div className="text-center font-inter font-bold text-gray-200 text-xl md:text-2xl">
                    Start sharing your world with one simple link. 
                </div>
                <Link
                        to="/auth/login"
                        className="block w-full text-white max-w-[250px] text-center py-[16px] mt-[10px] md:mt-[30px] bg-[#51a7bf] font-semibold rounded-3xl cursor-pointer"
                    >
                        Create my page now
                </Link> 
            </div>

            
        
        </>
    )
}