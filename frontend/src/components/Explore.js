import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link, useSearchParams } from "react-router-dom";
import { UserSkeleton, TweetSkeleton } from "./Skeletons.js";
import axios from "axios";
import { USER_API_ENDPOINT, TWEET_API_ENDPOINT } from "../utils/constant";
import Tweet from "./Tweet.js";

function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("people"); // "people" or "tweets"
  const [peopleResults, setPeopleResults] = useState([]);
  const [tweetResults, setTweetResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Sync Input to URL
  useEffect(() => {
    const timer = setTimeout(() => {
        if(query.trim()) {
            setSearchParams({ q: query });
        } else {
            setSearchParams({});
        }
    }, 400);
    return () => clearTimeout(timer);
  }, [query, setSearchParams]);

  // Sync URL to Input manually just in case
  useEffect(() => {
      if(initialQuery !== query) {
          setQuery(initialQuery);
      }
  }, [initialQuery]);

  // Fetch Logic based on URL parameter
  useEffect(() => {
    if (!initialQuery.trim() || initialQuery.length < 2) {
      setPeopleResults([]);
      setTweetResults([]);
      return;
    }

    const fetchSearch = async () => {
      setLoadingSearch(true);
      try {
        if (activeTab === "people") {
          const res = await axios.get(`${USER_API_ENDPOINT}/search?name=${encodeURIComponent(initialQuery)}`, {
            withCredentials: true,
          });
          setPeopleResults(res.data.users || []);
        } else {
          const res = await axios.get(`${TWEET_API_ENDPOINT}/search?keyword=${encodeURIComponent(initialQuery)}`, {
            withCredentials: true,
          });
          setTweetResults(res.data.tweets || []);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoadingSearch(false);
      }
    };
    
    fetchSearch();
  }, [initialQuery, activeTab]);

  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      {/* Header & Search overlaying entire pane */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-4 pt-4 pb-2 border-b border-gray-200">
        <div className="border bg-gray-100 outline-none w-full border-gray-200 p-3 rounded-full flex items-center focus-within:ring-1 focus-within:ring-cyan-500 focus-within:bg-white transition-all transition-colors shadow-sm">
          <div>
            <CiSearch size="22px" className="text-gray-500" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none px-3 w-full text-base"
            placeholder="Search Twitter..."
          />
        </div>
        
        {/* Dynamic Nav Tabs */}
        {initialQuery.length >= 2 && (
            <div className="flex mt-2 mb-[-8px]">
                <button 
                onClick={() => setActiveTab("people")}
                className={`flex-1 py-3 text-sm font-bold transition-all hover:bg-gray-100 relative ${activeTab === 'people' ? 'text-gray-900' : 'text-gray-500'}`}
                >
                  People
                  {activeTab === 'people' && <div className="absolute bottom-0 left-1/2 min-w-[56px] -translate-x-1/2 h-1 bg-cyan-500 rounded-full"></div>}
                </button>
                <button 
                onClick={() => setActiveTab("tweets")}
                className={`flex-1 py-3 text-sm font-bold transition-all hover:bg-gray-100 relative ${activeTab === 'tweets' ? 'text-gray-900' : 'text-gray-500'}`}
                >
                  Tweets
                  {activeTab === 'tweets' && <div className="absolute bottom-0 left-1/2 min-w-[56px] -translate-x-1/2 h-1 bg-cyan-500 rounded-full"></div>}
                </button>
            </div>
        )}
      </div>

      {/* Main Results Mapping Area */}
      <div>
        {initialQuery.length >= 2 ? (
            <div className={`${activeTab === 'tweets' ? '' : 'p-4'}`}>
             {loadingSearch ? (
                activeTab === "people" ? (
                  <div className="flex flex-col gap-2">
                    {Array(4).fill(0).map((_, i) => <UserSkeleton key={`sk_su_${i}`} />)}
                  </div>
                ) : (
                  <div className="flex flex-col grow h-full overflow-hidden mt-6">
                    {Array(5).fill(0).map((_, i) => <div className="border-b border-gray-200" key={i}><TweetSkeleton /></div>)}
                  </div>
                )
             ) : activeTab === "people" ? (
                /* PEOPLE RESULTS */
                peopleResults.length > 0 ? (
                  <div className="flex flex-col border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                    {peopleResults.map((user) => (
                        <div className="flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-100 transition-colors cursor-pointer" key={user._id}>
                        <div className="flex items-center min-w-0">
                            <Avatar src={user.avatarUrl || "https://cdn-icons-png.freepik.com/512/3550/3550439.png"} size="45" round={true} className="shrink-0 drop-shadow-sm" />
                            <div className="ml-3 min-w-0 flex flex-col justify-center">
                            <h1 className="font-bold text-base truncate text-gray-900 leading-tight">{user.name}</h1>
                            <p className="text-sm text-gray-500 truncate leading-tight mt-0.5">@{user.username}</p>
                            </div>
                        </div>
                        <Link to={`/profile/${user._id}`}>
                            <button className="px-5 py-2 bg-black text-white text-sm font-semibold rounded-full transition-colors hover:bg-gray-800 ml-2 shrink-0 shadow-sm">
                            Profile
                            </button>
                        </Link>
                        </div>
                    ))}
                  </div>
                ) : (
                   <div className="text-center py-20 flex flex-col items-center justify-center opacity-70">
                      <p className="text-gray-900 text-xl font-bold mb-2">No users found</p>
                      <p className="text-gray-500 text-base">Try searching for another name or handle.</p>
                   </div>
                )
             ) : (
                /* TWEET RESULTS */
                tweetResults.length > 0 ? (
                  <div className="flex flex-col">
                    {tweetResults.map((tweet) => (
                      <div key={tweet._id} className="border-b border-gray-200 last:border-b-0 w-full overflow-hidden hover:bg-gray-50 transition-colors">
                        <Tweet tweet={tweet} />
                      </div>
                    ))}
                  </div>
                ) : (
                   <div className="text-center py-20 flex flex-col items-center justify-center opacity-70 p-4">
                      <p className="text-gray-900 text-xl font-bold mb-2">No tweets found</p>
                      <p className="text-gray-500 text-base">We couldn't find any tweets matching "{initialQuery}".</p>
                   </div>
                )
             )}
            </div>
        ) : (
            <div className="p-8 py-32 text-center text-gray-500">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Explore Twitter</h1>
                <p className="text-gray-500">Search for latest tweets, people, and topics.</p>
            </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
