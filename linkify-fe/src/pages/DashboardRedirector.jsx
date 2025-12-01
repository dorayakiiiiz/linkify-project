import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext"


export default function DashboardRedirector() {
    const { user } = useAuth();
    const { profile, loading } = useProfile();

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center bg-[#0060AD] text-5xl text-[#fff] font-momo">
                Linkify is loading...
            </div>
        )
    }

    if (!user) return null;

    if (user?.role === 'admin')
        return <Navigate to="/dashboard/admin/users" replace />;

    if (!profile) {
        return <Navigate to="/onboarding/profile" replace />;
    }

    return <Navigate to="/dashboard/links" replace />;
}