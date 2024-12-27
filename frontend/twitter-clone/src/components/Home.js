import React, { useEffect } from "react";
import LeftSidebar from "../components/LeftSidebar.js";
import RightSidebar from "../components/RightSidebar.js";
import Feed from "../components/Feed.js";
import { Outlet, useNavigate } from "react-router-dom";
import store from "../redux/store.js";
import useOtherUsers from "../hooks/useOtherUsers.js";
import { useSelector } from "react-redux";
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
    <div className="flex justify-between w-[80%] mx-auto">
      <LeftSidebar />
      <Outlet />
      <RightSidebar otherUsers={otherUsers} />
    </div>
  );
}

export default Home;
