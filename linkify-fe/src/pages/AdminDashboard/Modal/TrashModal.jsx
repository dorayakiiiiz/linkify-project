import React, { useEffect, useState } from 'react';
import { linkService } from '../../../services/linkService';
import { shopService } from '../../../services/shopService';
// import { shopService } from '../../../services/shopService';

export default function TrashModal({ onClose, profileId, type = 'link', onRestoreSuccess }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTrash = async () => {
        try {
            setLoading(true);
            if (type === 'link') {
                const { links } = await linkService.getTrashLinks(profileId);
                setItems(links);
            } else if (type === 'shop') {
                const { products } = await shopService.getTrashProducts(profileId);
                setItems(products);
            }
        } catch (err) {
            console.log('Error while fetching trash item: ', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTrash();
    }, [profileId, type]);

    const handleRestore = async (item) => {
        try {
            if (type === 'link') {
                await linkService.restoreLink(item._id);
            } else if (type === 'shop') {
                await shopService.restoreProduct(item._id);
            }

            fetchTrash();
            if (onRestoreSuccess) onRestoreSuccess();
            
        } catch (err) {
            console.log('Error while restoring item: ', err);
        }
    };

    const handleHardDelete = async (itemId) => {
        if (!window.confirm('Delete permanently? This action cannot be undone.')) return;
        try {
            if (type === 'link') {
                await linkService.hardDeleteLink(itemId);
            } else if (type === 'shop') {
                await shopService.hardDeleteProduct(itemId);
            }

            fetchTrash();
        } catch (err) {
            console.log('Error while delete item permanently: ', err);
        }
    }

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all" onClick={onClose}>
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] pb-3 flex flex-col shadow-2xl overflow-hidden border border-slate-100" onClick={e => e.stopPropagation()}>
                <div className="px-6 py-3 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="font-bold text-xl text-slate-800">Trash Bin</h3>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
                    >
                        <i className="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-3">
                            <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
                            <span className="text-slate-500 font-medium">Loading items...</span>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="text-center py-20 flex flex-col items-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <i className="fa-regular fa-folder-open text-2xl text-slate-300"></i>
                            </div>
                            <div className="text-slate-400 font-medium">Trash is empty.</div>
                        </div>
                    ) : (
                        <div className="space-y-3 px-2">
                            {items.map(item => (
                                <div key={item._id} className="group relative border border-gray-300 rounded-xl p-4 flex justify-between items-center bg-white hover:border-blue-400 hover:shadow-sm transition-all duration-200">
                                    <div className="flex items-center gap-4 min-w-0 flex-1">
                                        {/* shop -> hiển thị ảnh */}
                                        {type === 'shop' && (
                                            <div className="relative shrink-0">
                                                <img src={item.imageUrl} className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm" />
                                            </div>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <div className="font-semibold text-slate-700 truncate">{item.title || item.name}</div>
                                            <div className="text-xs text-slate-400 truncate mt-0.5 font-medium">{item.url || item.buyLink}</div>
                                            
                                            {/* Cảnh báo nếu vi phạm */}
                                            {item.isFlagged && (
                                                <div className="text-red-500 text-[10px] font-bold mt-1.5 flex items-center gap-1 bg-red-50 w-fit px-2 py-0.5 rounded-full border border-red-100">
                                                    <i className="fa-solid fa-circle-exclamation"></i>
                                                    Violation Detected (Locked)
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2 shrink-0 ml-4">
                                        <button 
                                            onClick={() => handleRestore(item)}
                                            disabled={item.isFlagged} // Disable nếu vi phạm
                                            className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all ${item.isFlagged ? 'opacity-20 cursor-not-allowed bg-slate-50 border-slate-200' : 'bg-white border-green-100 text-green-600 hover:bg-green-600 hover:text-white hover:shadow-lg hover:shadow-green-200 active:scale-90'}`}
                                            title="Restore"
                                        >
                                            <i className="fa-solid fa-rotate-left text-sm"></i>
                                        </button>
                                        <button 
                                            onClick={() => handleHardDelete(item._id)}
                                            className="w-9 h-9 flex items-center justify-center rounded-xl border border-red-100 text-red-500 bg-white hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-200 transition-all active:scale-90"
                                            title="Delete Permanently"
                                        >
                                            <i className="fa-solid fa-trash-can text-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                
            </div>
        </div>
    );
}