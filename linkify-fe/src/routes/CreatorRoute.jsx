import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CreatorRoute() {
    const { isLogin, user } = useAuth();

    if (!isLogin)
        return <Navigate to="/auth/login" />;

    if (user.role === 'admin') 
        return <Navigate to="/dashboard" />;
    
    return <Outlet />;
}