import QuickActions from "../../components/CreatorDashboard/QuickActions";
import { UserInfo } from "../../components/CreatorDashboard/UserInfo";
import { useLinks } from "../../context/LinkContext";
import { useProfile } from "../../context/ProfileContext";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import LinkModal from "./Modal/LinkModal";
import DeleteModal from "../../components/Modal/DeleteModal";
import TrashModal from "../AdminDashboard/Modal/TrashModal";

export default function LinksPage() {
    const { links, fetchLinks, updateLink, removeLink, reorderLinks, loadingLinks } =
        useLinks();

    const { profile } = useProfile();

    // mở/đóng link modal
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [editingLink, setEditingLink] = useState(null);

    // modal xóa
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // modal trash
    const [isTrashOpen, setIsTrashOpen] = useState(false);

    // State cho hiệu ứng copy
    const [copiedId, setCopiedId] = useState(null);

    const handleOpenAdd = () => {
        setEditingLink(null);
        setIsLinkModalOpen(true);
    };

    const handleOpenEdit = (link) => {
        setEditingLink(link);
        setIsLinkModalOpen(true);
    };

    const handleCloseLink = () => {
        setIsLinkModalOpen(false);
        setEditingLink(null);
    };

    const handleOpenDelete = (id) => {
        setIsDeleteModalOpen(true);
        setDeleteId(id);
    };

    const handleCloseDelete = () => {
        setIsDeleteModalOpen(false);
        setDeleteId(null);
    };

    const handleToggleEnable = (link, isChecked) => {
        updateLink(link._id, { isEnable: !link.isEnable });
    };

    // xử lí di chuyển các link (truyền vào hàm reorder link index của src và des)
    const onDragEnd = (result) => {
        if (!result.destination || result.destination.index === result.source.index)
            return;
        reorderLinks(result.source.index, result.destination.index);
    };

    // Xử lý copy với hiệu ứng visual
    const handleCopy = (url, id) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);

        // Reset lại sau 2 giây
        setTimeout(() => {
            setCopiedId(null);
        }, 2000);
    };

    const LinkSkeleton = () => (
        <div className="bg-white px-4 py-6 rounded-xl shadow-md border border-gray-100 flex items-center gap-4 animate-pulse">
            <div className="w-6 h-10 bg-gray-200 rounded"></div>
            <div className="grow">
                <div className="flex justify-between mb-4">
                    <div className="space-y-2 w-3/4">
                        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-6 h-6 bg-gray-200 rounded-full"></div>
                        ))}
                    </div>
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full h-full flex flex-col">
            {isLinkModalOpen && (
                <LinkModal editingLink={editingLink} onClose={handleCloseLink} />
            )}

            {isDeleteModalOpen && (
                <DeleteModal
                    deleteId={deleteId}
                    onClose={handleCloseDelete}
                    removeFunc={removeLink}
                    confirmMessage="Are you sure to delete this link?"
                    successLog="Link deleted successfully."
                />
            )}

            {isTrashOpen && (
                <TrashModal
                    onClose={() => setIsTrashOpen(false)}
                    profileId={profile?._id}
                    type='link'
                    onRestoreSuccess={fetchLinks}
                />
            )}

            <div className="flex-1 p-6 md:px-[10px] lg:px-10">
                <div className="max-w-3xl mx-auto w-full">
                    <UserInfo />

                    <div className="my-6">
                        <div className="w-full">
                            <button
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-10 rounded-full font-medium transition"
                                onClick={handleOpenAdd}
                            >
                                + Add
                            </button>
                        </div>

                    </div>

                    <div
                        className="flex justify-end"
                        onClick={() => setIsTrashOpen(true)}
                    >
                        <div className="group flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-full cursor-pointer transition-all duration-300 hover:border-red-400 hover:bg-red-50/50 hover:shadow-[0_8px_20px_-10px_rgba(59,130,246,0.3)] active:scale-95">
                            <div className="flex items-center justify-center text-slate-400 group-hover:text-red-500 group-hover:rotate-12 transition-all duration-300">
                                <i className="fa-regular fa-trash-can text-lg"></i>
                            </div>

                            <span className="text-slate-600 text-sm font-medium tracking-tight group-hover:text-red-600 transition-colors">
                                View trash bin
                            </span>
                        </div>
                    </div>


                    <div className="w-full my-4">
                        {loadingLinks && (
                            <div className="space-y-4 pr-2">
                                <LinkSkeleton />
                                <LinkSkeleton />
                                <LinkSkeleton />
                            </div>
                        )}

                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="links-list">
                                {(provided) => (
                                    <div
                                        className="space-y-4 pr-2"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {!loadingLinks &&
                                            links &&
                                            links.length > 0 &&
                                            links.map((link, index) => {
                                                if (!link) return null;
                                                const isCopied = copiedId === link._id;

                                                return (
                                                    <Draggable
                                                        key={link._id}
                                                        draggableId={link._id}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    opacity: snapshot.isDragging ? 0.8 : 1,
                                                                }}
                                                                className={`${link.isFlagged ? 'bg-[#fafafa]' : 'bg-white'} px-4 py-6 rounded-3xl shadow-md flex items-center gap-4`}
                                                            >
                                                                {/* ::: */}
                                                                <div
                                                                    className="flex items-start mr-3 pt-1 text-gray-400 hover:text-gray-600 cursor-move"
                                                                    title="Move"
                                                                    // gán dragHandleProps vào nút ::: để kéo
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <i className="fa-solid fa-grip-vertical text-lg"></i>
                                                                </div>

                                                                <div className="grow min-w-0">
                                                                    {/* title + url + toggle enable */}
                                                                    <div className="flex justify-between items-start">
                                                                        {/* title + url */}
                                                                        <div className="grow min-w-0 pr-4">
                                                                            <div className="flex items-center mb-1">
                                                                                <div className={`text-lg font-bold ${link.isFlagged ? "text-red-600" : "text-gray-800"}`}>
                                                                                    {link.title}
                                                                                </div>
                                                                                {!link.isFlagged && link.isEnable && (
                                                                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse ml-2.5"></div>
                                                                                )}
                                                                            </div>

                                                                            <div className="flex items-center">
                                                                                <a
                                                                                    href={link.url}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="text-sm text-gray-500 hover:text-blue-500 truncate min-w-0"
                                                                                >
                                                                                    <i className="fa-solid fa-link text-blue-500 mr-2"></i>
                                                                                    {link.url}
                                                                                </a>
                                                                            </div>

                                                                            {link.isFlagged && (
                                                                                <div className="mt-2 bg-red-50 px-3 py-2 border border-red-200 rounded-lg flex items-center gap-3">
                                                                                    <i className="fa-solid fa-triangle-exclamation text-red-600 mt-0.5 text-sm"></i>
                                                                                    <div>
                                                                                        <p className="font-bold text-red-700">
                                                                                            Violation Detected
                                                                                        </p>
                                                                                        <p className="text-[12px] text-red-600">
                                                                                            Reason: {link.violationReason || 'Community Guidelines'}. This link is disable.
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>

                                                                        {/* share + toggle enable ẩn hiện */}
                                                                        <div className="flex items-center pt-1 space-x-3">
                                                                            <button
                                                                                onClick={() => handleCopy(link.url, link._id)}
                                                                                className={`flex items-center gap-1.5 font-bold px-2 py-1 rounded transition-all duration-300 ${isCopied ? 'bg-green-100 text-green-700' : 'text-gray-400 cursor-pointer hover:text-gray-700'}`}
                                                                                title="Copy URL"
                                                                            >
                                                                                {isCopied ? (
                                                                                    <>
                                                                                        <i className="fa-solid fa-check"></i>
                                                                                        <span className="animate-fade-in text-xs">Copied!</span>
                                                                                    </>
                                                                                ) : (
                                                                                    <i className="fa-solid fa-copy text-xl"></i>
                                                                                )}
                                                                            </button>

                                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    className="sr-only peer"
                                                                                    checked={link.isEnable}
                                                                                    disabled={link.isFlagged}
                                                                                    onChange={() =>
                                                                                        handleToggleEnable(link)
                                                                                    }
                                                                                />
                                                                                <div
                                                                                    className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"
                                                                                    title="Enable/Disable"
                                                                                ></div>
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    {/* option */}
                                                                    <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
                                                                        <div className="flex items-center space-x-3 flex-wrap gap-2">
                                                                            <div
                                                                                className=" text-base font-semibold text-red-400 cursor-pointer"
                                                                                title="Analytics"
                                                                            >
                                                                                <i className="fa-regular fa-chart-bar mr-2"></i>
                                                                                {link.clickCount} clicks.
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <i
                                                                                title="Edit"
                                                                                className="fa-solid fa-pen text-blue-400 text-lg mr-2 cursor-pointer hover:text-blue-700"
                                                                                onClick={() => handleOpenEdit(link)}
                                                                            ></i>
                                                                            <i
                                                                                title="Delete"
                                                                                className="fa-solid fa-trash-can text-lg text-red-400 hover:text-red-600 cursor-pointer"
                                                                                onClick={() =>
                                                                                    handleOpenDelete(link._id)
                                                                                }
                                                                            ></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>

                        {!loadingLinks && links && links.length === 0 && (
                            <div className="text-center py-10 text-gray-500">
                                You don't have any links yet. Click "+ Add" to create one.
                            </div>
                        )}

                        <QuickActions isLinkPage={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}
