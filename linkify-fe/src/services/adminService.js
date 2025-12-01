
import api from "./api";

const getUsers = async (params) => {
    // params: { page, limit, search, status }
    // truyền params phải đặt trong {} -> axious tự chuyển thành ?page=1&limit=10&...
    const response = await api.get('/admin/users', { params });
    return response.data;
}

const toggleLockUser = async (userId) => {
    const response = await api.patch(`/admin/users/${userId}/lock`);
    return response.data;
}

export const adminService = {
    getUsers,
    toggleLockUser
};