import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute() {
    const { isLogin, user } = useAuth();

    if (!isLogin)
        return <Navigate to="/auth/login" />;

    if (user.role === 'creator') 
        return <Navigate to="/dashboard/creator" />;
    
    return <Outlet />;
}