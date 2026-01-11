import api from "./api";

const getProducts = async (profileId) => {
    const response = await api.get(`/shop/${profileId}`);
    return response.data;
};

const getPublicProducts = async(profileId) => {
    const response = await api.get(`/shop/public/${profileId}`);
    return response.data;
}

const addProduct = async (formData) => {
    const response = await api.post('/shop', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

const updateProduct = async (itemId, formData) => {
    const response = await api.patch(`/shop/${itemId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

const reorderProducts = async (products) => {
    const response = await api.put('/shop/reorder', { products });
    return response.data;
};

const deleteProduct = async (itemId) => {
    const response = await api.delete(`/shop/${itemId}`);
    return response.data;
};

const getTrashProducts = async (profileId) => {
    const response = await api.get(`/shop/${profileId}/trash`);
    return response.data;
}

const restoreProduct = async (itemId) => {
    const response = await api.patch(`/shop/${itemId}/restore`);
    return response.data;
}

const hardDeleteProduct = async (itemId) => {
    const response = await api.delete(`/shop/${itemId}/permanent`);
    return response.data;
}

export const shopService = {
    getProducts,
    getPublicProducts,
    addProduct,
    updateProduct,
    reorderProducts,
    deleteProduct,
    getTrashProducts,
    restoreProduct,
    hardDeleteProduct
};
