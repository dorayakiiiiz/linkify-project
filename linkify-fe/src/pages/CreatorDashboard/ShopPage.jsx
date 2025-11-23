import QuickActions from "../../components/CreatorDashboard/Shared/QuickActions";
import { UserInfo } from "../../components/CreatorDashboard/Shared/UserInfo";

export default function ShopPage() {
    return (
        <div className="w-full h-full flex flex-col">

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:px-[60px]">
                <div className="max-w-3xl mx-auto w-full">
                    <UserInfo />

                    {/* button add */}
                    <div className="my-6">
                        <div className="w-full">
                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-10 rounded-full font-medium transition">
                            + Add
                            </button>
                        </div>
                    </div>
                    
                    {/* shop item */}
                    <div className="w-full my-4">
                        <div className="space-y-4 pr-2"> 
                            {/* {links.map((link, index) => (
                                
                            ))} */}
                        </div>

                        <QuickActions />   
                    </div>
                </div>
            </div>
        </div>
    );
}