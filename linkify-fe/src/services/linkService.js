
import api from "./api";

const createLink = async(links) => {
    const response = await api.post('/links/create', links);
    return response.data;
}

export const linkService = {
    createLink
};