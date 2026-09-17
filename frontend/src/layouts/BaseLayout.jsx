import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Outlet } from "react-router-dom";

export default function BaseLayout() {
    return (
        <>
            <Navbar />
            <main
                className="bg-[#0060AD] pt-[100px] min-h-[700px]"
                // flex items-center justify-center
            >
                <Outlet />
            </main>
            <Footer />
        </>
    )
}