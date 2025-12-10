
import { useAuth } from "../../context/AuthContext"

export default function ThemeManagementPage() {
    const { user, logout } = useAuth();
    return (
        <div className="h-screen w-full flex items-center justify-center bg-black/50">
            <div className="w-[240px] h-[240px] bg-[#ccc] rounded-xl flex items-center justify-center">
                Hello
            </div>

        </div>

    )
}