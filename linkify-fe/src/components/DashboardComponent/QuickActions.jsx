import { quickActions } from "../../const/testDataDashboard.js";
export default function QuickActions() {
    return (
        <div className="bg-white p-4 rounded-3xl shadow-xl max-w-full absolute bottom-0.5 left-1/2 transform -translate-x-1/2 md:hidden">
                
                {/* Flex Container cho các Icon và Text */}
                <div className="flex justify-between items-center space-x-6">
                    
                    {quickActions.map((action, index) => (
                        <button 
                            key={index}
                            className="flex flex-col items-center text-gray-700 hover:text-black transition duration-150 cursor-pointer group"
                        >
                            {/* Icon */}
                            <i className={`fa-solid ${action.icon} w-6 h-6 mb-1 text-2xl`}></i>
                            
                            {/* Label */}
                            <span className="text-xs font-medium">{action.label}</span>
                        </button>
                    ))}
                </div>
        </div>  
    )
} 