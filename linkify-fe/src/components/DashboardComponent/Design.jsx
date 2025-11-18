import {mainMenu, tools, links, navItems} from '../../const/testDataDashboard.js'
import { HeaderDesign, TextDesign, ButtonDesign, WallPaper, ThemeDesign, ColorDesign } from './DesignComponent'
import DesignActions from './DesignActions.jsx';
import { useState } from 'react';

export default function DesignDashboard() {
    const [activeItem, setActiveItem] = useState('Header');
    return (
        <div className="w-full flex">
            {/* design side bar */}
            <div className="flex-1 p-4 bg-[#f1f0ee] rounded-xl shadow-md hidden md:block">
                <ul className="space-y-1">
                    {navItems.map((item, index) => (
                        <li key={item.name} onClick={() => setActiveItem(item.name)}>
                            <a 
                                href="#" 
                                className={`
                                    flex items-center px-4 py-3 text-base rounded-lg transition
                                    ${item.name === activeItem
                                        ? 'bg-gray-200 text-gray-800 font-medium' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }
                                `}
                            >
                                <i 
                                    className={`${item.iconClass} w-5 h-5 mr-4 text-xl`} 
                                ></i>
                                <span className='hidden lg:block'>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main design */}
            <div className="flex-4 p-10 overflow-y-auto bg-[#f1f0ee] hidden md:block">
                <h1 className="text-3xl font-bold mb-8">{activeItem}</h1>
                {activeItem === 'Header' && <HeaderDesign />}
                {activeItem === 'Text' && <TextDesign />}
                {activeItem === 'Buttons' && <ButtonDesign />}
                {activeItem === 'Wallpaper' && <WallPaper />}
                {activeItem === 'Theme' && <ThemeDesign />}
                {activeItem === 'Colors' && <ColorDesign />}
            </div>

            {/* Right preview */}
            <div className="bg-[#f1f0ee] xl:w-[450px] lg:w-[250px] md:w-[200px] rounded-tr-xl flex flex-col md:hidden">
              {/* Screen preview */}
              <div className="flex items-center flex-1">
                <div 
                    className=" lg:w-[300px] lg:max-h-[600px] lg:h-[600px] md:w-[250px] md:h-[510px]  mx-auto my-4 overflow-y-auto bg-[#dad1f0] max-w-sm p-6 rounded-4xl shadow-2xl flex flex-col items-center"
                >
                    {/* Avatar */}
                    <img src="../../../public/anonymous-avatar.jpg" 
                    className="w-20 h-20 bg-gray-300 rounded-full mb-4"/>

                    {/* */}
                    <h1 className="text-2xl font-semibold mb-1">otis275</h1>
                    <p className="text-center text-gray-700 text-lg mb-6">
                    🌟 Software Engineer | Tech Enthusiast | Coding my way to success! 💻
                    </p>

                    {/* */}
                    <div className="w-full flex flex-col gap-3">
                        { 
                            links.map((link, index) => (
                                <a 
                                    href={link.url}
                                    className="bg-[#f8fed8] hover:bg-yellow-200 text-center  h-[60px]  rounded-3xl transition text-lg flex items-center justify-center"
                                >
                                    {link.title}
                                </a>
                            ))
                        }

                    </div>

                    {/* */}
                    <div className="mt-auto">
                        <div className="mt-10 lg:text-sm md:text-[10px] text-black font-bold bg-white px-4 py-2 rounded-2xl shadow-lg md:h-[35px] flex items-center justify-center hover:cursor-pointer">
                            Join otis275 on Linktree
                        </div>
                        <div className="flex justify-center gap-3 text-[16px] my-2 mb-20">
                            <span>Report</span>
                            <span>.</span>
                            <span>Privacy</span>
                        </div>
                    </div>
                </div>

              </div>
            </div>
            <DesignActions />
        </div>
    )
}