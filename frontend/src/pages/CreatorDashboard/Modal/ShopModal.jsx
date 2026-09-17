import { useShop } from "../../../context/ShopContext";
import { useState, useRef, useEffect } from "react";
import { Validator } from "../../../utils/validators";
import Button from "../../../components/Shared/Button";

export default function ShopModal({ onClose, editingProduct = null }) {
    const { addProduct, updateProduct } = useShop();

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().slice(0, 16);
    };

    const [showSchedule, setShowSchedule] = useState(
        editingProduct?.scheduledEnable || editingProduct?.scheduledDisable ? true : false
    );

    const [name, setName] = useState(editingProduct?.name || "");
    const [buyLink, setBuyLink] = useState(editingProduct?.buyLink || "");
    const [price, setPrice] = useState(editingProduct?.price ?? "");
    const [scheduledEnable, setScheduledEnable] = useState(
        formatDate(editingProduct?.scheduledEnable)
    );
    const [scheduledDisable, setScheduledDisable] = useState(
        formatDate(editingProduct?.scheduledDisable)
    );
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(editingProduct?.imageUrl || "");

    const [log, setLog] = useState({ type: "", content: "" });
    useEffect(() => {
        if (log.content) {
            const timerId = setTimeout(() => setLog({ type: "", content: "" }), 3000);
            return () => clearTimeout(timerId);
        }
    }, [log]);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        }
    }, [imagePreview]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || name.trim() === "") {
            setLog({ type: "error", content: "Please input product name." });
            return;
        }

        if (!buyLink || buyLink.trim() === "") {
            setLog({ type: "error", content: "Please input product link." });
            return;
        }

        const urlError = Validator.validateUrl(buyLink);
        if (urlError) {
            setLog({ type: "error", content: urlError });
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("buyLink", buyLink);
        if (price !== "") formData.append("price", price);
        if (scheduledEnable) formData.append("scheduledEnable", scheduledEnable);
        if (scheduledDisable) formData.append("scheduledDisable", scheduledDisable);
        if (selectedImage) formData.append("productImage", selectedImage);

        try {
            if (!editingProduct) {

                if (!selectedImage) {
                    setLog({ type: "error", content: "Please upload a product image." });
                    return;
                }

                setLoading(true);
                await addProduct(formData);
                setLog({ type: "success", content: "Add new product successfully." });
                setTimeout(() => onClose(), 1500);
            } else {
                setLoading(true);
                await updateProduct(editingProduct._id, formData);
                setLog({ type: "success", content: "Product updated successfully." });
                setTimeout(() => onClose(), 1500);
            }
        } catch (err) {
            setLog({ type: "error", content: err?.response?.data?.message || "Error occured. Try again later." });
            return;
        } finally {
            setLoading(false);
        }

        setTimeout(() => onClose(), 1500);
    };

    return (
        <div
            className="fixed inset-0 z-100 bg-black/50 backdrop-blur flex items-end md:items-center justify-center"
            onClick={onClose}
        >
            <div
                className="flex flex-col w-full max-w-[750px] px-10 py-[26px] max-h-[90vh] overflow-y-auto bg-white rounded-t-4xl md:rounded-3xl no-scrollbar animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="w-full flex justify-between items-center mb-4">
                    <div className="font-momo text-2xl flex items-center gap-2">
                        {editingProduct ? "Edit product" : "Add product"}
                        <i className="fa-solid fa-bag-shopping text-[#8129d9]"></i>
                    </div>
                    <div
                        className="text-[red] text-2xl cursor-pointer hover:scale-110 transition"
                        onClick={onClose}
                    >
                        <i className="fa-regular fa-circle-xmark"></i>
                    </div>
                </div>

                <div className="w-full flex-1 flex flex-col gap-[10px]">

                    {/* Image Upload Section */}
                    <div className="w-full flex justify-center">
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <div
                            className="w-[120px] h-[120px] rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-purple-400 transition overflow-hidden relative group"
                            onClick={() => fileInputRef.current.click()}
                        >
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    {/* Overlay edit icon */}
                                    <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-white">
                                        <i className="fa-solid fa-pen"></i>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-cloud-arrow-up text-2xl text-gray-400 mb-2"></i>
                                    <span className="text-xs text-gray-500 font-semibold">Upload Image</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Name & Price Row */}
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="flex-1">
                            <div className="text-[#5f6060] font-semibold mb-1.5">
                                Product Name <span className="text-red-500">*</span>
                            </div>
                            <input
                                type="text"
                                className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5 focus:ring-2 focus:ring-purple-200 outline-none transition"
                                placeholder="e.g. My Awesome E-book"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="w-full md:w-[180px]">
                            <div className="text-[#5f6060] font-semibold mb-1.5">
                                Price ($)
                            </div>
                            <input
                                type="number"
                                className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5 focus:ring-2 focus:ring-purple-200 outline-none transition"
                                placeholder="0.00"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* URL Input */}
                    <div>
                        <div className="text-[#5f6060] font-semibold mb-1.5">
                            URL <span className="text-red-500">*</span>
                        </div>
                        <input
                            type="text"
                            className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5 focus:ring-2 focus:ring-purple-200 outline-none transition"
                            placeholder="https://your-shop.com/product"
                            value={buyLink}
                            onChange={(e) => setBuyLink(e.target.value)}
                        />
                    </div>

                    {/* Schedule Toggle */}
                    <div>
                        <div
                            className="w-fit flex items-center gap-2.5 cursor-pointer select-none"
                            onClick={() => setShowSchedule(!showSchedule)}
                        >
                            <i className="fa-regular fa-clock text-gray-600"></i>
                            <span className="font-medium text-gray-700">Schedule product (optional)</span>
                            <i
                                className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${showSchedule ? "rotate-180" : ""}`}
                            ></i>
                        </div>

                        {showSchedule && (
                            <div className="flex flex-col md:flex-row gap-[30px] mt-2.5">
                                <div className="flex-1">
                                    <div className="text-[#5f6060] text-sm font-semibold mb-1.5">
                                        Schedule enable
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <input
                                            type="datetime-local"
                                            className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5"
                                            value={scheduledEnable}
                                            onChange={(e) => setScheduledEnable(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="text-[#5f6060] font-semibold mb-1.5">
                                        Schedule disable
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <input
                                            type="datetime-local"
                                            className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5"
                                            value={scheduledDisable}
                                            onChange={(e) => setScheduledDisable(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="w-full text-center">
                        <div
                            className={`h-[20px] mb-[10px] ${log.type === "error" ? "text-[red]" : "text-[green] success-glow"} font-semibold text-sm`}
                        >
                            {log.content}
                        </div>

                        <Button
                            backgrond={{ normal: "#8129d9", hover: "#5D18A2 " }}
                            color="#fff"
                            text={editingProduct ? "Save changes" : "Add product"}
                            disabled={loading}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}