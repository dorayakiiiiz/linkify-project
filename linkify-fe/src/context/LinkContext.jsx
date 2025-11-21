import { createContext, useContext, useState, useEffect } from "react";
import { useProfile } from "./ProfileContext";
import { linkService } from "../services/linkService";

const LinkContext = createContext();

export const useLinks = () => useContext(LinkContext);

export const LinkProvider = ({ children }) => {
    const { profile } = useProfile();
    const [links, setLinks] = useState([]);
    const [loadingLinks, setLoadingLinks] = useState(false);

    const fetchLinks = async () => {
        if (!profile?._id)
            return;
        try {
            setLoadingLinks(true);
            const { links } = await linkService.getLinks(profile._id);
            setLinks(links || []);
        } catch (err) {
            console.log('Error while getting links: ', err);  
        } finally {
            setLoadingLinks(false);
        }
    }

    useEffect(() => {
        if (profile?._id) {
            fetchLinks();
        } else {
            setLinks([]);
        }
    }, [profile?._id]);

    const addNewLink = async (title, url) => {
        try {
            const { link } = await linkService.addLink({ profileId: profile._id, title, url });
            setLinks(prev => [...prev, link]);
        } catch (err) {
            console.log('Error while adding new link: ', err);
        }
    }

    const updateLink = async (linkId, data) => {
        try {
            await linkService.updateLink(linkId, data);
            setLinks(prev => prev.map(l => l._id === linkId ? { ...l, ...data} : l));
        } catch (err) {
            console.log('Error while updating link: ', err);
            fetchLinks();
        }
    }

    const removeLink = async (linkId) => {
        try {
            await linkService.deleteLink(linkId);
            setLinks(prev => prev.filter(l => l._id !== linkId));
        } catch (err) {
            console.log('Error while deleting link: ', err);
            fetchLinks();
        }
    }

    return (
        <LinkContext.Provider value={{ links, loadingLinks, addNewLink, updateLink, removeLink, fetchLinks }}>
            {children}
        </LinkContext.Provider>
    )
}