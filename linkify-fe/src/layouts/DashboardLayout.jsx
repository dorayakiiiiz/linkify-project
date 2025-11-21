import { Outlet, Link, useLocation } from "react-router-dom";
import Sidebar from "../components/CreatorDashboard/Sidebar";
import MobilePreview from "../components/CreatorDashboard/MobilePreview";

export default function DashboardLayout() {
    const location = useLocation();
    
    // Logic hiển thị Preview bên phải (chỉ hiện ở tab Links, Design...)
    // Dựa vào logic cũ: label.includes('My Linkify')
    const showPreview = ['/dashboard/links', '/dashboard/design', '/dashboard/shop'].includes(location.pathname);

    // Lấy Title cho Header (thay thế activeItem/activeSubItem cũ)
    const getTitle = () => {
        if (location.pathname.includes('links')) return 'Links';
        if (location.pathname.includes('design')) return 'Design';
        if (location.pathname.includes('shop')) return 'Shop';
        if (location.pathname.includes('analytics')) return 'Insights';
        return 'Dashboard';
    };

    return (
        <div className="w-full h-screen flex flex-col font-quicksand font-medium">
            {/* Header */}
            <div className="bg-[#1d232f] h-[70px] w-full flex items-center">
                <Link to="/" className="text-[#43e963] mb-2 ml-4 font-momo text-xl">
                    Linkify <i className="fa-brands fa-linktree text-[#2afc4d]"></i>
                </Link>
            </div>

            {/* Body */}
            <div className="bg-[#f1f0ee] rounded-t-xl w-full h-[calc(100vh-70px)] flex-1 flex relative -mt-2.5 rounded-t-xl">
                
                {/* 1. Sidebar (Đã refactor ở trên) */}
                <Sidebar />

                {/* 2. Middle Content (Thay đổi theo Route) */}
                <div className="flex-1 flex flex-col border-r border-[#d7d6d4] overflow-hidden bg-[#f1f0ee]">
                    {/* Header Trắng của phần Content */}
                    <div className="h-[65px] flex justify-between items-center border-b border-[#dedcdc] w-full px-4 shrink-0">
                        <span className="font-bold text-2xl py-4">{getTitle()}</span>
                        <i className="cursor-pointer fa-solid fa-gear bg-[#fff] pl-2 pr-6 py-2 rounded-3xl border border-[#ccc] border-solid"></i>
                    </div>

                    {/* Nội dung chính (Links, Design, Shop...) sẽ render ở đây */}
                    <div className="w-full flex flex-col items-center overflow-y-auto flex-1">
                        <Outlet />
                    </div>
                </div>

                {/* 3. Right Preview (Cố định) */}
                {showPreview && (
                    <div className="hidden xl:flex xl:w-[450px] lg:w-[250px] md:w-[200px] bg-[#f1f0ee] flex-col justify-center items-center border-l border-[#d7d6d4]">
                         <MobilePreview /> 
                    </div>
                )}
            </div>
        </div>
    );
}