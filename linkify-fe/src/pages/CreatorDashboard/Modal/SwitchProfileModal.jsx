import { useProfile } from "../../../context/ProfileContext";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SwitchProfileModal({ onClose , onSuccess }) {

    const { profiles, profile: currentProfile, switchProfile } = useProfile();

    // hiện spinner
    const [switching, setSwitching] = useState(false);
    // hiện spinner ngay tại profile vừa chọn
    const [selectedProfileId, setSelectedProfileId] = useState(null);

    const navigate = useNavigate();

    const handleSelect = (profileId) => {
        setSelectedProfileId(profileId);
        setSwitching(true);
        
        setTimeout(() => {
            switchProfile(profileId);
            if (onSuccess) onSuccess();
            onClose();
        }, 1500);
    }

    const handleCreate = () => {
        onClose();
        navigate('/onboarding/profile', { state: { isAddingNew: true } })
    }

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur flex items-center justify-center"
            onClick={onClose}
        >
            <div 
                className="flex flex-col items-center w-full max-w-[540px] min-h-[360px] max-h-[600px] overflow-auto bg-[#fff] md:rounded-2xl"
                onClick={e => e.stopPropagation()}
            >
                <div className="w-full relative flex items-center justify-center mt-6 font-momo text-2xl">
                    <div>
                        Switch linkify
                        <i className="fa-solid fa-shuffle ml-2 text-green-500"></i>
                    </div>

                    <div
                        className="absolute right-6 text-[red] text-2xl cursor-pointer"
                        onClick={onClose}
                    >
                        <i className="fa-regular fa-circle-xmark"></i>
                    </div>
                </div>

                <div className="w-full px-10 mt-6 overflow-y-auto">
                    {profiles.map((p) => (
                        <div
                            key={p._id}
                            onClick={() => handleSelect(p._id)}
                            className="w-full p-3 rounded-2xl cursor-pointer flex items-center gap-6 hover:bg-[#F6F7F5]"
                        >
                            <div className={`p-1 w-20 h-20 border border-2 ${p._id === currentProfile?._id ? 'border-purple-400' : 'border-gray-300'} rounded-full`}>
                                <img
                                    src={p.avatarUrl}
                                    alt={p.username}
                                    className="w-full h-full rounded-full"
                                />
                            </div>

                            <div className="">
                                <div className="font-bold text-lg">
                                    {p.username}
                                </div>
                                <div>
                                    linkify.com/{p.username}
                                </div>
                            </div>

                            {!switching && p._id === currentProfile?._id && (
                                <div className="ml-auto font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm">
                                    Active
                                </div>
                            )}

                            {switching && selectedProfileId === p._id && (
                                <div className="ml-auto text-purple-600 w-10 h-10 flex items-center justify-center bg-purple-100 p-3 rounded-full animate-spin [animation-duration:3s]">
                                    <i className="fa-solid fa-arrows-rotate"></i>
                                </div>
                            )}
                            
                        </div>
                    ))}


                </div>

                <div className="w-[180px] border border-gray-300 my-4"></div>

                <div 
                    className="w-full px-10 mb-6 cursor-pointer"
                    onClick={handleCreate}    
                >
                    <div className="w-full p-3 rounded-2xl hover:bg-[#F6F7F5] flex items-center gap-6">

                        <div className="w-18 h-18 flex items-center justify-center bg-[#F1F0EE] rounded-full">
                            <i className="fa-solid fa-plus"></i>
                        </div>
                        <div className="font-bold text-lg">
                            Create new profile
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    )
}