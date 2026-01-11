// Admin Dashboard Layout - Layout chính cho trang quản trị
// Feature: Dashboard layout with management menu

import { Outlet, Link, useLocation } from "react-router-dom";
import Sidebar from "../components/AdminDashboard/Sidebar";
import MobilePreview from "../components/CreatorDashboard/MobilePreview";

export default function AdminDashboardLayout() {
  const location = useLocation();

  // Lấy tiêu đề trang dựa vào route hiện tại
  const getTitle = () => {
    if (location.pathname.includes("links")) return "Links Management";
    if (location.pathname.includes("shop")) return "Shop Management";
    if (location.pathname.includes("users")) return "Users Management";
    if (location.pathname.includes("analytics")) return "Analytics";
    return "Dashboard";
  };

  return (
    <div className="w-full h-screen flex flex-col font-quicksand font-medium">
      {/* Header - Thanh đầu trang với logo */}
      <div className="bg-[#022c49] h-[70px] w-full flex items-center">
        <Link
          to="/"
          className="text-[#fff] mb-[12px] ml-[20px] font-momo text-xl"
        >
          Linkify <i className="fa-brands fa-linktree text-[#49ff68]"></i>
        </Link>
      </div>

      {/* Body - Phần chính chứa Sidebar và Content */}
      <div className="bg-[#0060AD] rounded-t-xl w-full h-[calc(100vh-70px)] flex-1 flex relative -mt-2.5 rounded-t-xl">
        {/* Sidebar - Menu quản lý */}
        <Sidebar />

        {/* content - Nội dung trang */}
        <div className="flex-1 flex flex-col border-r border-[#d7d6d4] overflow-hidden bg-[#f1f0ee]">
          {/* header */}
          <div className="h-[65px] flex justify-between items-center border-b border-[#dedcdc] w-full px-4 shrink-0">
            <span className="font-bold text-2xl py-4 ml-[10px]">
              {getTitle()}
            </span>
          </div>

          {/* content - Outlet render các trang con (Users, Links, Shop, Analytics) */}
          <div className="w-full flex flex-col items-center overflow-y-auto flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
