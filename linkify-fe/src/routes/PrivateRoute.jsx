import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { use } from "react";

export default function PrivateRoute() {
    const { isLogin } = useAuth();
    return isLogin ? <Outlet /> : <Navigate to="/auth/login" replace />;
}