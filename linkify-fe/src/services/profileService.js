
import { use } from "react";
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

export const profileService = {
    createOnboardingProfile
};