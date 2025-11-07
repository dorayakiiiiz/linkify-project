
import { useAuth } from "../../context/AuthContext"

export default function DemoCreatorHome() {
    const { user } = useAuth();
    return (
        <>
        
            <div className="h-[500px] w-full flex gap-[50px] justify-center items-center font-momo text-5xl bg-[#0060AD] text-[#fff]">
                <div>Creator</div>
                <div>
                    {user ? (
                        <div className="text-lg text-[#0060AD] bg-white rounded-xl p-[20px] shadow">
                            <div><b>ID:</b> {user.id}</div>
                            <div><b>Email:</b> {user.email}</div>
                            <div><b>Role:</b> {user.role}</div>
                            <div><b>Locked:</b> {user.isLocked ? "Yes" : "No"}</div>
                        </div>
                    ) : (
                        <div className="text-red-600">No user info</div>
                    )}
                </div>
            </div>
        </>
    )
}