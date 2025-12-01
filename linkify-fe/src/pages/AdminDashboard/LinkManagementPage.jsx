
import { useEffect, useState } from 'react'
import { useAuth } from "../../context/AuthContext";
import { adminService } from "../../services/adminService";
import AdminTable from "../../components/AdminDashboard/AdminTable";

// hàm debounce set state chậm hơn để giảm tải khi search
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        // gõ liên tục -> clear timeout rồi mới render lại
        return () => clearTimeout(handler);
    }, [value, delay])
    return debouncedValue;
}

export default function UserManagementPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('all');
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const { data, pagination } = await adminService.getUsers({
                    page,
                    limit: 10,
                    search: debouncedSearch,
                    status
                });

                setUsers(data);
                setTotalPages(pagination.totalPages);
            } catch (err) {
                console.log('Failed to fetch users');
                // set log here
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, [page, debouncedSearch, status]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, status])
    

    const handleToggleLock = async (user) => {
        // fix: move ra modal
        if(!window.confirm(`Are you sure you want to ${user.isLocked ? 'unlock' : 'lock'} this user?`)) return;
    
        try {
            await adminService.toggleLockUser(user._id);
            
            setUsers(prev => prev.map(u => 
                u._id === user._id ? { ...u, isLocked: !user.isLocked } : u
            ));
        } catch (err) {
            console.log('Failed to toggle user status');
            // set log hereee
        }

    }

    const columns = [
        {
            header: "Creator info",
            render: (user) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 text-xl">
                        <i className="fa-regular fa-user"></i>
                    </div>
                    <div>
                        <div className="font-bold text-gray-900">{user.displayName}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                </div>
            )
        },
        // {
        //     header: "Role",
        //     accessor: "role",
        //     render: (user) => (
        //         <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        //             user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
        //         }`}>
        //             {user.role.toUpperCase()}
        //         </span>
        //     )
        // },
        {
            header: "Login Method",
            accessor: "loginMethod",
            render: (user) => (
                <span className="text-gray-500 capitalize">
                    <i className={`mr-2 ${
                        user.loginMethod === 'google' ? ' fa-brands fa-google text-red-500' : 
                        user.loginMethod === 'facebook' ? 'fa-brands fa-facebook text-blue-600' : 'fa-solid fa-earth-asia text-gray-400'
                    }`}></i>
                    {user.loginMethod}
                </span>
            )
        },
        {
            header: "Join",
            accessor: "createdAt",
            render: (user) => (
                <span className="text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('en-GB')} 
                </span>
            )
        },
        {
            header: "Status",
            render: (user) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.isLocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                    {user.isLocked ? 'Locked' : 'Active'}
                </span>
            )
        }
    ];

    const renderActions = (user) => (
        <div className="flex justify-start gap-2">
            <button 
                onClick={() => handleToggleLock(user)}
                className={`p-2 rounded-lg transition-colors ${
                    user.isLocked 
                    ? 'text-green-600 hover:bg-green-50' 
                    : 'text-red-600 hover:bg-red-50'
                }`}
                title={user.isLocked ? "Unlock User" : "Lock User"}
            >
                <i className={`fa-solid ${user.isLocked ? 'fa-lock-open' : 'fa-lock'}`}></i>
            </button>
            {/* Thêm nút Edit/Delete nếu cần */}
        </div>
    );

    return (
        <div className="w-full h-full flex flex-col p-6 md:px-[40px] bg-[#f8f9fa]">
            {/* Header & Filters */}
            <div className="flex flex-row md:justify-end items-center mb-6 gap-4">
                
                <div className="flex gap-3">
                    {/* Search */}
                    <div className="relative grow md:grow-0">
                        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input 
                            type="text" 
                            placeholder="Search users" 
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-[250px]"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Filter status */}
                    <div className="relative">
                        <select 
                            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white cursor-pointer"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="locked">Locked</option>
                        </select>
                        
                        {/* Custom Arrow Icon */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <i className="fa-solid fa-angle-down text-xs"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-hidden flex flex-col">
                <AdminTable 
                    columns={columns} 
                    data={users} 
                    isLoading={loading} 
                    actions={renderActions}
                />
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    Page {page} of {totalPages}
                </span>
                <div className="flex gap-4">
                    <button 
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                    >
                        Previous
                    </button>
                    <button 
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}