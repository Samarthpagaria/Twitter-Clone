import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";

import useGetProfile from "../hooks/useGetProfile.js";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant.js";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice.js";
import { getRefresh } from "../redux/tweetSlice.js";
import EditProfileModal from "./EditProfileModal.js";
import ChangePasswordModal from "./ChangePasswordModal.js";

function Profile() {
  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);
  const dispatch = useDispatch();

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const followAndUnfollowHandler = async () => {
    if (user.following.includes(id)) {
      // unfollow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_ENDPOINT}/unfollow/${id}`, {
          id: user?._id,
        });
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      // follow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_ENDPOINT}/follow/${id}`, {
          id: user?._id,
        });
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="w-[50%] border-l border-r border-gray-300 ">
      <div>
        <div className="flex items-center py-2">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer"
          >
            <IoMdArrowBack size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">Post Content</p>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://i.pinimg.com/736x/3a/6c/45/3a6c4593fc421a0496b8f41b6528aaee.jpg"
            alt="banner"
            className="w-full h-40 object-cover"
          />
          <div className="absolute top-24 ml-2 border-4 border-white rounded-full">
            <Avatar
              src="https://cdn-icons-png.freepik.com/512/3550/3550439.png"
              size="120"
              round={true}
            />
          </div>
        </div>
        <div className="text-right m-4 flex justify-end gap-2 mt-12">
          {profile?._id === user?._id ? (
            <>
              <button
                onClick={() => setEditOpen(true)}
                className="px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400 font-semibold transition-all"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setPasswordOpen(true)}
                className="px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400 font-semibold transition-all"
              >
                Change Password
              </button>
            </>
          ) : (
            <button
              onClick={followAndUnfollowHandler}
              className="px-6 py-1 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all"
            >
              {user.following.includes(id) ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div className="m-4">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p className="text-gray-500">{`@${profile?.username}`}</p>
        </div>
        <div className="text-sm m-4 leading-relaxed">
          <p>
            🌍 Tech enthusiast | 💻 Building the web, one line of code at a time
            | 🚀 Lifelong learner, dreaming big and shipping fast!
          </p>
        </div>
      </div>

      <EditProfileModal isOpen={editOpen} onClose={() => setEditOpen(false)} />
      <ChangePasswordModal
        isOpen={passwordOpen}
        onClose={() => setPasswordOpen(false)}
      />
    </div>
  );
}

export default Profile;

