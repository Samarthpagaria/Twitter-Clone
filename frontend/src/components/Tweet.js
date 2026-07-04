import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaRegComment, FaHeart, FaRegHeart, FaBookmark } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getRefresh } from "../redux/tweetSlice";
import { getUser } from "../redux/userSlice";
import { timeSince } from "../utils/constant";
import { TweetSkeleton } from "./Skeletons.js";

const Tweet = ({ tweet, isReply = false }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [loadingReplies, setLoadingReplies] = useState(false);

  // Optimistic UI states for nested interactions
  const [localLikeCount, setLocalLikeCount] = useState(tweet?.likes?.length || 0);
  const [isLikedLocally, setIsLikedLocally] = useState(tweet?.likes?.includes(user?._id));

  React.useEffect(() => {
    setLocalLikeCount(tweet?.likes?.length || 0);
    setIsLikedLocally(tweet?.likes?.includes(user?._id));
  }, [tweet?.likes, user?._id]);

  const fetchReplies = async () => {
    try {
      setLoadingReplies(true);
      const res = await axios.get(`${TWEET_API_ENDPOINT}/replies/${tweet?._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setReplies(res.data.tweets);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load replies");
    } finally {
      setLoadingReplies(false);
    }
  };

  const toggleReplies = () => {
    if (!showReplies) {
      fetchReplies();
    }
    setShowReplies(!showReplies);
  };
  
  const submitReplyHandler = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    try {
      const res = await axios.post(
        `${TWEET_API_ENDPOINT}/create`,
        { description: replyText, id: user?._id, replyTo: tweet?._id },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setReplyText("");
      fetchReplies(); 
      dispatch(getRefresh());
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post reply");
    }
  };

  const tweetUser = Array.isArray(tweet?.userDetails) 
    ? tweet?.userDetails[0] 
    : tweet?.userDetails || (typeof tweet?.userId === 'object' ? tweet?.userId : null);

  const isBookmarked = user?.bookmarks?.includes(tweet?._id);

  const likeOrDislikeHandler = async (id) => {
    try {
      // Optimistic UI updates
      setIsLikedLocally(!isLikedLocally);
      setLocalLikeCount(prev => isLikedLocally ? prev - 1 : prev + 1);

      const res = await axios.put(
        `${TWEET_API_ENDPOINT}/like/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      // Note: we selectively avoid popping toasts here for raw likes to keep the UI quiet and fast
    } catch (error) {
      // Revert optimism if failed
      setIsLikedLocally(!isLikedLocally);
      setLocalLikeCount(prev => isLikedLocally ? prev + 1 : prev - 1);
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
    <div className={isReply ? "w-full bg-white border border-gray-100 hover:border-gray-200 shadow-sm transition-colors rounded-xl mb-1.5" : "border-b border-gray-200"}>
      <div className={`flex ${isReply ? 'pt-1 pb-0 pl-0 pr-0' : 'p-4'}`}>
        
        {/* LEFT COLUMN: Avatar + Vertical Trunk Line */}
        <div className="flex flex-col items-center mr-3 relative h-auto">
          <Avatar
             src={tweetUser?.avatar || "https://cdn-icons-png.freepik.com/512/3550/3550439.png"}
             size={isReply ? "28" : "40"}
             round={true}
             className="z-10 bg-white"
           />
          {/* Trunk line bridging down to right column's replies */}
          {showReplies && replies.length > 0 && (
            <div className={`w-[2px] bg-gray-200 absolute z-0 ${isReply ? 'top-[32px]' : 'top-[44px]'} bottom-6`}></div>
          )}
        </div>

        {/* RIGHT COLUMN: Content + Interactions + Replies Section */}
        <div className="flex-1 w-full relative">
          <div className="flex items-center">
            <h1 className="font-bold text-sm sm:text-base">{tweetUser?.name || "Unknown"}</h1>
            <p className="text-gray-500 text-xs sm:text-sm ml-1">
              {tweetUser?.username ? `@${tweetUser.username}` : ""} · {timeSince(tweet?.createdAt)}
            </p>
          </div>
          <div>
            <p className="mt-1 text-sm sm:text-base text-gray-900 break-words dark:text-gray-100">{tweet?.description}</p>
          </div>
          {tweet?.media && tweet.media.length > 0 && (
            <div className="mt-3 relative w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-zinc-900">
               {tweet.media.map((item, index) => (
                 <div key={index}>
                   {item.type === 'image' ? (
                     <img 
                       src={item.url} 
                       alt="Tweet content" 
                       className="w-full h-full max-h-[512px] object-contain"
                     />
                   ) : (
                     <video 
                       src={item.url} 
                       controls 
                       className="w-full h-full max-h-[512px] bg-black"
                     />
                   )}
                 </div>
               ))}
            </div>
          )}
          <div className="flex justify-between mt-2 mb-1 max-w-md">
            {/* Comment */}
            <div className="flex items-center">
              <div 
                onClick={toggleReplies}
                className="p-1.5 hover:bg-green-100 rounded-full cursor-pointer transition-colors"
                title="View Threads"
              >
                <FaRegComment size="18px" className="text-gray-500" />
              </div>
              <p className="text-sm text-gray-500 ml-1">{tweet?.commentCount || 0}</p>
            </div>

            {/* Like */}
            <div className="flex items-center">
              <div
                onClick={() => likeOrDislikeHandler(tweet?._id)}
                className="p-1.5 hover:bg-pink-100 rounded-full cursor-pointer transition-all active:scale-75"
              >
                {isLikedLocally ? (
                  <FaHeart size="18px" className="text-pink-600 scale-110 transition-transform" />
                ) : (
                  <FaRegHeart size="18px" className="text-gray-500 hover:text-pink-500 transition-colors" />
                )}
              </div>
              <p className={`text-sm ml-1 select-none transition-colors ${isLikedLocally ? "text-pink-600 font-medium" : "text-gray-500"}`}>
                 {localLikeCount || 0}
              </p>
            </div>

            {/* Bookmark */}
            <div className="flex items-center">
              <div
                onClick={() => bookmarkHandler(tweet?._id)}
                className="p-1.5 hover:bg-yellow-100 rounded-full cursor-pointer transition-colors"
              >
                {isBookmarked ? (
                  <FaBookmark size="16px" className="text-yellow-500" />
                ) : (
                  <CiBookmark size="20px" className="text-gray-500" />
                )}
              </div>
            </div>

            {/* Delete (own tweets only) */}
            {user?._id === (typeof tweet?.userId === 'object' ? tweet?.userId?._id : tweet?.userId) && (
              <div
                onClick={() => deleteTweetHandler(tweet?._id)}
                className="flex items-center"
              >
                <div className="p-1.5 hover:bg-red-100 rounded-full cursor-pointer transition-colors">
                  <MdOutlineDeleteOutline size="20px" className="text-gray-500" />
                </div>
              </div>
            )}
          </div>

          {/* Child Threaded Replies Section inside Right Column */}
          {showReplies && (
            <div className="w-full mt-1 mb-2">
               {/* Input for new reply */}
               <div className="flex items-center gap-2 mb-3 pt-2">
                  <Avatar src={user?.avatar || "https://cdn-icons-png.freepik.com/512/3550/3550439.png"} size="24" round={true} className="z-10 bg-white" />
                  <form onSubmit={submitReplyHandler} className="flex-1 flex bg-gray-50 border border-gray-200 rounded-full overflow-hidden focus-within:ring-1 focus-within:ring-cyan-500 focus-within:bg-white transition-all">
                     <textarea 
                       value={replyText}
                       onChange={(e) => setReplyText(e.target.value)}
                       placeholder="Post your reply..." 
                       className="flex-1 bg-transparent px-4 py-2 outline-none text-sm text-gray-800 dark:text-white resize-none"
                       rows={1}
                     />
                     <button 
                       type="submit" 
                       disabled={!replyText.trim()}
                       className="px-4 text-cyan-500 font-bold text-sm disabled:opacity-50 hover:bg-cyan-50 transition"
                     >
                       Reply
                     </button>
                  </form>
               </div>

               {/* Render existing replies recursively */}
               {loadingReplies ? (
                 <div className="flex flex-col w-full relative pt-2 pl-4">
                   <TweetSkeleton />
                   <TweetSkeleton />
                 </div>
               ) : replies.length > 0 ? (
                 <div className="flex flex-col w-full relative">
                   {replies.map((reply, index) => (
                     <div key={reply._id} className="relative w-full flex mt-0">
                        {/* Curved Line hooks backward into the Trunk Line seamlessly into the center of Avatar */}
                        <div className={`absolute top-0 h-[22px] ${isReply ? 'w-[40px] left-[-26px]' : 'w-[46px] left-[-32px]'} border-l-2 border-b-2 border-gray-200 rounded-bl-xl z-0`}></div> 
                        
                        {/* Continual trunk line for items that aren't the last! */}
                        {index !== replies.length - 1 && (
                           <div className={`absolute top-[22px] bottom-[-16px] w-[2px] bg-gray-200 ${isReply ? 'left-[-26px]' : 'left-[-32px]'} z-0`}></div>
                        )}

                        <div className="flex-1 w-full relative z-10 w-[min-content]">
                          <Tweet tweet={reply} isReply={true} />
                        </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <p className="text-xs text-gray-400 py-2">No replies yet. Start the conversation!</p>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
