
import { useEffect, useState } from 'react'
import { adminService } from "../../services/adminService";
import AdminTable from "../../components/AdminDashboard/AdminTable";

// todo: move ra utils riêng
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        // gõ liên tục -> clear timeout rồi mới render lại
        return () => clearTimeout(handler);
    }, [value, delay])
    return debouncedValue;
}

export default function LinkManagementPage() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('all'); // all, flagged, safe
    const [totalPages, setTotalPages] = useState(1);

    const fetchLinks = async () => {
        setLoading(true);
        try {
            const { data, pagination } = await adminService.getLinks({
                page,
                limit: 10,
                search: debouncedSearch,
                status
            });

            setLinks(data);
            setTotalPages(pagination.totalPages);
        } catch (err) {
            console.log('Failed to fetch users');
            // set log here
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchLinks();
    }, [page, debouncedSearch, status]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, status])
    

    const handleResolve = async (link, decision) => {
        let confirmMsg = "";
        if (decision === 'safe') confirmMsg = "Mark this link as SAFE?";
        if (decision === 'banned') confirmMsg = "Delete this link?";
        if (decision === 'ban_user') confirmMsg = "⚠️ DANGER: Delete link AND LOCK USER account immediately?";

        if(!window.confirm(confirmMsg)) return;

        try {
            await adminService.resolveLink(link._id, decision);
            fetchLinks();
        } catch (err) {
            console.log('Error while updating link.')
        }
    }

    const columns = [
        {
            header: "Link Info",
            render: (link) => (
                <div className="min-w-[200px] max-w-[300px]">
                    <div className="font-bold text-gray-900 truncate" title={link.title}>{link.title}</div>
                    <a href={link.url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline truncate block">
                        {link.url}
                    </a>
                </div>
            )
        },
        {
            header: "Posted By",
            render: (link) => (
                <div className="flex items-center gap-2 min-w-[200px]">
                    <img src={link.profileId?.avatarUrl || "https://via.placeholder.com/30"} className="w-6 h-6 rounded-full"/>
                    <div className="text-sm">
                        <div className="font-semibold">{link.profileId?.username}</div>
                        <div className="text-xs text-gray-500">{link.profileId?.userId?.email}</div>
                    </div>
                </div>
            )
        },
        {
            header: "AI Detection",
            render: (link) => {
                if (!link.isFlagged) return <span className="text-green-600 text-xs font-bold"><i className="fa-solid fa-check mr-1"></i>Safe</span>;
                return (
                    <div className="flex flex-col min-w-[200px]">
                        <span className="text-red-600 text-xs font-bold uppercase">
                            <i className="fa-solid fa-triangle-exclamation mr-1"></i>
                            {link.violationReason}
                        </span>
                        <span className="text-[10px] text-gray-500">
                            Confidence: {link.violationConfidence}%
                        </span>
                    </div>
                )
            }
        },
        {
            header: "Status",
            render: (link) => (
                <div className={`w-fit px-2 py-1 rounded-full text-xs font-semibold ${
                    link.isFlagged ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                    {link.isFlagged ? 'Hidden' : 'Active'}
                </div>
            )
        }
    ];

    const renderActions = (link) => (
        <div className="flex gap-2">
            {link.isFlagged && (
                <button 
                    onClick={() => handleResolve(link, 'safe')}
                    className="p-2 text-green-600 hover:bg-[#DBFCE7] rounded tooltip"
                    title="Mark as Safe"
                >
                    <i className="fa-solid fa-shield-heart"></i>
                </button>
            )}
            
            <button 
                onClick={() => handleResolve(link, 'banned')}
                className="p-2 text-orange-600 hover:bg-orange-50 rounded"
                title="Delete Link Only"
            >
                <i className="fa-solid fa-trash"></i>
            </button>

            {link.isFlagged && (
                <button 
                    onClick={() => handleResolve(link, 'ban_user')}
                    className="p-2 text-red-600 hover:bg-[#FFE2E2] rounded"
                    title="Delete Link & BAN USER"
                >
                    <i className="fa-solid fa-user-slash"></i>
                </button>
            )}

        </div>
    );

    return (
        <div className="w-full h-full flex flex-col p-6 md:px-[40px] bg-[#f8f9fa]">
            <div className="flex justify-between gap-2 items-center mb-6">
                    {/* Search Input */}
                    <div className="relative">
                        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input 
                            type="text" 
                            placeholder="Search links..." 
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    {/* Filter Select */}
                    <div className="relative">
                        <select 
                            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white cursor-pointer"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="all">All Links</option>
                            <option value="flagged">⚠️ Flagged Violations</option>
                            <option value="safe">✅ Safe Links</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <i className="fa-solid fa-angle-down text-xs"></i>
                        </div>
                    </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
                <AdminTable 
                    columns={columns} 
                    data={links} 
                    isLoading={loading} 
                    actions={renderActions}
                />
            </div>
            
            {/* Pagination */}
             <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
                <div className="flex gap-4">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50">Previous</button>
                    <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50">Next</button>
                </div>
            </div>
        </div>
    );
}