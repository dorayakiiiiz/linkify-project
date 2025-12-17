import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext"
import { useState } from "react";
import MobileDashboardHome from "./CreatorDashboard/MobileDashboardHome";
export default function DashboardRedirector() {
    const { user } = useAuth();
    const { profile, loading } = useProfile();

    if (!user) return null;

    if (user?.role === 'admin')
        return <Navigate to="/dashboard/admin/users" replace />;

    //Nếu chưa có profile thì chuyển đến trang tạo profile
    if (!profile) {
        return <Navigate to="/onboarding/profile" replace />;
    }

    // Nếu là mobile thì hiển thị trang MobileDashboardHome
    if (window.innerWidth < 768) {
        return <MobileDashboardHome />;
    }

    return <Navigate to="/dashboard/links" replace />;
}