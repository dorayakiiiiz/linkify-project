import { Link } from "react-router-dom";

export default function AboutUs() {
    // Sắp xếp Leader vào giữa (vị trí index 2) để hiển thị trung tâm trên Grid
    const team = [
        { 
            name: "Huỳnh Đức Thịnh", 
            id: "23120199", 
            role: "Frontend Developer",
            color: "from-emerald-400 to-teal-500",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thinh" 
        },
        { 
            name: "Trà Văn Sỹ", 
            id: "23120197", 
            role: "Project Leader & Core Dev",
            color: "from-emerald-500 via-teal-500 to-blue-600",
            isLeader: true,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sy" 
        },
        { 
            name: "Lê Trung Thành Đạt", 
            id: "23120228", 
            role: "Fullstack Developer",
            color: "from-blue-500 to-cyan-500",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dat" 
        },
        { 
            name: "Lê Hà Thanh Chương", 
            id: "23120195", 
            role: "Backend Developer",
            color: "from-blue-600 to-indigo-500",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ThanhChuong" 
        },
        { 
            name: "Nguyễn Nhựt Thanh", 
            id: "23120198", 
            role: "UI/UX Designer",
            color: "from-teal-400 to-emerald-500",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thanh" 
        },
    ];

    return (
        <div className="w-full min-h-screen p-4 flex items-center justify-center overflow-y-auto">
            <div className="absolute inset-0 lg:bg-[url('/bg_group.jpg')] bg-cover bg-center brightness-[0.9]"></div>

            <div className="max-w-4xl mx-auto relative z-10 bg-white/90 rounded-2xl p-10 backdrop-blur-sm">
                {/* Compact Header */}
                <Link
                    to="/"
                    className="font-momo md:ml-[20px] self-start md:self-end"
                >
                    Linkify
                    <i className="fa-brands fa-linktree text-[#43E660]"></i>
                </Link>
                
                <div className="text-center mb-12 mt-5 md:mt-0">
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight font-momo">
                        The <span className="bg-clip-text text-blue-400">Linkify</span> Team
                    </h2>
                </div>

                {/* Compact Team Grid */}
                <div className="flex flex-wrap justify-center gap-6 font-quicksand">
                    {team.map((member) => (
                        <div 
                            key={member.id}
                            className={`group relative w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] min-w-[250px] bg-white rounded-3xl p-4 transition-all duration-300 border ${
                                member.isLeader 
                                ? 'border-blue-200 shadow-lg shadow-blue-100/50 ring-1 ring-blue-400/20' 
                                : 'border-slate-100 shadow-sm hover:shadow-md'
                            }`}
                        >
                            {member.isLeader && (
                                <div className="absolute -top-3 right-6 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                    Lead
                                </div>
                            )}

                            <div className="flex flex-col items-center">
                                {/* Small & Clean Avatar */}
                                <div className="relative mb-4">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-full blur-md opacity-10 group-hover:opacity-30 transition-opacity`}></div>
                                    <img 
                                        src={member.image} 
                                        alt={member.name}
                                        className="w-14 h-14 rounded-2xl relative z-10 object-cover bg-slate-50 border border-slate-100"
                                    />
                                </div>

                                {/* Minimal Info */}
                                <h3 className="text-lg font-bold text-slate-800 text-center">{member.name}</h3>
                                <p className={`text-[10px] font-black bg-clip-text text-transparent bg-gradient-to-r ${member.color} uppercase tracking-widest mb-3`}>
                                    {member.role}
                                </p>
                            

                                {/* Student ID Badge */}
                                <div className="bg-slate-50 px-3 py-1 flex rounded-lg border border-gray-200 shadow-xs">
                                    <span className="text-[10px] font-bold text-gray-500">{member.id}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Subtle Footer */}
                <div className="mt-6 text-center font-quicksand font-bold text-red-400 uppercase tracking-[0.1em]">
                    23CTT3. Build with 💖
                </div>
            </div>
        </div>
    );
}
