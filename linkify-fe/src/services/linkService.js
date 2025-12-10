
import api from "./api";

const addLink = async(link) => {
    const response = await api.post('/links', link);
    return response.data;
}

const getLinks = async(profileId) => {
    const response = await api.get(`/links/${profileId}`);
    return response.data;
}

const getPublicLinks = async(profileId) => {
    const response = await api.get(`/links/public/${profileId}`);
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
    const response = await api.delete(`/links/${linkId}`);
    return response.data;
}

const getTrashLinks = async (profileId) => {
    const response = await api.get(`/links/${profileId}/trash`);
    return response.data;
}

const restoreLink = async (linkId) => {
    const response = await api.patch(`/links/${linkId}/restore`);
    return response.data;
}

const hardDeleteLink = async (linkId) => {
    const response = await api.delete(`/links/${linkId}/permanent`);
    return response.data;
}

export const linkService = {
    addLink,
    getLinks,
    getPublicLinks,
    updateLink,
    reorderLinks,
    deleteLink,
    getTrashLinks,
    restoreLink,
    hardDeleteLink
};