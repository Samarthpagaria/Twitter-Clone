import React, { useState, useEffect } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import GlobalLikeCounter from "./GlobalLikeCounter";

const Docs = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Background pattern for side panels
  const patternStyle = {
    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)'} 10px, ${isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)'} 20px)`
  };

  const HoverCard = ({ title, desc, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <div 
        className="relative p-6 border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 overflow-hidden cursor-default transition-all duration-300 h-32"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`transition-opacity duration-300 absolute inset-0 p-6 flex flex-col justify-center ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-0 mt-0">{title}</h3>
          <p className="text-sm text-gray-500 mt-2 mb-0">Hover to view</p>
        </div>
        
        <div className={`absolute inset-0 p-6 flex flex-col justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 mt-0">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">{desc}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50 dark:bg-[#09090b] transition-colors duration-300">
      
      {/* Left Panel */}
      <div className="hidden lg:block w-[15%] h-screen sticky top-0" style={patternStyle}></div>

      {/* Center Panel (Content) */}
      <div className="w-full lg:w-[70%] max-w-4xl mx-auto px-6 py-12 lg:px-12 bg-white dark:bg-[#09090b] shadow-2xl dark:shadow-none border-x border-gray-100 dark:border-zinc-800/50">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between mb-12">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black dark:hover:text-white transition-colors">
            <FaArrowLeft /> Back to App
          </Link>
          <div className="text-right">
            <span className="text-xs font-mono bg-gray-100 dark:bg-zinc-800 text-gray-500 px-2 py-1 rounded-md">v1.0.0</span>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100 dark:prose-h2:border-zinc-800/50 prose-a:text-blue-500">
          
          <div className="mb-16">
            <h1 className="mb-2 text-gray-900 dark:text-gray-100">Technical Specs</h1>
            <p className="text-2xl text-gray-500 font-light m-0">TwitterClone</p>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Full technical and architectural documentation of the TwitterClone microblogging ecosystem.</p>
          </div>

          <h2>1. Project Overview</h2>
          <p>TwitterClone is a full-stack microblogging platform built on the MERN stack, designed to replicate the core social interaction loop of Twitter/X — real-time posting, following, and engagement — with a modern, highly responsive interface.</p>
          <p>The platform focuses on instant feedback and social connectivity, combining media-rich tweets, threaded replies, and personalized feeds into a single unified experience.</p>
          
          <h3>Purpose</h3>
          <p>TwitterClone aims to demonstrate a production-grade social platform architecture, giving users a familiar space to share thoughts, media, and engage in real-time conversations with people they follow.</p>

          <h3>Core Functionalities</h3>
          <ul>
            <li>User registration, authentication, and profile management (avatar uploads, bio updates)</li>
            <li>Tweet creation, deletion, and threaded replies with image/video media support</li>
            <li>Optimistic-UI liking and bookmarking for instant feedback</li>
            <li>Follow / unfollow system with dynamic follower-following graphs</li>
            <li>Personalized feeds — Global Feed and Following-only Feed</li>
            <li>Dynamic, debounced user search</li>
            <li>Persistent, site-wide interactive like counter</li>
          </ul>

          <h3>Target Users</h3>
          <ul>
            <li>Everyday users looking for a fast, familiar microblogging experience</li>
            <li>Communities that want real-time text + media sharing</li>
            <li>Developers/recruiters evaluating a full MERN social app architecture</li>
          </ul>

          <h3>Value Proposition</h3>
          <p>TwitterClone delivers a snappy, optimistic-UI-driven social experience with secure cookie-based auth, cloud media delivery, and persistent client-side state — built entirely on a modern, scalable MERN stack.</p>

          <h2>2. Tech Stack</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div>
              <h3>Frontend Architecture</h3>
              <table className="min-w-full text-sm mt-4 border-collapse">
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-zinc-800/50"><td className="py-2 font-semibold text-gray-900 dark:text-gray-100">Framework</td><td className="py-2 text-gray-600 dark:text-gray-400">React 18.3</td></tr>
                  <tr className="border-b border-gray-100 dark:border-zinc-800/50"><td className="py-2 font-semibold text-gray-900 dark:text-gray-100">Build Tool</td><td className="py-2 text-gray-600 dark:text-gray-400">Create React App (react-scripts 5)</td></tr>
                  <tr className="border-b border-gray-100 dark:border-zinc-800/50"><td className="py-2 font-semibold text-gray-900 dark:text-gray-100">Styling</td><td className="py-2 text-gray-600 dark:text-gray-400">Tailwind CSS 3.4</td></tr>
                  <tr className="border-b border-gray-100 dark:border-zinc-800/50"><td className="py-2 font-semibold text-gray-900 dark:text-gray-100">State Mgmt</td><td className="py-2 text-gray-600 dark:text-gray-400">Redux Toolkit + redux-persist</td></tr>
                  <tr className="border-b border-gray-100 dark:border-zinc-800/50"><td className="py-2 font-semibold text-gray-900 dark:text-gray-100">Data Fetching</td><td className="py-2 text-gray-600 dark:text-gray-400">Axios</td></tr>
                  <tr className="border-b border-gray-100 dark:border-zinc-800/50"><td className="py-2 font-semibold text-gray-900 dark:text-gray-100">Routing</td><td className="py-2 text-gray-600 dark:text-gray-400">React Router DOM v6</td></tr>
                  <tr className="border-b border-gray-100 dark:border-zinc-800/50"><td className="py-2 font-semibold text-gray-900 dark:text-gray-100">UI / Animations</td><td className="py-2 text-gray-600 dark:text-gray-400">Framer Motion, React Hot Toast</td></tr>
                </tbody>
              </table>
            </div>
            
            <div>
              <h3>Backend Architecture</h3>
              <table className="min-w-full text-sm mt-4 border-collapse">
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-zinc-800/50"><td className="py-2 font-semibold text-gray-900 dark:text-gray-100">Runtime</td><td className="py-2 text-gray-600 dark:text-gray-400">Node.js (ES Modules)</td></tr>
                  <tr className="border-b border-gray-100 dark:border-zinc-800/50"><td className="py-2 font-semibold text-gray-900 dark:text-gray-100">Web Framework</td><td className="py-2 text-gray-600 dark:text-gray-400">Express 4</td></tr>
                  <tr className="border-b border-gray-100 dark:border-zinc-800/50"><td className="py-2 font-semibold text-gray-900 dark:text-gray-100">Auth</td><td className="py-2 text-gray-600 dark:text-gray-400">JWT in HTTP-only cookies</td></tr>
                  <tr className="border-b border-gray-100 dark:border-zinc-800/50"><td className="py-2 font-semibold text-gray-900 dark:text-gray-100">Security</td><td className="py-2 text-gray-600 dark:text-gray-400">bcryptjs (12 rounds)</td></tr>
                  <tr className="border-b border-gray-100 dark:border-zinc-800/50"><td className="py-2 font-semibold text-gray-900 dark:text-gray-100">CORS</td><td className="py-2 text-gray-600 dark:text-gray-400">Explicit allowlist + credentials</td></tr>
                  <tr className="border-b border-gray-100 dark:border-zinc-800/50"><td className="py-2 font-semibold text-gray-900 dark:text-gray-100">Media Staging</td><td className="py-2 text-gray-600 dark:text-gray-400">Multer (disk storage temp)</td></tr>
                  <tr className="border-b border-gray-100 dark:border-zinc-800/50"><td className="py-2 font-semibold text-gray-900 dark:text-gray-100">Cloud CDN</td><td className="py-2 text-gray-600 dark:text-gray-400">Cloudinary SDK</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-gray-100 dark:border-zinc-800/50 mb-8">
            <h3 className="mt-0">Database & Infrastructure</h3>
            <div className="flex flex-wrap gap-4 mt-4">
              <span className="px-3 py-1 bg-white dark:bg-zinc-900 text-sm font-semibold rounded border border-gray-200 dark:border-zinc-700">MongoDB Atlas</span>
              <span className="px-3 py-1 bg-white dark:bg-zinc-900 text-sm font-semibold rounded border border-gray-200 dark:border-zinc-700">Mongoose</span>
              <span className="px-3 py-1 bg-white dark:bg-zinc-900 text-sm font-semibold rounded border border-gray-200 dark:border-zinc-700">Vercel (Frontend)</span>
              <span className="px-3 py-1 bg-white dark:bg-zinc-900 text-sm font-semibold rounded border border-gray-200 dark:border-zinc-700">Render (Backend)</span>
            </div>
          </div>

          <h2>3. How It's Made (Architecture & Workflows)</h2>
          
          <h4>Cold-Start & Health Monitoring</h4>
          <p>To mitigate Render's free-tier sleep cycle, a dedicated GET <code>/health</code> endpoint returns live memory usage, uptime, and database connection status — enabling both uptime pings and real observability.</p>

          <h4>Media Upload Pipeline</h4>
          <p>Media (avatars, tweet images/videos) is intercepted by Multer and staged to local disk. A custom <code>uploadOnCloudinary</code> utility then pushes the file to Cloudinary and immediately purges the local copy via <code>fs.unlinkSync</code> — ensuring zero server-side storage bloat.</p>

          <h4>Feed Generation</h4>
          <ul>
            <li><strong>Global Feed:</strong> fetches all tweets, populates author details, sorted newest-first.</li>
            <li><strong>Following Feed:</strong> resolves the current user's <code>following</code> array, then queries tweets authored only by those users, sorted newest-first.</li>
          </ul>

          <h4>Client-Side Persistence</h4>
          <p>State is cached client-side via <code>redux-persist</code>, so auth state and user data survive page refreshes without re-fetching. No backend rate-limiting or queueing is currently implemented.</p>

          <h2>4. Database Structure</h2>
          <p>Hover over each collection card to reveal the structured properties (all password references and sensitive data keys are strictly hidden for complete privacy).</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <HoverCard 
              title="User" 
              desc="Stores identity data, hashed credentials, avatar, bio, and follower/following/bookmark references."
            />
            <HoverCard 
              title="Tweet" 
              desc="Stores tweet content, media attachments, author reference, likes, reply-threading, and comment counts."
            />
            <HoverCard 
              title="SiteScore" 
              desc="Singleton document tracking the global, site-wide interaction/like counter."
            />
          </div>

          <h2>5. Frontend Details</h2>
          <p>The client is a Redux-driven React SPA. Persistent layout architecture wraps all core routes (Home, Profile, Bookmarks, Explore) with a fixed left sidebar for navigation, a dynamic center feed, and a right-hand Explore/Search panel.</p>
          <p>Global state is split into semantic slices (userSlice, tweetSlice), wrapped with redux-persist for session survival across refreshes. Custom hooks (useGetMyTweets, useGetProfile, etc.) abstract Axios calls and dispatch results directly into the store.</p>

          <h2>6. Backend API Routes</h2>
          <p>Below is the comprehensive catalog of secure backend routing endpoints under <code>/api/v1/</code>:</p>

          <h3>Authentication & Users <code>/api/v1/user</code></h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-gray-500 bg-gray-50 dark:bg-zinc-800/50 uppercase">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800/50 w-24">Method</th>
                  <th className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800/50">Endpoint Path</th>
                  <th className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800/50">Operation Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/50">
                <tr><td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">POST</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/register</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Register a new user with avatar upload</td></tr>
                <tr><td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">POST</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/login</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Authenticate user and issue JWT cookie</td></tr>
                <tr><td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">GET</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/logout</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Clear JWT cookie and end session</td></tr>
                <tr><td className="px-4 py-3 font-mono text-orange-600 dark:text-orange-400">PUT</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/update/myprofile/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Update profile details and avatar</td></tr>
                <tr><td className="px-4 py-3 font-mono text-orange-600 dark:text-orange-400">PUT</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/update/password/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Verify old password and set a new one</td></tr>
                <tr><td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">GET</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/profile/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Retrieve a specific user's profile</td></tr>
                <tr><td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">GET</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/otherUser/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">List users excluding the logged-in user</td></tr>
                <tr><td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">POST</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/follow/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Follow a target user</td></tr>
                <tr><td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">POST</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/unfollow/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Unfollow a target user</td></tr>
                <tr><td className="px-4 py-3 font-mono text-orange-600 dark:text-orange-400">PUT</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/bookmark/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Toggle a tweet in bookmarks</td></tr>
                <tr><td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">GET</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/bookmarks/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Retrieve all bookmarked tweets</td></tr>
                <tr><td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">GET</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/search</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Paginated search of users by name/username</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-12">Tweets <code>/api/v1/tweet</code></h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-gray-500 bg-gray-50 dark:bg-zinc-800/50 uppercase">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800/50 w-24">Method</th>
                  <th className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800/50">Endpoint Path</th>
                  <th className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800/50">Operation Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/50">
                <tr><td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">POST</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/create</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Create a tweet or reply, with optional media</td></tr>
                <tr><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">DELETE</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/delete/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Delete a specific tweet</td></tr>
                <tr><td className="px-4 py-3 font-mono text-orange-600 dark:text-orange-400">PUT</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/like/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Toggle like state on a tweet</td></tr>
                <tr><td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">GET</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/alltweets/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Fetch the global feed</td></tr>
                <tr><td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">GET</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/followingtweets/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Fetch the following-only feed</td></tr>
                <tr><td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">GET</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/profiletweets/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Fetch all tweets by a specific user</td></tr>
                <tr><td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">GET</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/replies/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Fetch direct replies to a tweet</td></tr>
                <tr><td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">GET</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/search</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Search tweets by query</td></tr>
                <tr><td className="px-4 py-3 font-mono text-orange-600 dark:text-orange-400">PUT</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/bookmark/:id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Secondary bookmark toggle route</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-12">Site Stats <code>/api/v1/site</code></h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-gray-500 bg-gray-50 dark:bg-zinc-800/50 uppercase">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800/50 w-24">Method</th>
                  <th className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800/50">Endpoint Path</th>
                  <th className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800/50">Operation Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/50">
                <tr><td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">GET</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/score</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Fetch the global site-wide like score</td></tr>
                <tr><td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">POST</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/score/increment</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Increment the global like score by 1</td></tr>
                <tr><td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">GET</td><td className="px-4 py-3 font-mono text-gray-900 dark:text-gray-300">/health</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Health/uptime check with DB + memory status</td></tr>
              </tbody>
            </table>
          </div>

          <h2>7. Backend Details</h2>
          <p>The server runs a versioned REST API pattern with modular controllers and route files. Media staging and credential validation are handled via layered middleware.</p>
          
          <h4>Global Middleware Pipeline</h4>
          <ul className="space-y-2">
            <li><strong>Body Parsers:</strong> <code>express.json</code> / <code>express.urlencoded</code> for payload parsing</li>
            <li><strong>Cookie Parser:</strong> extracts JWTs from incoming cookies</li>
            <li><strong>CORS Filter:</strong> validates request origin against an explicit allowlist, permits credentials</li>
            <li><strong>isAuthenticated Guard:</strong> verifies JWT and injects decoded user ID into <code>req.user</code></li>
            <li><strong>Multer Upload Layer:</strong> intercepts <code>multipart/form-data</code> before controller logic runs</li>
          </ul>

          <h2>8. Deployment Specifics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className="p-6 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-800/50">
              <h4 className="mt-0 text-blue-500">Vercel (Frontend)</h4>
              <ul className="text-sm m-0 space-y-1">
                <li><strong>Project:</strong> twitterclone-sam-io</li>
                <li><strong>Preset:</strong> Create React App</li>
                <li><strong>Build Command:</strong> <code>npm run build</code></li>
                <li><strong>Output Dir:</strong> <code>build/</code></li>
                <li><strong>Env Variable:</strong> <code>REACT_APP_API_BASE_URL</code></li>
              </ul>
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-800/50">
              <h4 className="mt-0 text-purple-500">Render (Backend)</h4>
              <ul className="text-sm m-0 space-y-1">
                <li><strong>Service Type:</strong> Web Service (Node.js)</li>
                <li><strong>Start Command:</strong> <code>node index.js</code></li>
                <li><strong>Port:</strong> 8080 (fallback default)</li>
                <li><strong>Health Check:</strong> <code>/health</code></li>
                <li><strong>Auto Deploy:</strong> via GitHub <code>main</code> branch</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-400 mt-24 pb-12 border-t border-gray-100 dark:border-zinc-800/50 pt-8">
            TwitterClone Ecosystem Documentation &copy; 2026. Minimalist theme configured.
          </div>
          
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:block w-[15%] h-screen sticky top-0 relative" style={patternStyle}>
        {/* Absolute positioned elements for the Docs page (not affected by Login.js positioning) */}
        <div className="absolute top-6 right-6 z-50">
          <GlobalLikeCounter className="flex items-center gap-2 bg-white dark:bg-[#18181b] backdrop-blur-md shadow-sm border border-gray-200 dark:border-zinc-800 rounded-full px-3 py-1.5 cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800" />
        </div>
        <div className="absolute bottom-6 right-6">
          <button 
            onClick={toggleTheme}
            className="p-3 bg-white dark:bg-[#18181b] shadow-sm border border-gray-200 dark:border-zinc-800 rounded-full hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
          >
            {isDarkMode ? <MdOutlineLightMode size="24px" className="text-yellow-400" /> : <MdOutlineDarkMode size="24px" className="text-gray-700" />}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Docs;
