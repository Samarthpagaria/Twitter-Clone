import React from "react";
import twitterLogo from "../assets/twitterLogo.png";
import { IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { LiaSlackHash } from "react-icons/lia";
import { GoHomeFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { motion } from "framer-motion";

function LeftSidebar() {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = React.useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    if (isDarkMode) {
        document.documentElement.classList.remove("dark");
        setIsDarkMode(false);
    } else {
        document.documentElement.classList.add("dark");
        setIsDarkMode(true);
    }
  };

  const logoutHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`);
      toast.success(res.data.message);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      console.log(error.message);
    }
  };

  const menuItems = [
    { title: "Home", icon: <GoHomeFill size="28px" />, link: "/" },
    { title: "Explore", icon: <LiaSlackHash size="28px" />, link: "/explore" },
    { title: "Notifications", icon: <IoMdNotifications size="28px" />, isDiv: true },
    { title: "Profile", icon: <FaUser size="26px" />, link: `/profile/${user?._id}` },
    { title: "Bookmarks", icon: <FaBookmark size="26px" />, link: "/bookmarks" },
  ];

  const ItemWrapper = ({ item }) => {
    const content = (
      <motion.div 
        whileHover={{ backgroundColor: isDarkMode ? "rgba(39, 39, 42, 1)" : "rgba(229, 231, 235, 1)" }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center w-fit rounded-full px-5 py-3 cursor-pointer transition-colors"
      >
        <div className="dark:text-white text-black leading-none">{item.icon}</div>
        <h1 className="font-bold text-[20px] ml-5 pr-4 dark:text-white text-black leading-none">{item.title}</h1>
      </motion.div>
    );

    if (item.link) {
      return <Link to={item.link} className="block my-1 w-fit">{content}</Link>;
    }
    return <div className="block my-1 w-fit">{content}</div>;
  };

  return (
    <div className="w-[20%] pt-2 sticky top-0 h-screen overflow-y-auto hidden-scrollbar flex flex-col pl-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="mb-4 ml-2 mt-2 w-fit transition-all duration-300 cursor-pointer hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] dark:hover:drop-shadow-[0_4px_12px_rgba(255,255,255,0.3)]"
      >
        <img width={"55px"} src={twitterLogo} alt="twitter-logo" style={{ filter: isDarkMode ? "invert(1)" : "none" }} />
      </motion.div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
          }
        }}
        className="flex flex-col gap-1 w-full"
      >
        {menuItems.map((item, idx) => (
          <motion.div key={idx} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 }}}>
            <ItemWrapper item={item} />
          </motion.div>
        ))}

        {/* Theme Toggle */}
        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 }}}>
          <div className="block my-1 w-fit">
            <motion.div
              onClick={toggleTheme}
              whileHover={{ backgroundColor: isDarkMode ? "rgba(39, 39, 42, 1)" : "rgba(229, 231, 235, 1)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center rounded-full px-5 py-3 cursor-pointer transition-colors w-fit"
            >
              <div className="leading-none">
                {isDarkMode ? <MdOutlineLightMode size="28px" className="text-yellow-400" /> : <MdOutlineDarkMode size="28px" className="text-gray-700" />}
              </div>
              <h1 className="font-bold text-[20px] ml-5 pr-4 dark:text-white text-black leading-none">{isDarkMode ? "Light Mode" : "Dark Mode"}</h1>
            </motion.div>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 }}}>
          <div className="block my-1 w-fit">
            <motion.div
              onClick={logoutHandler}
              whileHover={{ backgroundColor: isDarkMode ? "rgba(220, 38, 38, 0.15)" : "rgba(254, 226, 226, 1)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center rounded-full px-5 py-3 cursor-pointer transition-colors text-red-500 w-fit"
            >
              <div className="leading-none">
                <IoLogOut size="28px" />
              </div>
              <h1 className="font-bold text-[20px] ml-5 pr-4 leading-none">Logout</h1>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* User Profile Section at Bottom */}
      {user && (
        <div className="mt-auto mb-4 mr-4">
          <motion.div 
            whileHover={{ backgroundColor: isDarkMode ? "rgba(39, 39, 42, 1)" : "rgba(229, 231, 235, 1)" }}
            className="flex items-center gap-3 p-3 rounded-full cursor-pointer transition-colors"
            onClick={() => navigate(`/profile/${user?._id}`)}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0">
              <img 
                src={user?.avatar || "https://cdn-icons-png.freepik.com/512/3550/3550439.png"} 
                alt="user avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden xl:block overflow-hidden">
              <h2 className="font-bold text-black dark:text-white truncate">{user?.name}</h2>
              <p className="text-gray-500 text-sm truncate">@{user?.username}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default LeftSidebar;
