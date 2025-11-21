import QuickActions from "../../components/CreatorDashboard/Shared/QuickActions";
import { UserInfo } from "../../components/CreatorDashboard/Shared/UserInfo";
import { useLinks } from "../../context/LinkContext";

export default function LinksPage() {
    const { links, addNewLink, updateLink, removeLink, loadingLinks } = useLinks();
    
    const handleDelete = (id) => {
        // TODO: fix tạo model xác nhận xóa đẹp hơn
        if (window.confirm("Are u sure to delete this link?")) {
            removeLink(id);
        }
    }

    const handleAddDemo = () => {
        addNewLink("New Link", "https://example.com");
    }

    const handleToggleEnable = (link, isChecked) => {
        updateLink(link._id, { isEnable: !link.isEnable })
    }

    const LinkSkeleton = () => (
        <div className="bg-white px-4 py-6 rounded-xl shadow-md border border-gray-100 flex items-center gap-4 animate-pulse">
            <div className="w-6 h-10 bg-gray-200 rounded"></div>
            <div className="flex-grow">
                <div className="flex justify-between mb-4">
                    <div className="space-y-2 w-3/4">
                        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        {[1,2,3,4,5].map(i => <div key={i} className="w-6 h-6 bg-gray-200 rounded-full"></div>)}
                    </div>
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full h-full flex flex-col">

            <div className="flex-1 overflow-y-auto p-6 md:px-[60px]">
                <div className="max-w-3xl mx-auto w-full">
                    <UserInfo />

                    <div className="my-6">
                        <div className="w-full">
                            <button 
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-10 rounded-full font-medium transition"
                                onClick={handleAddDemo}
                            >
                                + Add
                            </button>
                        </div>
                    </div>
                    
                    <div className="w-full my-4">
                        <div className="space-y-4 pr-2"> 

                            {loadingLinks && (
                                <>
                                    <LinkSkeleton />
                                    <LinkSkeleton />
                                    <LinkSkeleton />
                                </>
                            )}

                            {!loadingLinks && links && links.length > 0 && links.map((link) => {
                                if (!link) return null;
                                
                                return (

                                    <div
                                        key={link._id}
                                        className="bg-white px-4 py-6 rounded-3xl shadow-md flex items-center gap-4"
                                    >
                                        
                                        {/* Dấu ba chấm (:::)*/}
                                        <div className="flex items-start mr-3 pt-1 text-gray-400 hover:text-gray-600 cursor-move" title="Kéo để sắp xếp">
                                            <i className="fa-solid fa-grip-vertical text-lg"></i>
                                        </div>

                                        {/* Nội dung chính của thẻ */}
                                        <div className="flex-grow min-w-0">
                                            
                                            {/* Phần Tiêu đề, URL, Chia sẻ, Gạt (Toggle) */}
                                            <div className="flex justify-between items-start">
                                                
                                                <div className="flex-grow min-w-0 pr-4">
                                                    <div className="flex items-center mb-1">
                                                        <span className="font-bold">{link.title}</span>
                                                        <i className="fa-solid fa-pen text-gray-400 text-xs ml-2 cursor-pointer hover:text-gray-600" title="Chỉnh sửa Tiêu đề"></i>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-500 truncate min-w-0">
                                                            {link.url}
                                                        </a>
                                                        <i className="fa-solid fa-pen text-gray-400 text-xs ml-2 cursor-pointer hover:text-gray-600" title="Chỉnh sửa URL"></i>
                                                    </div>
                                                </div>

                                                <div className="flex items-start pt-1 space-x-3">
                                                    <i className="fa-solid fa-share-from-square text-gray-500 text-lg hover:text-gray-700 cursor-pointer" title="Chia sẻ"></i>
                                                    
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            defaultChecked={link.isEnable}
                                                            onChange={() => handleToggleEnable(link)}
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            {/* Thanh hành động dưới cùng */}
                                            <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
                                                
                                                <div className="flex items-center space-x-3 flex-wrap gap-2">
                                                    <i className="fa-solid fa-grip text-base hover:text-gray-700 cursor-pointer" title="Bố cục"></i>
                                                    <i className="fa-solid fa-link text-base hover:text-gray-700 cursor-pointer" title="Liên kết"></i>
                                                    <i className="fa-regular fa-image text-base hover:text-gray-700 cursor-pointer" title="Hình ảnh"></i>
                                                    <i className="fa-solid fa-star text-base hover:text-gray-700 cursor-pointer" title="Yêu thích"></i>
                                                    <i className="fa-regular fa-bookmark text-base hover:text-gray-700 cursor-pointer" title="Lưu trữ"></i>
                                                    <i className="fa-solid fa-lock text-base hover:text-gray-700 cursor-pointer" title="Khóa"></i>
                                                    <i className="fa-regular fa-chart-bar text-base hover:text-gray-700 cursor-pointer" title="Thống kê"></i>
                                                    {/* <span className="text-xs text-gray-600 ml-1">{link.clicks !== undefined ? link.clicks : 0} clicks</span> */}
                                                </div>
                                                
                                                <i 
                                                    className="fa-solid fa-trash-can text-lg hover:text-red-500 cursor-pointer" title="Xóa"
                                                    onClick={() => handleDelete(link._id)}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {!loadingLinks && links && links.length === 0 && (
                                <div className="text-center py-10 text-gray-500">
                                    You don't have any links yet. Click "+ Add" to create one.
                                </div>
                            )}
                        </div>

                        {/* Quick action buttons in */}
                        <QuickActions />  
                    </div>
                </div>
            </div>
        </div>
    );
}