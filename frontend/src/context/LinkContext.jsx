import { createContext, useContext, useState, useEffect } from "react";
import { useProfile } from "./ProfileContext";
import { linkService } from "../services/linkService";
import { API_URL } from "../services/api";

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

    // Listen to real-time Server-Sent Events (SSE) for link moderation status updates
    useEffect(() => {
        if (!profile?._id) return;

        const baseUrl = API_URL || 'http://localhost:5000/api';
        const sseUrl = `${baseUrl}/sse/moderation/${profile._id}`;
        const eventSource = new EventSource(sseUrl, { withCredentials: true });
        // sau lệnh này trình duyệt gửi http request get tới backend và hàm addClient sẽ chạy
        // -> khởi tạo kết nối thành công

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'link' && data.id) {
                    setLinks(prev => prev.map(l => l._id === data.id ? { ...l, ...data } : l));
                }
            } catch (err) {
                console.log('SSE link parse error:', err);
            }
        };

        return () => {
            eventSource.close();
        };
    }, [profile?._id]);

    const addNewLink = async (title, url, scheduledEnable, scheduledDisable) => {
        try {
            const { link } = await linkService.addLink({ profileId: profile._id, title, url, scheduledEnable, scheduledDisable });
            setLinks(prev => [...prev, link]);
        } catch (err) {
            console.log('Error while adding new link: ', err);
        }
    }

    const updateLink = async (linkId, data) => {
        try {
            const res = await linkService.updateLink(linkId, data);
            const updated = res?.link;
            if (updated) {
                setLinks(prev => prev.map(l => l._id === linkId ? updated : l));
            } else {
                setLinks(prev => prev.map(l => l._id === linkId ? { ...l, ...data } : l));
            }
        } catch (err) {
            console.log('Error while updating link: ', err);
            fetchLinks();
        }
    }

    const reorderLinks = async (srcIndex, desIndex) => {
        const newLinks = [...links];
        const [reorderedItem] = newLinks.splice(srcIndex, 1);
        newLinks.splice(desIndex, 0, reorderedItem);

        setLinks(newLinks);

        const linksToUpdate = newLinks.map((link, index) => ({
            _id: link._id,
            order: index
        }))

        try {
            await linkService.reorderLinks(linksToUpdate);
        } catch (err) {
            console.log('Error while reordering links: ', err);
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
        <LinkContext.Provider value={{ links, loadingLinks, addNewLink, updateLink, reorderLinks, removeLink, fetchLinks }}>
            {children}
        </LinkContext.Provider>
    )
}