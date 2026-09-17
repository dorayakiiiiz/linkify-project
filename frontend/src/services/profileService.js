
import api from "./api";

const createOnboardingProfile = async ({ username, bio, avatar }) => {
    const formData = new FormData();
    formData.append("username", username);
    if (bio)
        formData.append("bio", bio);
    if (avatar)
        formData.append("avatar", avatar);

    const response = await api.post('/profile/onboarding', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    
    return response.data;
}

const checkUsername = async(username) => {
    const response = await api.get(`/profile/check-username/${encodeURIComponent(username)}`);
    return response.data;
}

const getProfiles = async () => {
    const response = await api.get('/profile/me');
    return response.data;
}

const getPublicProfile = async (username) => {
    const response = await api.get(`profile/public/${username}`);
    return response.data;
}

const updateProfile = async (formData) => {
    const response = await api.patch('/profile', formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
}

// DesignData là object chứa thông tin design cần update
const updateDesign = async (profileId, designData) => {
    // Gửi JSON body thay vì FormData
    const response = await api.patch('/profile/design', { 
        profileId, 
        design: designData 
    });
    return response.data;
}

//Upload background image và trả về URL
const uploadBackground = async (formData) => {
    const response = await api.post('/profile/upload-background', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })};
const deactivateProfile = async (profileId) => {
    const response = await api.patch(`/profile/${profileId}/deactivate`);
    return response.data;
}

const reactivateProfile = async (profileId) => {
    const response = await api.patch(`/profile/${profileId}/activate`);
    return response.data;
}

const deleteProfile = async (profileId) => {
    const response = await api.delete(`/profile/${profileId}`);
    return response.data;
}

export const profileService = {
    createOnboardingProfile,
    checkUsername,
    getProfiles,
    getPublicProfile,
    updateProfile,
    updateDesign,
    uploadBackground,
    deactivateProfile,
    reactivateProfile,
    deleteProfile
};