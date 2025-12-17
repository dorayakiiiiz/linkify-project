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

            <div className="flex-1 p-6 md:px-[60px]">
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
                        <div className="flex justify-center cursor-pointer gap-2 items-center border border-gray-300 shadow px-4 py-2 rounded-lg mr-2 bg-gray-100 hover:bg-[#fff]">
                            <div>
                                View trash bin
                            </div>
                            <div className="flex justify-center items-center text-gray-500">
                                <i className="fa-regular fa-trash-can text-xl"></i>
                            </div>
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
                                                                                <span className="font-bold">
                                                                                    {link.title}
                                                                                </span>
                                                                            </div>

                                                                            <div className="flex items-center">
                                                                                <a
                                                                                    href={link.url}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="text-sm text-blue-600 hover:text-blue-500 truncate min-w-0"
                                                                                >
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
                                                                        <div className="flex items-start pt-1 space-x-3">
                                                                            <div>
                                                                                <i
                                                                                    className="fa-solid fa-share-from-square text-gray-500 text-lg hover:text-gray-700 cursor-pointer"
                                                                                    title="Share"
                                                                                ></i>
                                                                            </div>

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
                                                                            <i
                                                                                className="fa-solid fa-star text-base hover:text-gray-700 cursor-pointer"
                                                                                title="Favourite"
                                                                            ></i>
                                                                            <i
                                                                                className="fa-solid fa-lock text-base hover:text-gray-700 cursor-pointer"
                                                                                title="Lock"
                                                                            ></i>

                                                                            <div 
                                                                                className=" text-base hover:text-gray-700 cursor-pointer"
                                                                                title="Analytics"
                                                                            >
                                                                            <i className="fa-regular fa-chart-bar mr-2"></i>
                                                                            {link.clickCount} clicks.
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <i
                                                                                title="Edit"
                                                                                className="fa-solid fa-pen text-gray-400 text-lg mr-2 cursor-pointer hover:text-[#47B6FF]"
                                                                                onClick={() => handleOpenEdit(link)}
                                                                            ></i>
                                                                            <i
                                                                                title="Delete"
                                                                                className="fa-solid fa-trash-can text-lg hover:text-red-500 cursor-pointer"
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

                        <QuickActions />
                    </div>
                </div>
            </div>
        </div>
    );
}
