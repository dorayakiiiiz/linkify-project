import { Outlet } from "react-router-dom";

export default function BlankLayout() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Outlet />
        </div>
    )
}