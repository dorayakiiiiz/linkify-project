import { useState } from 'react';
import { designNavItems } from '../../constants/dashboard'; 
import { HeaderDesign, TextDesign, ButtonDesign, Background, ThemeDesign, FooterDesign } from '../../components/CreatorDashboard/DesignComponent'; 
import DesignActions from '../../components/CreatorDashboard/DesignActions';
import MobilePreview from '../../components/CreatorDashboard/MobilePreview';

export default function DesignPage() {
    const [activeItem, setActiveItem] = useState('Header');
    // State to control whether DesignActions is shown on mobile
    const [showHeaderDesign, setShowHeaderDesign] = useState(false);
    return (
        <div className="w-full h-full flex flex-col md:flex-row">
            {/* 1. Design Sidebar (Menu con bên trái của trang Design) */}
            <div className="hidden md:block md:w-[80px] xl:w-[240px] p-4 bg-[#f1f0ee] overflow-y-auto">
                <ul className="space-y-1">
                    {designNavItems.map((item) => (
                        <li key={item.name} onClick={() => setActiveItem(item.name)}>
                            <div 
                                className={`
                                    flex items-center px-4 py-3 text-base rounded-lg transition cursor-pointer
                                    ${item.name === activeItem
                                        ? 'bg-gray-200 text-gray-800 font-medium' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }
                                `}
                            >
                                <i className={`${item.iconClass} w-5 h-5 mr-4 text-xl`}></i>
                                <span className='hidden xl:block'>{item.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 2. Main Design Content Area */}
            <div className="hidden md:block flex-1 p-6 md:p-2 overflow-y-auto bg-[#f1f0ee] relative">
                <h1 className="text-3xl font-bold mb-8">{activeItem}</h1>
                
                {/* Render component con dựa trên activeItem */}
                <div className="pb-20"> {/* Padding bottom để không bị che bởi nút Save */}
                    {activeItem === 'Header' && <HeaderDesign />}
                    {activeItem === 'Text' && <TextDesign />}
                    {activeItem === 'Buttons' && <ButtonDesign />}
                    {activeItem === 'Background' && <Background />}
                    {activeItem === 'Theme' && <ThemeDesign />}
                    {activeItem === 'Footer & Donation' && <FooterDesign />}
                </div>

                {/* Nút Save/Preview floating */}
                <DesignActions />
            </div>

            {/* 3. Màn hình mobile preview ở responsive mobile */}
            <div className='md:hidden flex justify-center'>
                <div className='h-[100px]'>
                    <MobilePreview isDesignPanelOpen={showHeaderDesign} />
                </div>
                <DesignActions 
                    isDesignPanelOpen={showHeaderDesign} 
                    toggleDesignPanel={setShowHeaderDesign}
                />
            </div>
        </div>
    );
}