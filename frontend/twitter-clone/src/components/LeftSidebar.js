import React from "react";
import twitterLogo from "../assets/twitterLogo.png";
import { IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { LiaSlackHash } from "react-icons/lia";
// import boldTwitter from "../assets/image3.png";
import { GoHomeFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";

function LeftSidebar() {
  const { user, profile } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      axios.default.withCredentials = true;
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`);
      toast.success(res.data.message);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);

      console.log(error.message);
    }
  };
  return (
    <div className="w-[20%]">
      <div>
        <img
          className="ml-2"
          width={"60px"}
          src={twitterLogo}
          alt="twitter-logo"
        />
      </div>

      {/*Home */}

      <Link to="/" className="my-4">
        <div className="flex items-center  my-2 rounded-full px-4 py-2   hover:bg-gray-300  hover:cursor-pointer hover:scale-105 ">
          <div>
            <GoHomeFill size="24px" />
          </div>
          <h1 className="font-bold text-lg ml-4">Home </h1>
        </div>
      </Link>

      {/*Explore */}

      <div className="my-4">
        <div className="flex items-center  my-2 rounded-full px-4 py-2   hover:bg-gray-300  hover:cursor-pointer hover:scale-105">
          <div>
            <LiaSlackHash size="24px" />
          </div>
          <h1 className="font-bold text-lg ml-4">Explore </h1>
        </div>
      </div>

      {/* Notifications*/}

      <div className="my-4">
        <div className="flex items-center  my-2 rounded-full px-4 py-2   hover:bg-gray-300  hover:cursor-pointer hover:scale-105">
          <div>
            <IoMdNotifications size="24px" />
          </div>
          <h1 className="font-bold text-lg ml-4">Notifications </h1>
        </div>
      </div>

      {/* Profile */}

      <Link to={`/profile/${user?._id}`} className="my-4">
        <div className="flex items-center  my-2 rounded-full px-4 py-2   hover:bg-gray-300  hover:cursor-pointer hover:scale-105">
          <div>
            <FaUser size="24px" />
          </div>
          <h1 className="font-bold text-lg ml-4">Profile</h1>
        </div>
      </Link>

      {/* Bookmarks */}

      <div className="my-4">
        <div className="flex items-center  my-2 rounded-full px-4 py-2   hover:bg-gray-300  hover:cursor-pointer hover:scale-105">
          <div>
            <FaBookmark size="24px" />
          </div>
          <h1 className="font-bold text-lg ml-4">Bookmarks</h1>
        </div>
      </div>

      {/* Logout */}

      <div className="my-4">
        <div
          onClick={logoutHandler}
          className="flex items-center  my-2 rounded-full px-4 py-2   hover:bg-gray-300  hover:cursor-pointer hover:scale-105"
        >
          <div>
            <IoLogOut size="24px" />
          </div>
          <h1 className="font-bold text-lg ml-4">Logout</h1>
        </div>
      </div>

      {/* Post-Button */}

      <button className="px-4 py-2 border-none text-md bg-[#109BF0] w-full rounded-full text-white font-bold hover:scale-105 ">
        Post
      </button>
    </div>
  );
}

export default LeftSidebar;
