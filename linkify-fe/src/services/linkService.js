
import api from "./api";

const addLink = async(link) => {
    const response = await api.post('/links', link);
    return response.data;
}

const getLinks = async(profileId) => {
    const response = await api.get(`/links/${profileId}`);
    return response.data;
}

const updateLink = async(linkId, data) => {
    const response = await api.patch(`/links/${linkId}`, data);
    return response.data;
}

const reorderLinks = async(links) => {
    const response = await api.put('/links/reorder', { links });
    return response.data;
}

const deleteLink = async(linkId) => {
    console.log('in service: ', linkId);
    const response = await api.delete(`/links/${linkId}`);
}

export const linkService = {
    addLink,
    getLinks,
    updateLink,
    reorderLinks,
    deleteLink
};