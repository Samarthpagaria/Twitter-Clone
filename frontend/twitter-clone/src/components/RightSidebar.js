import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { UserSkeleton } from "./Skeletons.js";
import { motion } from "framer-motion";

function RightSidebar({ otherUsers }) {
  const users = otherUsers || [];
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e) => {
      e.preventDefault();
      if(query.trim()) {
          navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
      }
  };

  return (
    <div className="w-[25%] py-2 sticky top-0 h-screen overflow-y-auto hidden-scrollbar pl-4">
      {/* Search Bar Redirect */}
      <motion.form 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submitSearch} 
        className="bg-gray-100 dark:bg-zinc-800 outline-none w-[90%] border border-transparent dark:border-zinc-700 p-2.5 rounded-full flex items-center mb-2 focus-within:border-[#1D9BF0] focus-within:bg-white dark:focus-within:bg-black transition-all z-10 sticky top-2 shadow-sm"
      >
        <button type="submit" className="p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-full transition-colors cursor-pointer text-gray-500 dark:text-gray-400">
          <CiSearch size="22px" />
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none px-3 w-full text-[15px] dark:text-white"
          placeholder="Search"
        />
      </motion.form>

      {/* DEFAULT "WHO TO FOLLOW" SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-[90%] p-4 bg-[#F7F9F9] dark:bg-zinc-900 border border-transparent dark:border-zinc-800 rounded-2xl my-3 mt-4"
      >
        <h1 className="font-black text-[20px] mb-4 text-gray-900 dark:text-gray-100">Who to follow</h1>

        {!otherUsers ? (
          Array(4).fill(0).map((_, i) => <UserSkeleton key={`skeleton-${i}`} />)
        ) : users.length > 0 ? (
          <motion.div 
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
          >
            {users.map((user) => (
              <motion.div
                variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                className="flex items-center justify-between my-3 p-2 -mx-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer"
                key={user.id || user._id}
              >
                <div className="flex items-center min-w-0">
                  <div>
                    <Avatar
                      src={
                        user.avatarUrl ||
                        "https://cdn-icons-png.freepik.com/512/3550/3550439.png"
                      }
                      size="40"
                      round={true}
                    />
                  </div>
                  <div className="ml-3 min-w-0 flex flex-col">
                    <h1 className="font-bold text-[15px] truncate text-gray-900 dark:text-white leading-tight hover:underline">{user?.name}</h1>
                    <p className="text-[14px] text-gray-500 truncate mt-0.5">@{user?.username}</p>
                  </div>
                </div>
                <Link to={`/profile/${user?._id}`}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-[14px] font-bold rounded-full transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 ml-2 shadow-sm"
                  >
                    Follow
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500 text-[15px] text-center py-4">No suggestions available</p>
        )}
      </motion.div>
    </div>
  );
}

export default RightSidebar;
