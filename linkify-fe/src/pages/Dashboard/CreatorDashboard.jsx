import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {ButtonAdd, UserInfo} from "../../components/DashboardComponent/UserInfo.jsx";
import {mainMenu, tools, links, navItems, quickActions} from '../../const/testDataDashboard.js'
import {LinksDashboard, InsightsDashboard, AudienceDashboard, DesignDashboard, ShopDashboard } from '../../components/DashboardComponent/index.js'

export default function CreatorDashboard() {
  const { user } = useAuth();

  const [openIndex, setOpenIndex] = useState(null);     // index dropdown đang mở
  const [activeItem, setActiveItem] = useState(null);   // main item active (label)
  const [activeSubItem, setActiveSubItem] = useState('Links'); // sub item active (label)
  const [label, setLabel] = useState('My Linkify-Links')



  //Bật tắt hiện sublist
  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMainClick = (item, index) => {
    // Nếu có dropdown
    if (item.hasDropdown) {
      toggleMenu(index); //Thì hiện hoặc ẩn sublist
      // optional: when opening a dropdown, you may want to clear active sub
      // setActiveSubItem(null);
    } else {
      setActiveItem(item.label); //set active cho nút này
      setActiveSubItem(null); //tắt active subItem
      setLabel(item.label)
    }
    console.log(label)
  };

  const handleSubClick = (mainLabel, subLabel) => {
    setActiveItem(mainLabel);
    setActiveSubItem(subLabel);
    // keep the dropdown open — if you prefer to close it, call setOpenIndex(null)
    setLabel(`${mainLabel}-${subLabel}`)
    console.log(label)

  };

  return (
    <>
      <div className="w-full h-screen flex flex-col">
        {/* Header */}
        <div className="bg-[#1d232f] h-[60px] w-full flex items-center">
          <h2 className="text-[#43e963] mb-2 ml-4 font-mono font-semibold text-2xl">LINKIFY</h2>
        </div>


        {/* Content */}
        <div className="bg-[#f1f0ee] rounded-t-xl w-full flex-1 -mt-2.5 flex overflow-auto relative">
          {/* Left navbar */}
          <div className="bg-[#ecede8] lg:w-[280px] md:w-[200px] rounded-tl-xl relative flex-shrink-0 hidden md:block">
            {/* username and notification */}
            <div className="flex justify-between items-center px-[12px] py-[8px] mt-1">
              {/* username */}
              <div className="flex items-center gap-1.5 px-2 py-2 -mx-2 hover:bg-[#d7d4cd] hover:cursor-pointer hover:rounded-xl">
                <img
                  src="../../../public/anonymous-avatar.jpg"
                  className="rounded-full h-[20px] w-[20px]"
                />
                <p className="text-[14px] font-medium text-[#6a6968]">
                  {user?.displayName || "User"}
                </p>
                <i className="fa-solid fa-angle-down text-[10px] pt-1 text-[#6a6968]"></i>
              </div>

              {/* notification bell */}
              <span className="px-2 py-2 -mx-2 -my-2 hover:bg-[#d7d4cd] hover:cursor-pointer hover:rounded-xl">
                <i className="fa-regular fa-bell "></i>
              </span>
            </div>

            {/* Menu */}
            <div>
              {/* Nav items */}
              <div className="px-3 py-2">
                {mainMenu.map((item, index) => (
                  <div key={item.label} className="mb-1">
                    {/* Main item */}
                    <div
                      onClick={() => handleMainClick(item, index)}
                      className={`flex items-center py-2 px-1 -mx-1 transition-all duration-150 cursor-pointer
                        ${
                          !item.hasDropdown && activeItem === item.label
                            ? "bg-[#d7d4cd] font-semibold text-black rounded-xl"
                            : "hover:bg-[#d7d4cd] hover:rounded-xl text-[#6a6968]"
                        }`}
                    >
                      <i className={`fa-solid ${item.icon}`} />
                      <span className="ml-1.5">{item.label}</span>
                      {item.hasDropdown && (
                        <i
                          className={`fa-solid fa-angle-down text-[10px] pt-1 ml-auto mr-1 transition-transform duration-300 ${
                            openIndex === index ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>

                    {/* Hiện sublist khi trùng index và có dropdown */}
                    {item.hasDropdown && openIndex === index && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.subItems.map((sub) => (
                          <div
                            key={sub.label}
                            onClick={() => handleSubClick(item.label, sub.label)}
                            className={`py-1.5 px-2 rounded-md cursor-pointer text-sm transition-all duration-150
                              ${
                                activeSubItem === sub.label && activeItem === item.label
                                  ? "bg-[#d7d4cd] font-semibold text-black"
                                  : "hover:bg-[#d7d4cd] text-[#6a6968]"
                              }`}
                          >
                            {sub.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Tools */}
              <div className="px-3 py-2">
                <div className="text-s font-medium text-[#9c9b95] w-[32px] pb-2">
                  Tools
                </div>
                {tools.map((t, index) => (
                  <div
                    key={t.label}
                    onClick={() => {handleMainClick(t, index)}}
                    className={`flex items-center py-2 px-2 -mx-2 my-2 rounded-xl cursor-pointer
                      ${activeItem === t.label ? "bg-[#d7d4cd] font-semibold text-black" : "hover:bg-[#d7d4cd] text-black"}`}
                  >
                    <i className={t.icon}></i>
                    <span className="ml-1.5">{t.label}</span>
                  </div>
                ))}
              </div>

              {/* help and noti */}
              <div className="px-3 py-3 mb-3 flex justify-between w-full absolute bottom-0">
                <i className="fa-regular fa-circle-question pl-2 pr-7 py-2 -mx-2 -my-2 hover:bg-[#d7d4cd] hover:cursor-pointer hover:rounded-full text-lg"></i>
                <i className="fa-solid fa-bullhorn pl-2 pr-7 py-2 -mx-2 -my-2 hover:bg-[#d7d4cd] hover:cursor-pointer hover:rounded-full text-lg"></i>
              </div>
            </div>
          </div>

          {/* Middle */}
          {/* PHẦN NÀY RENDER RA THEO STATE */}
          <div className=" bg-[#f1f0ee] flex-4 flex flex-col border-r border-solid border-[#d7d6d4] overflow-x-hidden">
              {/* Header */}
              <div className="h-[65px] flex justify-between items-center border-solid border-[#dedcdc] border w-full px-4">
                  <span className="font-bold text-2xl py-4">{activeSubItem ? activeSubItem : activeItem}</span>
                  <div>
                      <span className="bg-[#fff] px-6 py-2 mr-4 rounded-3xl border border-[#ccc] border-solid">Enhance</span>
                      <i className="fa-solid fa-gear bg-[#fff] pl-2 pr-6 py-2 rounded-3xl border border-[#ccc] border-solid"></i>

                  </div>
              </div>

              {/* Container */}

              <div className="w-full flex flex-col items-center overflow-y-auto ">
                {/* Render phần middle theo stage */}

                {/* Links */}
                {label === 'My Linkify-Links' && (
                  <div className="w-full px-10"> 

                    {/* Profile */}
                    <UserInfo/>

                    {/* Add button */}
                    <ButtonAdd/>

                    <div className="flex justify-between items-center w-full p-4">
                      <button 
                          className="flex items-center px-2 py-3 bg-gray-200 text-gray-800 font-medium rounded-xl transition duration-150 hover:bg-gray-300 shadow-sm"
                      >
                          <i className="fa-regular fa-square w-5 h-5 mr-3 text-lg mt-1"></i>
                          Add collection
                      </button>
                      <a 
                          href="#"
                          className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer group"
                      >
                          <i className="fa-solid fa-box-archive w-5 h-5 mr-2 text-lg"></i>
                          
                          <span className="text-base font-medium pb-1 group-hover:underline">
                              View archive
                          </span>
                          <i className="fa-solid fa-chevron-right text-xs ml-1"></i>
                      </a>

                    </div>
                    
                    {/* Links list */}
                    <LinksDashboard/>
                  </div>
                  )
                }

                {/* Shop */}
                {label === 'My Linkify-Shop' && (<ShopDashboard/>)

                }
                {/* Design */}
                {label === 'My Linkify-Design' && (<DesignDashboard/>)}

                {/* Audience Contacts */}
                {label === 'Audience' && (<AudienceDashboard/>)}

                {/* Insights */}
                {label === 'Insights' && (<InsightsDashboard/>)} 
              </div>

          </div>

          {/* Right preview */}
          {label.includes('My Linkify') ? 
            <div className="bg-[#f1f0ee] xl:w-[450px] lg:w-[250px] md:w-[200px] rounded-tr-xl md:flex flex-col hidden">

              {/* Heading link */}
              <div className="bg-white py-2 px-6 my-3 rounded-3xl lg:w-[300px] md:w-[250px] mx-auto flex items-center justify-between">
                  <div className="text-center flex-1">My linkify link</div>
                  <i className="fa-regular fa-share-from-square"></i>
              </div>

              {/* Screen preview */}
              <div className="flex items-center flex-1">
                <div 
                    className=" lg:w-[300px] lg:max-h-[600px] lg:h-[600px] md:w-[250px] md:h-[510px]  mx-auto my-4 overflow-y-auto bg-[#dad1f0] max-w-sm p-6 rounded-4xl shadow-2xl flex flex-col items-center"
                >
                    {/* Avatar */}
                    <img src="../../../public/anonymous-avatar.jpg" 
                    className="w-20 h-20 bg-gray-300 rounded-full mb-4"/>

                    {/* */}
                    <h1 className="text-xl font-semibold mb-1">otis275</h1>
                    <p className="text-center text-gray-700 text-sm mb-6">
                    🌟 Software Engineer | Tech Enthusiast | Coding my way to success! 💻
                    </p>

                    {/* */}
                    <div className="w-full flex flex-col gap-3">
                        { 
                            links.map((link, index) => (
                                <a 
                                    href={link.url}
                                    className="bg-[#f8fed8] hover:bg-yellow-200 text-center  lg:h-[45px] md:h-[35px] rounded-3xl transition text-xs flex items-center justify-center"
                                >
                                    {link.title}
                                </a>
                            ))
                        }

                    </div>

                    {/* */}
                    <div className="mt-auto">
                        <div className="mt-5 lg:text-sm md:text-[10px] text-black font-bold bg-white px-4 py-2 rounded-2xl shadow-lg md:h-[35px] flex items-center justify-center hover:cursor-pointer">
                            Join otis275 on Linktree
                        </div>
                        <div className="flex justify-center gap-3 text-[10px] my-2">
                            <span>Report</span>
                            <span>.</span>
                            <span>Privacy</span>
                        </div>
                    </div>
                </div>
<<<<<<< HEAD

              </div>
            </div>
           : ''} 
    
        
=======
            </div>
          </div> : ''}        
>>>>>>> 98d09f1c93f136487e4caa6f3003b152dd181b2b
        </div>
      </div>
          
    {/* --------- */}

    </>
  );
}
