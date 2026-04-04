import React from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { UserSkeleton } from "./Skeletons.js";

function RightSidebar({ otherUsers }) {
  // Ensure `otherUsers` is an array
  const users = otherUsers || [];

  return (
    <div className="w-[25%] py-2">
      {/* Search Bar */}
      <div className="border bg-gray-100 outline-none w-full border-gray-200 p-2 rounded-full flex items-center">
        <div>
          <CiSearch size="24px" />
        </div>
        <input
          type="text"
          className="bg-transparent outline-none px-2"
          placeholder="Search"
        />
      </div>

      {/* "Who to Follow" Section */}
      <div className="p-4 bg-gray-100 rounded-2xl my-4">
        <h1 className="font-bold text-lg">Who to follow</h1>

        {!otherUsers ? (
          Array(4).fill(0).map((_, i) => <UserSkeleton key={`skeleton-${i}`} />)
        ) : users.length > 0 ? (
          users.map((user) => (
            <div
              className="flex items-center justify-between my-3"
              key={user.id || user._id}
            >
              <div className="flex">
                <div>
                  <Avatar
                    src={
                      user.avatarUrl ||
                      "https://cdn-icons-png.freepik.com/512/3550/3550439.png"
                    }
                    size="50"
                    round={true}
                  />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold">{user?.name}</h1>
                  <p className="text-sm">@{user?.username}</p>
                </div>
              </div>
              <div>
                <Link to={`/profile/${user?._id}`}>
                  <button className="px-4 py-1 bg-black text-white rounded-full transition-colors hover:bg-gray-800">
                    Profile
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No suggestions available</p>
        )}
      </div>
    </div>
  );
}

export default RightSidebar;
