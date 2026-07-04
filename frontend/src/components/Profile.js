import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import useGetProfile from "../hooks/useGetProfile.js";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant.js";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice.js";
import { getRefresh } from "../redux/tweetSlice.js";
import EditProfileModal from "./EditProfileModal.js";
import ChangePasswordModal from "./ChangePasswordModal.js";
import Tweet from "./Tweet.js";
import { TWEET_API_ENDPOINT } from "../utils/constant.js";
import { useEffect } from "react";
import { TweetSkeleton } from "./Skeletons.js";

function Profile() {
  const { user, profile } = useSelector((store) => store.user);
  const { refresh } = useSelector((store) => store.tweet);
  const { id } = useParams();
  useGetProfile(id);
  const dispatch = useDispatch();

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [profileTweets, setProfileTweets] = useState(null);

  useEffect(() => {
    const fetchProfileTweets = async () => {
      try {
        const res = await axios.get(`${TWEET_API_ENDPOINT}/profiletweets/${id}`, {
          withCredentials: true,
        });
        setProfileTweets(res.data.tweets);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchProfileTweets();
    }
  }, [id, refresh]);

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
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-[50%] border-l border-r border-gray-300 "
    >
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
        <div className="text-sm m-4 leading-relaxed dark:text-gray-300 whitespace-pre-wrap">
          {profile?.bio ? (
            <p>{profile.bio}</p>
          ) : (
            <p className="opacity-50 italic">No bio written yet.</p>
          )}
        </div>
      </div>
      <div className="border-t border-gray-200 mt-4">
        {!profileTweets ? (
          Array(4).fill(0).map((_, i) => <TweetSkeleton key={`skeleton-${i}`} />)
        ) : profileTweets.length > 0 ? (
          profileTweets.map((tweet) => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))
        ) : (
          <p className="text-gray-500 text-center m-4 py-8">No tweets yet.</p>
        )}
      </div>

      <EditProfileModal isOpen={editOpen} onClose={() => setEditOpen(false)} />
      <ChangePasswordModal
        isOpen={passwordOpen}
        onClose={() => setPasswordOpen(false)}
      />
    </motion.div>
  );
}

export default Profile;

