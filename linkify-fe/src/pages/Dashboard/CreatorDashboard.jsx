
import { useAuth } from "../../context/AuthContext"

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    return (
        <div className="h-screen w-full flex bg-[#ccc]">
            {/* Admin panel */}
            <div className="fixed top-0 bottom-0 left-0 w-[240px] bg-[#ECECE9] rounded-l-xl overflow-hidden">
                {/* Admin info */}
                <div className="w-full h-[60px] bg-[#1E2330] flex justify-center items-center gap-[20px]">
                    <div className="cursor-poi
                    nter flex px-[8px] py-[6px] justify-center items-center rounded-xl hover:bg-[#50576b]">
                        <img
                            src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/494991008_1224551699267467_6851087255832641685_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_ohc=yv5fB_IDxfkQ7kNvwGw1OSk&_nc_oc=AdltaG_xwVJ1Tu2iISGDfHfTFHO2P86wWPfYJuLZ2iwhaX4w_SY1g1ui89TS72qiSpE&_nc_zt=24&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=qRbRfgW2CQBoY7o2CyJu5A&oh=00_AfhEsNi2VVFZLZ2GaOxmGbw2JHae-Byk8howCvurbWkzcA&oe=6912ACE4"
                            className="w-[26px] h-[26px] rounded-full"
                        />
                        <div className="font-inter font-semibold ml-[10px] text-[#fff]">
                            {user.displayName}
                            <i className="fa-solid fa-chevron-down ml-[6px] text-xs"></i>
                        </div>
                    </div>

                    <div className=" text-[#fff] cursor-pointer p-[10px] hover:bg-[#50576b] rounded-xl flex justify-center items-center">

                        <i className="fa-regular fa-bell"></i>
                    </div>


                </div>
            </div>

            {/* Content */}
            <div className="pl-[280px]">

            </div>

            <div className="h-screen w-full flex gap-[50px] justify-center items-center font-momo text-5xl text-[#fff]">
                <div>Creator page</div>
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

        </div>
        
    )
}