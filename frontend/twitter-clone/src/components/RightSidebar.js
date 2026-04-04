import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { UserSkeleton } from "./Skeletons.js";

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
    <div className="w-[25%] py-2">
      {/* Search Bar Redirect */}
      <form onSubmit={submitSearch} className="border bg-gray-100 outline-none w-full border-gray-200 p-2 rounded-full flex items-center mb-2 focus-within:ring-1 focus-within:ring-cyan-500 focus-within:bg-white transition-all transition-colors z-10 sticky top-2">
        <button type="submit" className="p-1 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
          <CiSearch size="22px" className="text-gray-500" />
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none px-2 w-full text-sm"
          placeholder="Search Twitter..."
        />
      </form>

      {/* DEFAULT "WHO TO FOLLOW" SECTION */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl my-3">
        <h1 className="font-bold text-lg mb-3 text-gray-900">Who to follow</h1>

        {!otherUsers ? (
          Array(4).fill(0).map((_, i) => <UserSkeleton key={`skeleton-${i}`} />)
        ) : users.length > 0 ? (
          users.map((user) => (
            <div
              className="flex items-center justify-between my-3 p-1 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              key={user.id || user._id}
            >
              <div className="flex items-center min-w-0">
                <div>
                  <Avatar
                    src={
                      user.avatarUrl ||
                      "https://cdn-icons-png.freepik.com/512/3550/3550439.png"
                    }
                    size="45"
                    round={true}
                  />
                </div>
                <div className="ml-2 min-w-0 flex flex-col">
                  <h1 className="font-bold text-sm truncate text-gray-900">{user?.name}</h1>
                  <p className="text-xs text-gray-500 truncate mt-0.5">@{user?.username}</p>
                </div>
              </div>
              <Link to={`/profile/${user?._id}`}>
                <button className="px-4 py-1.5 bg-black text-white text-xs font-semibold rounded-full transition-colors hover:bg-gray-800 ml-1 shadow-sm">
                  Profile
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">No suggestions available</p>
        )}
      </div>
    </div>
  );
}

export default RightSidebar;
