import React, { useEffect } from "react";
import LeftSidebar from "../components/LeftSidebar.js";
import RightSidebar from "../components/RightSidebar.js";
import { Outlet, useNavigate } from "react-router-dom";
import useOtherUsers from "../hooks/useOtherUsers.js";
import { useSelector } from "react-redux";
import useGetMyTweets from "../hooks/useGetMyTweets.js";
import GlobalLikeCounter from "./GlobalLikeCounter.js";
import useGetMyTweets from "../hooks/useGetMyTweets.js";

function Home() {
  const { user, otherUsers } = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  //custom hook
  useOtherUsers(user?._id);
  useGetMyTweets(user?._id);

  return (
    <div className="flex justify-between w-full max-w-7xl mx-auto px-4 relative">
      <GlobalLikeCounter />
      <LeftSidebar />
      <Outlet />
      <RightSidebar otherUsers={otherUsers} />
    </div>
  );
}

export default Home;
