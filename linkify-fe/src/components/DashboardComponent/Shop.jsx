import { UserInfo , ButtonAdd} from "../DashboardComponent/UserInfo.jsx";
import {QuickActions} from "../DashboardComponent/index.js";


export default function ShopDashboard() {
    return (
    <div className="w-full px-10">
        <UserInfo/>
        <ButtonAdd/>
        <QuickActions/>
    </div>)
}