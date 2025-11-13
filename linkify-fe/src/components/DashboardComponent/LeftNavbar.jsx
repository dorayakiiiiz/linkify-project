import {mainMenu, tools, links, navItems} from '../../const/testDataDashboard.js'
import { useAuth } from "../../context/AuthContext";
export default function LeftNavbarDashboard() {
    const { user } = useAuth();
    return (
        <div className="bg-[#ecede8] w-[280px] rounded-tl-xl relative">
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
    )
}