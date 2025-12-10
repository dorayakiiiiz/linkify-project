
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

const getProfiles = async (userId) => {
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

export const profileService = {
    createOnboardingProfile,
    checkUsername,
    getProfiles,
    getPublicProfile,
    updateProfile
};