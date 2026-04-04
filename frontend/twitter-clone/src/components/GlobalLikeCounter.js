import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function GlobalLikeCounter() {
  const [likes, setLikes] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Fetch initial score
    axios.get("http://localhost:8080/api/v1/site/score")
      .then(res => {
          if(res.data.success) {
              setLikes(res.data.score);
          }
      }).catch(err => console.log(err));
  }, []);

  const handleLike = async () => {
    // Optimistic UI update
    setLikes(prev => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    try {
      await axios.post("http://localhost:8080/api/v1/site/score/increment");
    } catch (error) {
      // Revert if failed
      setLikes(prev => prev - 1);
    }
  };

  return (
    <motion.button 
      onClick={handleLike}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-white dark:bg-[#18181b] backdrop-blur-md shadow-sm border border-gray-200 dark:border-zinc-800 rounded-full px-3 py-1.5 cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800"
    >
      <div className="relative flex items-center justify-center">
          <FaHeart size="14px" className={`text-rose-500 transition-transform ${isAnimating ? 'scale-125' : ''}`} />
          <AnimatePresence>
            {isAnimating && (
              <motion.div
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute text-rose-500 pointer-events-none"
              >
                <FaHeart size="14px" />
              </motion.div>
            )}
          </AnimatePresence>
      </div>
      
      <span className="text-sm font-semibold leading-none">{likes.toLocaleString()}</span>
    </motion.button>
  );
}

export default GlobalLikeCounter;
