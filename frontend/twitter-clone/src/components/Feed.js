import React from "react";
import CreatePost from "./CreatePost.js";
import Tweet from "./Tweet.js";
import { useSelector } from "react-redux";
import { TweetSkeleton } from "./Skeletons.js";

const Feed = () => {
  const { tweets } = useSelector((store) => store.tweet);
  return (
    <div className="w-[50%] border border-gray-200">
      <div>
        <CreatePost />
        {!tweets ? (
          Array(5).fill(0).map((_, i) => <TweetSkeleton key={`skeleton-${i}`} />)
        ) : (
          tweets?.map((tweet) => (
            <Tweet key={tweet?._id} tweet={tweet} />
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
