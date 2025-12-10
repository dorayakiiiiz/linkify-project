import { useState, useEffect } from 'react'
import Button from "../../../components/Shared/Button"
import { profileService } from "../../../services/profileService"
import { Validator } from "../../../utils/validators"

export default function EditProfileModal({ onClose, profile, onSuccess }) {
    
    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio || '');
    const [avatarPreview, setAvatarPreview] = useState(profile.avatarUrl);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false); 

    const [log, setLog] = useState({ type: '', content: '' });

    useEffect(() => {
        if (log.content && log.type === 'error') {
            const timerId = setTimeout(() => setLog({ type: '', content: '' }), 2000);
            return () => clearTimeout(timerId);
        }
    }, [log]);
    
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
             setLog({ type: 'error', content: 'Image size must be less than 5MB' });
             return;
        }

        const previewURL = URL.createObjectURL(file);
        setAvatarPreview(previewURL);

        setAvatar(file);
    }

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatarPreview);
        }
    }, [avatar, avatarPreview]);

    const handleSubmit = async () => {

        const error = Validator.validateUsername(username);
        if (error) {
            setLog({ type: 'error', content: error });
            return;
        }

        setLoading(true);

        try {
            if (username !== profile.username) {
                const { isAvailable } = await profileService.checkUsername(username);
                if (!isAvailable) {
                    setLog({ type: 'error', content: 'This username is already taken.' });
                    setLoading(false);
                    return;
                }
            }

            const formData = new FormData();
            formData.append('username', username);
            formData.append('profileId', profile._id);
            formData.append('bio', bio);
            if (avatar) {
                formData.append('avatar', avatar);
            }

            await profileService.updateProfile(formData);

            setLog({ type: 'success', content: 'Profile updated successfully!' });

            if (onSuccess) onSuccess();

            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (err) {
            setLog({ 
                type: 'error', 
                content: err.response?.data?.message || 'Failed to update profile.' 
            });
        } finally {
            setLoading(false);
        }
    }


    return (
        <div
            className="fixed inset-0 z-100 bg-black/50 backdrop-blur flex items-center justify-center"
            onClick={onClose}
        >
            <div 
                className="flex flex-col items-center w-full max-w-[600px] h-full max-h-[560px] bg-[#fff] md:rounded-2xl"
                onClick={e => e.stopPropagation()}
            >
                <div className="w-full relative flex items-center justify-center mt-6 font-momo text-2xl">
                    <div>
                        Edit your profile
                        <i className="fa-regular fa-id-badge ml-2 text-blue-500"></i>
                    </div>

                    <div
                        className="absolute right-6 text-[red] text-2xl cursor-pointer"
                        onClick={onClose}
                    >
                        <i className="fa-regular fa-circle-xmark"></i>
                    </div>
                </div>


                <div className="flex mt-6">
                    <input 
                        type="file" 
                        accept="image/*"
                        id="avatar"
                        onChange={handleAvatarChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="avatar"
                        className="cursor-pointer w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-full overflow-hidden border border-[4px] border-[#ccc]"
                        title="Edit"
                    >     
                        {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full ">
                                <img
                                    src="/anonymous-avatar.jpg"
                                    alt="Default avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </label>
                </div>

                <div className="w-full px-[40px] md:px-[100px]">
                    <div className="font-bold ml-1 text-lg">
                        Username
                    </div>

                    <div className="mt-4 w-full">
                        <input
                            type="text"
                            className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full px-[40px] md:px-[100px] mt-4">
                    <div className="font-bold ml-1 text-lg">
                        Bio
                    </div>

                    <div className="mt-4 w-full">
                        <input
                            type="text"
                            className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full text-center mt-2">
                    <div
                        className={`h-6 my-2.5 ${log.type == "error" ? "text-[red]" : "text-[green] success-glow"
                            } font-semibold`}
                    >
                        {log.content}
                    </div>

                    <Button
                        backgrond={{ normal: "#8129d9", hover: "#5D18A2 " }}
                        color="#fff"
                        text={loading ? "Saving..." : "Save Changes"}
                        onClick={handleSubmit}
                    />
                </div>

            </div>

        </div>
    )
}