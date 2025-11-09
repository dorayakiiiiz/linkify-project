import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import AdminDashboard from "./AdminDashboard";
import CreatorDashboard from "./CreatorDashboard";

export default function Dashboard() {
    const { isLogin, user } = useAuth();

    if (!isLogin)
        return <Navigate to="/auth/login" />;

    if (user.role === 'admin')
        return <AdminDashboard />;

    return <CreatorDashboard />;
}