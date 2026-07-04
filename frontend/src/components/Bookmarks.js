import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { FaBookmark, FaRegComment } from "react-icons/fa";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Avatar from "react-avatar";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { USER_API_ENDPOINT, TWEET_API_ENDPOINT, timeSince } from "../utils/constant";
import { getUser } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";
import { TweetSkeleton } from "./Skeletons.js";

const Bookmarks = () => {
  const { user } = useSelector((store) => store.user);
  const { refresh } = useSelector((store) => store.tweet);
  const dispatch = useDispatch();

  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${USER_API_ENDPOINT}/bookmarks/${user?._id}`, {
        withCredentials: true,
      });
      setBookmarks(res.data.bookmarks || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchBookmarks();
  }, [user?._id, refresh]);

  const bookmarkHandler = async (tweetId) => {
    try {
      const res = await axios.put(
        `${TWEET_API_ENDPOINT}/bookmark/${tweetId}`,
        {},
        { withCredentials: true }
      );
      // Update Redux user state
      const updatedBookmarks = res.data.bookmarked
        ? [...(user.bookmarks || []), tweetId]
        : (user.bookmarks || []).filter((bId) => bId !== tweetId);
      dispatch(getUser({ ...user, bookmarks: updatedBookmarks }));
      // Remove from local list instantly
      if (!res.data.bookmarked) {
        setBookmarks((prev) => prev.filter((b) => b._id !== tweetId));
      }
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating bookmark");
    }
  };

  const likeOrDislikeHandler = async (tweetId) => {
    try {
      const res = await axios.put(
        `${TWEET_API_ENDPOINT}/like/${tweetId}`,
        { id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      toast.success(res.data.message);
      fetchBookmarks(); // re-fetch to update like count
    } catch (error) {
      toast.error(error.response?.data?.message || "Error liking tweet");
    }
  };

  const deleteTweetHandler = async (tweetId) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_ENDPOINT}/delete/${tweetId}`);
      setBookmarks((prev) => prev.filter((b) => b._id !== tweetId));
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting tweet");
    }
  };

  return (
    <div className="w-[50%] border-l border-r border-gray-200 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="flex items-center gap-4 px-4 py-3">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <IoMdArrowBack size="22px" />
          </Link>
          <div>
            <h1 className="font-bold text-xl">Bookmarks</h1>
            <p className="text-gray-500 text-sm">@{user?.username}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col w-full">
           {Array(4).fill(0).map((_, i) => <TweetSkeleton key={`sk_bm_${i}`} />)}
        </div>
      ) : bookmarks.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
            <FaBookmark size="36px" className="text-blue-400" />
          </div>
          <h2 className="font-bold text-2xl text-gray-900 mb-2">
            Save posts for later
          </h2>
          <p className="text-gray-500 text-base leading-relaxed max-w-xs">
            When you bookmark a post, it'll show up here so you can easily find
            it again.
          </p>
        </div>
      ) : (
        /* Bookmark List */
        <div>
          {bookmarks.map((tweet) => {
            const authorName =
              tweet?.userId?.name || tweet?.userDetails?.[0]?.name || "Unknown";
            const authorUsername =
              tweet?.userId?.username ||
              tweet?.userDetails?.[0]?.username ||
              "unknown";
            const isLiked = tweet?.like?.includes(user?._id);
            const isBookmarked = user?.bookmarks?.includes(tweet?._id);

            return (
              <div
                key={tweet._id}
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex p-4 gap-3">
                  <Avatar
                    src="https://cdn-icons-png.freepik.com/512/3550/3550439.png"
                    size="44"
                    round={true}
                  />
                  <div className="flex-1 min-w-0">
                    {/* Author Info */}
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="font-bold text-gray-900 truncate">
                        {authorName}
                      </span>
                      <span className="text-gray-500 text-sm truncate">
                        @{authorUsername} · {timeSince(tweet?.createdAt)}
                      </span>
                    </div>

                    {/* Tweet Body */}
                    <p className="mt-1 text-gray-800 leading-snug">
                      {tweet?.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-3 max-w-xs">
                      {/* Comment */}
                      <div className="flex items-center gap-1 group cursor-pointer">
                        <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                          <FaRegComment size="16px" className="text-gray-400 group-hover:text-blue-500" />
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-blue-500">0</span>
                      </div>

                      {/* Like */}
                      <div
                        onClick={() => likeOrDislikeHandler(tweet._id)}
                        className="flex items-center gap-1 group cursor-pointer"
                      >
                        <div className="p-2 rounded-full group-hover:bg-pink-50 transition-colors">
                          <CiHeart
                            size="20px"
                            className={isLiked ? "text-pink-500" : "text-gray-400 group-hover:text-pink-500"}
                          />
                        </div>
                        <span className={`text-sm ${isLiked ? "text-pink-500" : "text-gray-400 group-hover:text-pink-500"}`}>
                          {tweet?.like?.length || 0}
                        </span>
                      </div>

                      {/* Remove Bookmark */}
                      <div
                        onClick={() => bookmarkHandler(tweet._id)}
                        className="group cursor-pointer"
                        title="Remove bookmark"
                      >
                        <div className="p-2 rounded-full group-hover:bg-yellow-50 transition-colors">
                          {isBookmarked ? (
                            <FaBookmark size="16px" className="text-yellow-500" />
                          ) : (
                            <CiBookmark size="20px" className="text-gray-400 group-hover:text-yellow-500" />
                          )}
                        </div>
                      </div>

                      {/* Delete (own tweets) */}
                      {user?._id === tweet?.userId?._id && (
                        <div
                          onClick={() => deleteTweetHandler(tweet._id)}
                          className="group cursor-pointer"
                          title="Delete tweet"
                        >
                          <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                            <MdOutlineDeleteOutline
                              size="20px"
                              className="text-gray-400 group-hover:text-red-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
