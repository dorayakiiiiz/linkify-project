// SHOP FEATURE - Shop service for API calls
import api from "./api";

// SHOP FEATURE - Get all products by profile ID
const getProductsByProfile = async (profileId) => {
  // SHOP FEATURE - Call GET /api/shop/:profileId
  const response = await api.get(`/shop/${profileId}`);
  return response.data;
};

// SHOP FEATURE - Add new product with image upload
const addProduct = async (formData) => {
  // SHOP FEATURE - Send multipart/form-data with product info + image
  const response = await api.post("/shop", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// SHOP FEATURE - Update existing product (optional new image)
const updateProduct = async (itemId, formData) => {
  // SHOP FEATURE - Call PATCH /api/shop/:itemId with formData
  const response = await api.patch(`/shop/${itemId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// SHOP FEATURE - Delete product by ID
const deleteProduct = async (itemId) => {
  // SHOP FEATURE - Call DELETE /api/shop/:itemId
  const response = await api.delete(`/shop/${itemId}`);
  return response.data;
};

// SHOP FEATURE - Export shop service object
export const shopService = {
  getProductsByProfile,
  addProduct,
  updateProduct,
  deleteProduct,
};
