import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getRefresh } from "../redux/tweetSlice";
import { getUser } from "../redux/userSlice";
import { timeSince } from "../utils/constant";

const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const tweetUser = Array.isArray(tweet?.userDetails) 
    ? tweet?.userDetails[0] 
    : tweet?.userDetails || (typeof tweet?.userId === 'object' ? tweet?.userId : null);

  const isBookmarked = user?.bookmarks?.includes(tweet?._id);

  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_ENDPOINT}/like/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error liking tweet");
    }
  };

  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_ENDPOINT}/delete/${id}`);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting tweet");
    }
  };

  const bookmarkHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_ENDPOINT}/bookmark/${id}`,
        {},
        { withCredentials: true }
      );
      // Optimistically update the user's bookmarks list in Redux
      const updatedBookmarks = res.data.bookmarked
        ? [...(user.bookmarks || []), id]
        : (user.bookmarks || []).filter((bId) => bId !== id);
      dispatch(getUser({ ...user, bookmarks: updatedBookmarks }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating bookmark");
    }
  };

  return (
    <div className="border-b border-gray-200">
      <div className="flex p-4">
        <Avatar
          src="https://cdn-icons-png.freepik.com/512/3550/3550439.png"
          size="40"
          round={true}
        />
        <div className="ml-2 w-full">
          <div className="flex items-center">
            <h1 className="font-bold">{tweetUser?.name || "Unknown"}</h1>
            <p className="text-gray-500 text-sm ml-1">
              {tweetUser?.username ? `@${tweetUser.username}` : ""} · {timeSince(tweet?.createdAt)}
            </p>
          </div>
          <div>
            <p className="mt-1">{tweet?.description}</p>
          </div>
          <div className="flex justify-between my-3">
            {/* Comment */}
            <div className="flex items-center">
              <div className="p-2 hover:bg-green-100 rounded-full cursor-pointer transition-colors">
                <FaRegComment size="18px" className="text-gray-500" />
              </div>
              <p className="text-sm text-gray-500">0</p>
            </div>

            {/* Like */}
            <div className="flex items-center">
              <div
                onClick={() => likeOrDislikeHandler(tweet?._id)}
                className="p-2 hover:bg-pink-100 rounded-full cursor-pointer transition-colors"
              >
                <CiHeart
                  size="22px"
                  className={
                    tweet?.like?.includes(user?._id)
                      ? "text-pink-500"
                      : "text-gray-500"
                  }
                />
              </div>
              <p className="text-sm text-gray-500">{tweet?.like?.length || 0}</p>
            </div>

            {/* Bookmark */}
            <div className="flex items-center">
              <div
                onClick={() => bookmarkHandler(tweet?._id)}
                className="p-2 hover:bg-yellow-100 rounded-full cursor-pointer transition-colors"
              >
                {isBookmarked ? (
                  <FaBookmark size="18px" className="text-yellow-500" />
                ) : (
                  <CiBookmark size="22px" className="text-gray-500" />
                )}
              </div>
            </div>

            {/* Delete (own tweets only) */}
            {user?._id === (typeof tweet?.userId === 'object' ? tweet?.userId?._id : tweet?.userId) && (
              <div
                onClick={() => deleteTweetHandler(tweet?._id)}
                className="flex items-center"
              >
                <div className="p-2 hover:bg-red-100 rounded-full cursor-pointer transition-colors">
                  <MdOutlineDeleteOutline size="22px" className="text-gray-500" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
