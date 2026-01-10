import { createContext, useContext, useState, useEffect } from "react";
import { useProfile } from "./ProfileContext";
import { shopService } from "../services/shopService";



const ShopContext = createContext();
export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const { profile } = useProfile();
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);

    const fetchProducts = async () => {
        if (!profile?._id)
            return;

        try {
            setLoadingProducts(true);
            const { products } = await shopService.getProducts(profile._id);
            setProducts(products || []);
        } catch (err) {
            console.log("Error while getting products: ", err);
        } finally {
            setLoadingProducts(false);
        }
    };

    useEffect(() => {
        if (profile?._id) {
            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [profile?._id]);

    const addProduct = async (formData) => {
        try {
            if (profile?._id) {
                formData.append('profileId', profile._id);
            }
            const { product } = await shopService.addProduct(formData);
            setProducts((prev) => [...prev, product]);
        } catch (err) {
            console.log("Error while adding product: ", err);
            throw err;
        }
    };

    const updateProduct = async (itemId, formData) => {
        try {
            const { product } = await shopService.updateProduct(itemId, formData);
            setProducts((prev) => prev.map((p) => (p._id === itemId ? product : p)));
        } catch (err) {
            console.log("Error while updating product: ", err);
            fetchProducts();
            throw err;
        }
    };

    const reorderProducts = async (srcIndex, desIndex) => {
        const newProducts = [...products];
        const [reorderedItem] = newProducts.splice(srcIndex, 1);
        newProducts.splice(desIndex, 0, reorderedItem);

        setProducts(newProducts);

        const productsToUpdate = newProducts.map((product, index) => ({
            _id: product._id,
            order: index
        }));

        try {
            await shopService.reorderProducts(productsToUpdate);
        } catch (err) {
            console.log("Error while reordering products: ", err);
            fetchProducts();
        }
    };

    const removeProduct = async (itemId) => {
        try {
            await shopService.deleteProduct(itemId);
            setProducts((prev) => prev.filter((p) => p._id !== itemId));
        } catch (err) {
            console.log("Error while deleting product: ", err);
            fetchProducts();
        }
    };

    return (
        <ShopContext.Provider
            value={{
                products,
                loadingProducts,
                fetchProducts,
                addProduct,
                updateProduct,
                reorderProducts,
                removeProduct,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};
