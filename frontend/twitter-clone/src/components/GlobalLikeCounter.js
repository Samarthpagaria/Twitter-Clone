import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

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
    
    // Trigger animation frame
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
    <div className="fixed top-6 right-6 z-50 flex items-center bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg border border-gray-100 dark:border-gray-800 rounded-full px-4 py-2 hover:scale-105 transition-transform cursor-pointer" onClick={handleLike}>
      <div className={`text-rose-500 flex items-center justify-center mr-2 ${isAnimating ? 'animate-ping' : ''}`}>
        <FaHeart size="22px" className={`${isAnimating ? 'scale-125' : 'scale-100'} transition-transform duration-100`} />
      </div>
      <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider leading-none">Project Likes</span>
          <span className="text-lg font-black text-gray-900 dark:text-white leading-none">{likes.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default GlobalLikeCounter;
