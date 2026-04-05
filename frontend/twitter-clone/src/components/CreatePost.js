import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { TWEET_API_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh, getIsActive } from "../redux/tweetSlice";
import { FaImage, FaVideo, FaTimes } from "react-icons/fa";

function CreatePost() {
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const [description, setDescription] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
  const [mediaPreview, setMediaPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    if (!description && !mediaFile) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("description", description);
      formData.append("id", user?._id);
      
      if (mediaFile) {
        formData.append(mediaType, mediaFile);
      }

      const res = await axios.post(
        `${TWEET_API_ENDPOINT}/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
        setDescription("");
        setMediaFile(null);
        setMediaType(null);
        setMediaPreview(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMediaChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setMediaType(type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaType(null);
    setMediaPreview(null);
  };

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };

  const followingHandler = () => {
    dispatch(getIsActive(false));
  };

  return (
    <div className="w-[100%]">
      <div>
        <div className="flex items-center justify-evenly border-b border-gray-200 dark:border-gray-700">
          <div
            onClick={forYouHandler}
            className={`${
              isActive
                ? "border-b-4 border-red-400"
                : "border-b-4 border-transparent"
            } cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 dark:text-gray-300 text-lg">For you</h1>
          </div>
          <div
            onClick={followingHandler}
            className={`${
              !isActive
                ? "border-b-4 border-red-400"
                : "border-b-4 border-transparent"
            } cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 dark:text-gray-300 text-lg">Following</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center p-4">
            <div>
              <Avatar
                src={user?.avatar || "https://cdn-icons-png.freepik.com/512/3550/3550439.png"}
                size="50"
                round={true}
              />
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-transparent outline-none p-2 text-xl ml-4 dark:text-white resize-none min-h-[50px]"
              placeholder="What is happening?!"
              rows={2}
            />
          </div>
          {mediaPreview && (
            <div className="relative px-4 pb-4 ml-14 mr-4">
              <div className="relative w-full max-h-96 flex justify-start items-center bg-gray-50 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <button 
                  onClick={removeMedia}
                  className="absolute top-3 right-3 bg-gray-900 bg-opacity-70 text-white p-2 rounded-full z-20 hover:bg-opacity-90 transition-all active:scale-90"
                >
                  <FaTimes size={14} />
                </button>
                {mediaType === 'image' ? (
                  <img 
                    src={mediaPreview} 
                    alt="Preview" 
                    className="w-full h-full max-h-96 object-contain"
                  />
                ) : (
                  <video 
                    src={mediaPreview} 
                    controls 
                    className="w-full h-full max-h-96 bg-black"
                  />
                )}
              </div>
            </div>
          )}
          <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
            <div className="flex items-center ml-12 gap-4 text-[#1D9BF0]">
              <label className="cursor-pointer hover:bg-blue-50 dark:hover:bg-zinc-800 p-2 rounded-full transition-colors">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleMediaChange(e, 'image')}
                />
                <FaImage size={20} />
              </label>
              <label className="cursor-pointer hover:bg-blue-50 dark:hover:bg-zinc-800 p-2 rounded-full transition-colors">
                <input 
                  type="file" 
                  accept="video/*" 
                  className="hidden" 
                  onChange={(e) => handleMediaChange(e, 'video')}
                />
                <FaVideo size={20} />
              </label>
            </div>
            <button
              disabled={isLoading || (!description && !mediaFile)}
              className={`${(isLoading || (!description && !mediaFile)) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1A8CD8]'} bg-[#1D9BF0] rounded-full px-6 py-2 text-white border-none font-bold transition-colors flex items-center gap-2`}
              onClick={submitHandler}
            >
              {isLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              {isLoading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
