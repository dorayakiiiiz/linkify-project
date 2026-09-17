import api from "./api";

const generateHooks = async (data) => {
    const response = await api.post('/tools/post-ideas/hooks', data);
    return response.data;
}

const generateContent = async (data) => {
    const response = await api.post('/tools/post-ideas/content', data);
    return response.data;
}

export const toolService = {
    generateHooks,
    generateContent
};