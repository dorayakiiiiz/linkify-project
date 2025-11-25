import QuickActions from "../../components/CreatorDashboard/Shared/QuickActions";
import { UserInfo } from "../../components/CreatorDashboard/Shared/UserInfo";
import { useShop } from "../../context/ShopContext";
import { useState } from "react";
import DeleteModal from "../../components/DeleteModal";

export default function ShopPage() {
  const {
    products,
    loadingProducts,
    addProduct,
    updateProduct,
    toggleProductVisible,
    deleteProduct,
  } = useShop();

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    buyLink: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({ name: "", price: "", description: "", buyLink: "" });
    setSelectedImage(null);
    setImagePreview("");
    setIsProductModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || "",
      buyLink: product.buyLink || "",
    });
    setSelectedImage(null);
    setImagePreview(product.imageUrl || "");
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: "", price: "", description: "", buyLink: "" });
    setSelectedImage(null);
    // SHOP FEATURE - Cleanup preview URL
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(previewUrl);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price) {
      alert("Please enter product name and price");
      return;
    }

    if (editingProduct) {
      await updateProduct(editingProduct._id, formData, selectedImage);
    } else {
      await addProduct(formData, selectedImage);
    }

    handleCloseProductModal();
  };

  const handleOpenDelete = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteId(id);
  };

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const handleToggleVisible = (product) => {
    toggleProductVisible(product._id, product.visible);
  };

  const ProductSkeleton = () => (
    <div className="bg-white px-4 py-6 rounded-xl shadow-md border border-gray-100 flex items-center gap-4 animate-pulse">
      <div className="w-20 h-20 bg-gray-200 rounded"></div>
      <div className="grow">
        <div className="flex justify-between mb-4">
          <div className="space-y-2 w-3/4">
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col">
      {isProductModalOpen && (
        <div
          className="fixed inset-0 z-100 bg-black/50 backdrop-blur flex items-center justify-center"
          onClick={handleCloseProductModal}
        >
          <div
            className="flex flex-col w-full max-w-[750px] px-10 py-[26px] bg-white md:rounded-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-between items-center mb-6">
              <div className="font-momo text-2xl">
                {editingProduct ? "Edit Product" : "Add New Product"}
                <i className="fa-solid fa-shop ml-2.5 text-[#0099ff]"></i>
              </div>
              <div
                className="text-[red] text-2xl cursor-pointer"
                onClick={handleCloseProductModal}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[#5f6060] font-semibold mb-2 block">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="text-[#5f6060] font-semibold mb-2 block">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="text-[#5f6060] font-semibold mb-2 block">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  className="w-full rounded-xl bg-[#f7f8f6] px-5 py-3"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-[#5f6060] font-semibold mb-2 block">
                  Buy Link
                </label>
                <input
                  type="url"
                  name="buyLink"
                  className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5"
                  value={formData.buyLink}
                  onChange={handleInputChange}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="text-[#5f6060] font-semibold mb-2 block">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />

                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseProductModal}
                  className="px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {editingProduct ? "Update" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          deleteId={deleteId}
          onClose={handleCloseDelete}
          onDelete={deleteProduct}
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
                + Add Product
              </button>
            </div>
          </div>

          <div className="w-full my-4">
            {loadingProducts && (
              <div className="space-y-4 pr-2">
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
              </div>
            )}

            {!loadingProducts && products && products.length > 0 && (
              <div className="space-y-4 pr-2">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white px-4 py-6 rounded-3xl shadow-md flex items-center gap-4"
                  >
                    <div
                      className="flex items-start mr-3 pt-1 text-gray-400 hover:text-gray-600 cursor-move"
                      title="Move"
                    >
                      <i className="fa-solid fa-grip-vertical text-lg"></i>
                    </div>

                    <div className="grow min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4 grow min-w-0 pr-4">
                          <div className="shrink-0">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                <i className="fa-solid fa-image text-gray-400 text-xl"></i>
                              </div>
                            )}
                          </div>

                          <div className="grow min-w-0">
                            <div className="flex items-center mb-1">
                              <span className="font-bold">{product.name}</span>
                            </div>
                            <div className="text-purple-600 font-semibold mb-1">
                              ${product.price}
                            </div>
                            {product.description && (
                              <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                                {product.description}
                              </p>
                            )}
                            {product.buyLink && (
                              <a
                                href={product.buyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-500 truncate block"
                              >
                                {product.buyLink}
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="flex items-start pt-1 space-x-3">
                          <i
                            title="Edit"
                            className="fa-solid fa-pen text-gray-500 text-lg hover:text-[#47B6FF] cursor-pointer"
                            onClick={() => handleOpenEdit(product)}
                          ></i>
                          <i
                            title="Delete"
                            className="fa-solid fa-trash-can text-gray-500 text-lg hover:text-red-500 cursor-pointer"
                            onClick={() => handleOpenDelete(product._id)}
                          ></i>

                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={product.visible}
                              onChange={() => handleToggleVisible(product)}
                            />
                            <div
                              className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"
                              title="Visible/Hidden"
                            ></div>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
                        <div className="flex items-center space-x-3 flex-wrap gap-2">
                          <i
                            className="fa-regular fa-image text-base hover:text-gray-700 cursor-pointer"
                            title="Thumbnail"
                          ></i>
                          <i
                            className="fa-solid fa-star text-base hover:text-gray-700 cursor-pointer"
                            title="Favourite"
                          ></i>
                          <i
                            className="fa-solid fa-lock text-base hover:text-gray-700 cursor-pointer"
                            title="Lock"
                          ></i>
                          <i
                            className="fa-regular fa-chart-bar text-base hover:text-gray-700 cursor-pointer"
                            title="Analytics"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loadingProducts && products && products.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                You don't have any products yet. Click "+ Add Product" to create
                one.
              </div>
            )}

            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
