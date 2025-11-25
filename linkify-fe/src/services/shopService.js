import api from "./api";

const getProductsByProfile = async (profileId) => {
  const response = await api.get(`/shop/${profileId}`);
  return response.data;
};

const addProduct = async (formData) => {
  const response = await api.post("/shop", formData, {
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

const deleteProduct = async (itemId) => {
  const response = await api.delete(`/shop/${itemId}`);
  return response.data;
};

export const shopService = {
  getProductsByProfile,
  addProduct,
  updateProduct,
  deleteProduct,
};
