import React, { useState } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const { user } = useSelector((store) => store.user);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    try {
      axios.defaults.withCredentials = true;
      const res = await axios.put(
        `${USER_API_ENDPOINT}/update/password/${user?._id}`,
        { 
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword 
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        onClose();
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating password.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">Security Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={submitHandler} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Current Password</label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={changeHandler}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all pr-10"
                placeholder="Verify your identity"
                required
              />
              <div 
                onClick={() => setShowOld(!showOld)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showOld ? <FaRegEyeSlash size="18px" /> : <FaRegEye size="18px" />}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">New Password</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={changeHandler}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all pr-10"
                placeholder="Min. 6 characters"
                required
              />
              <div 
                onClick={() => setShowNew(!showNew)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showNew ? <FaRegEyeSlash size="18px" /> : <FaRegEye size="18px" />}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={changeHandler}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all pr-10"
                placeholder="Re-enter new password"
                required
              />
              <div 
                onClick={() => setShowConfirm(!showConfirm)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirm ? <FaRegEyeSlash size="18px" /> : <FaRegEye size="18px" />}
              </div>
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
              className="px-6 py-2 text-sm font-bold bg-black text-white hover:bg-gray-800 rounded-full transition-all active:scale-95"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};




export default ChangePasswordModal;
