import { createContext, useContext, useState, useEffect } from "react";
import { useProfile } from "./ProfileContext";
import { shopService } from "../services/shopService";

const ShopContext = createContext();
export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const { profile } = useProfile();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async (profileId) => {
    const targetProfileId = profileId || profile?._id;
    if (!targetProfileId) return;

    try {
      setLoadingProducts(true);
      setError(null);
      const { products } = await shopService.getProductsByProfile(
        targetProfileId
      );
      setProducts(products || []);
    } catch (err) {
      console.log("Error while getting products: ", err);
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (profile?._id) {
      fetchProducts(profile._id);
    } else {
      setProducts([]);
    }
  }, [profile?._id]);

  const addProduct = async (productData, imageFile) => {
    try {
      setError(null);
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("description", productData.description || "");
      formData.append("buyLink", productData.buyLink || "");
      formData.append("profileId", profile._id);

      if (imageFile) {
        formData.append("productImage", imageFile);
      }

      const { product } = await shopService.addProduct(formData);
      setProducts((prev) => [product, ...prev]);
      return { success: true, product };
    } catch (err) {
      console.log("Error while adding product: ", err);
      setError(err.message || "Failed to add product");
      return { success: false, error: err.message };
    }
  };

  const updateProduct = async (itemId, productData, imageFile) => {
    try {
      setError(null);
      const formData = new FormData();

      if (productData.name !== undefined)
        formData.append("name", productData.name);
      if (productData.price !== undefined)
        formData.append("price", productData.price);
      if (productData.description !== undefined)
        formData.append("description", productData.description);
      if (productData.buyLink !== undefined)
        formData.append("buyLink", productData.buyLink);
      if (productData.visible !== undefined)
        formData.append("visible", productData.visible);

      if (imageFile) {
        formData.append("productImage", imageFile);
      }

      const { product } = await shopService.updateProduct(itemId, formData);
      setProducts((prev) => prev.map((p) => (p._id === itemId ? product : p)));
      return { success: true, product };
    } catch (err) {
      console.log("Error while updating product: ", err);
      setError(err.message || "Failed to update product");
      fetchProducts();
      return { success: false, error: err.message };
    }
  };

  const toggleProductVisible = async (itemId, currentVisible) => {
    try {
      const formData = new FormData();
      formData.append("visible", !currentVisible);
      await shopService.updateProduct(itemId, formData);
      setProducts((prev) =>
        prev.map((p) =>
          p._id === itemId ? { ...p, visible: !currentVisible } : p
        )
      );
    } catch (err) {
      console.log("Error while toggling product visibility: ", err);
      setError(err.message || "Failed to toggle visibility");
      fetchProducts();
    }
  };

  const deleteProduct = async (itemId) => {
    try {
      setError(null);
      await shopService.deleteProduct(itemId);
      setProducts((prev) => prev.filter((p) => p._id !== itemId));
      return { success: true };
    } catch (err) {
      console.log("Error while deleting product: ", err);
      setError(err.message || "Failed to delete product");
      fetchProducts();
      return { success: false, error: err.message };
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        loadingProducts,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        toggleProductVisible,
        deleteProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
