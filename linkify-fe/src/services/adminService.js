
import api from "./api";

const getUsers = async (params) => {
    // params: { page, limit, search, status }
    // truyền params phải đặt trong {} -> axious tự chuyển thành ?page=1&limit=10&...
    const response = await api.get('/admin/users', { params });
    return response.data;
}

const getUserDetails = async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
}

const toggleLockUser = async (userId) => {
    const response = await api.patch(`/admin/users/${userId}/lock`);
    return response.data;
}

const getLinks = async (params) => {
    const response = await api.get('/admin/links', { params });
    return response.data;
}

const resolveLink = async (linkId, decision) => {
    // decision: safe/banned
    const response = await api.patch(`/admin/links/${linkId}/resolve`, { decision });
    return response.data;
}

const getProducts = async (params) => {
    const response = await api.get('/admin/products', { params });
    return response.data;
}

const resolveProduct = async (productId, decision) => {
    const response = await api.patch(`/admin/products/${productId}/resolve`, { decision });
    return response.data;
}

export const adminService = {
    getUsers,
    getUserDetails,
    toggleLockUser,
    getLinks,
    resolveLink,
    getProducts,    
    resolveProduct
};