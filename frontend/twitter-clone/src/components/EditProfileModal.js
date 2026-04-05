import React, { useState } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getMyProfile } from "../redux/userSlice";

const EditProfileModal = ({ isOpen, onClose }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    try {
      setIsLoading(true);
      const form = new FormData();
      form.append("name", formData.name);
      form.append("username", formData.username);
      form.append("email", formData.email);
      form.append("bio", formData.bio);
      if (avatar) {
        form.append("avatar", avatar);
      }

      axios.defaults.withCredentials = true;
      const res = await axios.put(
        `${USER_API_ENDPOINT}/update/myprofile/${user?._id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(getUser(res.data.user));
        dispatch(getMyProfile(res.data.user));
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">Edit Profile</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={submitHandler} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={changeHandler}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                placeholder="Display Name"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={changeHandler}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                placeholder="@username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={changeHandler}
              maxLength="160"
              rows="3"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Profile Picture</label>
            <div className="flex items-center gap-4">
              <img 
                src={avatarPreview || "https://cdn-icons-png.freepik.com/512/3550/3550439.png"} 
                alt="Avatar" 
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-50 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 text-sm font-bold bg-black text-white hover:bg-gray-800 rounded-full transition-all active:scale-95 flex items-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default EditProfileModal;
