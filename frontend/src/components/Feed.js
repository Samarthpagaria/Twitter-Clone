import React from "react";
import CreatePost from "./CreatePost.js";
import Tweet from "./Tweet.js";
import { useSelector } from "react-redux";
import { TweetSkeleton } from "./Skeletons.js";
import { motion, AnimatePresence } from "framer-motion";

const Feed = () => {
  const { tweets } = useSelector((store) => store.tweet);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="w-[50%] border-l border-r border-gray-200 dark:border-zinc-800 h-fit min-h-screen"
    >
      <div>
        <CreatePost />
        <AnimatePresence>
          {!tweets ? (
            Array(5).fill(0).map((_, i) => <TweetSkeleton key={`skeleton-${i}`} />)
          ) : (
            tweets?.map((tweet, idx) => (
              <motion.div
                key={tweet?._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Tweet tweet={tweet} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Feed;
