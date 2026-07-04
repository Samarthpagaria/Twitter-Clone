# 🐦 TwitterClone

<div align="center">

**A full-stack microblogging platform featuring real-time social feeds and interactive engagement.**

<br />
<a href="https://twitterclone-sam-io.vercel.app" target="_blank">
  <img src="https://abs.twimg.com/responsive-web/client-web/icon-ios.b1fc727a.png" alt="TwitterClone Logo" width="100" />
</a>
<br />

[![Deployed on Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render)](https://twitter-clone-u2a5.onrender.com)
[![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel)](https://twitterclone-sam-io.vercel.app)
[![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/atlas)
[![Cloudinary](https://img.shields.io/badge/Media-Cloudinary-3448C5?style=flat-square&logo=cloudinary)](https://cloudinary.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-ESM-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)

</div>

---

## 📖 Project Overview

**TwitterClone** is a full-stack social networking application that replicates the core mechanics of Twitter/X. Built entirely on the MERN stack, the platform offers a snappy, optimistic-UI-driven microblogging experience where users can post thoughts, share media, follow creators, and interact in real time.

The platform provides a unified social loop featuring two dynamic feeds: a global timeline for discovery, and a personalized following feed for curated content. 

**Target users:** General social media users, microbloggers, and developers looking for a production-grade MERN architecture that effectively handles relational social graphs and cloud media delivery.

**What makes TwitterClone unique?**
- **Optimistic UI Updates:** Instant visual feedback when liking or bookmarking tweets, making the app feel incredibly fast.
- **Media Support:** Seamless integration with Cloudinary for handling avatar uploads and rich media attachments (images/videos) in tweets.
- **Global Like Counter:** A real-time, site-wide interaction counter that adds a gamified social element to the platform.
- **Dynamic Search & Discovery:** Debounced user search functionality with skip/limit pagination logic.
- **Persistent Client State:** Heavy utilization of `redux-persist` ensures auth tokens and user sessions survive hard refreshes seamlessly.

---

## 🌐 Live Links

| Service | URL |
|---------|-----|
| 🖥️ Frontend (Vercel) | https://twitterclone-sam-io.vercel.app |
| ⚙️ Backend API (Render) | https://twitter-clone-u2a5.onrender.com |
| 📄 In-App API Docs | https://twitterclone-sam-io.vercel.app/docs |

---

## 🛠️ Complete Tech Stack

### Backend (`backend/package.json`)

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | `^4.21.1` | Web framework (ESM) |
| `mongoose` | `^8.8.2` | MongoDB ODM |
| `jsonwebtoken` | `^9.0.2` | JWT access token generation & verification |
| `bcryptjs` | `^2.4.3` | Password hashing (12 salt rounds) |
| `cloudinary` | `^2.9.0` | Cloud media storage (avatars, tweet media) |
| `multer` | `^2.1.1` | Multipart file upload handling (disk storage staging) |
| `cors` | `^2.8.5` | Cross-Origin Resource Sharing |
| `cookie-parser` | `^1.4.7` | HTTP cookie parsing (for HTTP-only JWTs) |
| `dotenv` | `^16.4.5` | Environment variable loading |
| `nodemon` | dev | Dev auto-restart |

**Backend Runtime:** Node.js with **ESM** (`"type": "module"`)

**Key Backend Architecture Notes:**
- Modular routing architecture decoupling controllers from route definitions.
- Custom `isAuthenticated` guard middleware that validates JWTs from cookies and injects the user context.
- Media upload pipeline that intercepts files via Multer, uploads them via the Cloudinary SDK, and immediately cleans up the local storage using `fs.unlinkSync`.

---

### Frontend (`frontend/package.json`)

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | `^18.3.1` | UI library |
| `react-dom` | `^18.3.1` | DOM renderer |
| `react-router-dom` | `^6.28.0` | Client-side routing (`RouterProvider`) |
| `axios` | `^1.7.9` | HTTP client for API calls |
| `@reduxjs/toolkit` | `^2.5.0` | Global state management |
| `react-redux` | `^9.2.0` | React bindings for Redux |
| `redux-persist` | `^6.0.0` | Local storage persistence for Redux store |
| `tailwindcss` | `^3.4.15` | Utility-first CSS |
| `framer-motion` | `^12.38.0` | Animation library (Docs page UI & Like interactions) |
| `react-hot-toast` | `^2.4.1` | Toast notification state |
| `react-icons` | `^5.3.0` | Icon library |
| `react-avatar` | `^5.0.3` | Accessible fallback avatars |
| `react-scripts` | `5.0.1` | Create React App build tool |

---

## 🗂️ Project Structure

```
Twitter-Clone/
├── backend/
│   ├── index.js              # Entry point — DB connection + Express app config
│   ├── config/
│   │   ├── auth.js           # isAuthenticated JWT guard middleware
│   │   └── database.js       # mongoose.connect() utility
│   ├── controllers/
│   │   ├── siteController.js # Global like counter logic
│   │   ├── tweetController.js# Tweet CRUD, feed algorithms, likes, bookmarks
│   │   └── userController.js # Auth, profile, search, follow graphs
│   ├── models/
│   │   ├── SiteScoreSchema.js# Singleton global upvote counter
│   │   ├── tweetSchema.js    # Micro-post schema (content, likes, replies, media)
│   │   └── UserSchema.js     # User schema (credentials, followers, following)
│   ├── multer/
│   │   └── config.js         # Multer disk storage configuration
│   ├── cloudinary/
│   │   └── cloudinaryUpload.js # Cloudinary upload wrapper + fs cleanup
│   ├── routes/
│   │   ├── siteRoute.js
│   │   ├── tweetRoute.js
│   │   └── userRoute.js
│   ├── package.json
│   └── .env                  # (gitignored)
│
├── frontend/
│   ├── src/
│   │   ├── index.js          # React entry point + Router definition
│   │   ├── App.js            # Base component wrapper
│   │   ├── index.css         # Global styles + Tailwind directives
│   │   ├── components/
│   │   │   ├── Home.js       # Layout container (Sidebars + Outlet)
│   │   │   ├── Feed.js       # Main timeline wrapper
│   │   │   ├── Tweet.js      # Individual tweet card
│   │   │   ├── Profile.js    # User profile view
│   │   │   ├── Explore.js    # Search and discovery
│   │   │   ├── Bookmarks.js  # Saved tweets view
│   │   │   ├── Login.js      # Auth screen (Login/Signup toggle)
│   │   │   ├── Docs.js       # Strivo-style In-App documentation page
│   │   │   ├── LeftSidebar.js# Main navigation
│   │   │   ├── RightSidebar.js# Suggested users
│   │   │   └── GlobalLikeCounter.js # Interactive global counter
│   │   ├── hooks/
│   │   │   ├── useGetMyTweets.js # Fetches user/feed tweets to Redux
│   │   │   ├── useGetProfile.js  # Fetches active profile to Redux
│   │   │   └── useOtherUsers.js  # Fetches suggestions to Redux
│   │   ├── redux/
│   │   │   ├── store.js      # RTK store + redux-persist config
│   │   │   ├── tweetSlice.js # Tweet data and refresh triggers
│   │   │   └── userSlice.js  # Auth state, profiles, and follower arrays
│   │   ├── utils/
│   │   │   └── constant.js   # API endpoints and time formatter
│   │   └── assets/           # Static images (logos)
│   └── package.json
│
└── README.md
```

---

## 🗄️ Database Structure

**Database:** MongoDB Atlas via Mongoose.

### User Model (`backend/models/UserSchema.js`)

```javascript
{
  name:      { type: String, required: true },
  username:  { type: String, required: true, unique: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true }, // bcrypt hashed, 12 rounds
  bio:       { type: String, default: "" },
  avatar:    { type: String, required: true }, // Cloudinary URL
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }]
}
// timestamps: true
```

### Tweet Model (`backend/models/tweetSchema.js`)

```javascript
{
  description: { type: String, required: true },
  like:        [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of users who liked
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  images:      { type: [String], default: [] }, // Cloudinary URLs
  videos:      { type: [String], default: [] }, // Cloudinary URLs
  replyTo:     { type: mongoose.Schema.Types.ObjectId, ref: "Tweet", default: null },
  commentCount:{ type: Number, default: 0 }
}
// timestamps: true
```

### SiteScore Model (`backend/models/SiteScoreSchema.js`)

```javascript
{
  score: { type: Number, default: 0 } // Global site upvote counter (single document)
}
```

---

## 🔐 Authentication & Security

### Authentication Flow

**Registration** (`POST /api/v1/user/register`):
1. Validates `name`, `email`, `username`, and `password`.
2. Checks if email is already registered.
3. Uploads `avatar` via Multer → Cloudinary.
4. Hashes the password (bcrypt, 12 rounds).
5. Creates the User document.

**Login** (`POST /api/v1/user/login`):
1. Finds user by `email`.
2. Compares password via `bcrypt.compare`.
3. Generates a JWT (signed with `TOKEN_SECRET`, valid for 1 day).
4. Sets the token in an `httpOnly` cookie (`token`).
5. Returns success payload.

**Logout** (`GET /api/v1/user/logout`):
1. Clears the `token` cookie.

### Auth Middleware (`isAuthenticated`)

Decodes the JWT from `req.cookies.token`. If missing or invalid, throws a 401 error. If valid, attaches the decoded user ID to `req.user`.

### Security Notes

- **Cookie Security:** JWTs are stored in HTTP-only cookies. Cross-origin requests in production are permitted via the explicit CORS configuration allowing credentials.
- **Media Cleanup:** Temporary local files in Multer's staging directory are deleted immediately using `fs.unlinkSync` whether the Cloudinary upload succeeds or fails.
- **No Rate Limiting / Helmet:** Not currently implemented.

---

## 📡 Complete API Reference

**Base URL:** `https://twitter-clone-u2a5.onrender.com`
**API Version Prefix:** `/api/v1`

---

### 🔑 User Routes (`/api/v1/user`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | ❌ | Register new user (multipart: avatar required) |
| `POST` | `/login` | ❌ | Login with email + password |
| `GET` | `/logout` | ❌ | Clear JWT cookie and end session |
| `PUT` | `/update/myprofile/:id` | ✅ | Update profile details and avatar |
| `PUT` | `/update/password/:id` | ✅ | Verify old password and set a new one |
| `GET` | `/profile/:id` | ✅ | Retrieve a specific user's profile |
| `GET` | `/otherUser/:id` | ✅ | List users excluding the logged-in user |
| `POST` | `/follow/:id` | ✅ | Follow a target user |
| `POST` | `/unfollow/:id` | ✅ | Unfollow a target user |
| `PUT` | `/bookmark/:id` | ✅ | Toggle a tweet in bookmarks |
| `GET` | `/bookmarks/:id` | ✅ | Retrieve all bookmarked tweets |
| `GET` | `/search` | ✅ | Paginated search of users by name/username |

---

### 🐦 Tweet Routes (`/api/v1/tweet`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/create` | ✅ | Create a tweet or reply (multipart: video/image optional) |
| `DELETE`| `/delete/:id` | ✅ | Delete a specific tweet |
| `PUT` | `/like/:id` | ✅ | Toggle like state on a tweet |
| `GET` | `/alltweets/:id` | ✅ | Fetch the global timeline |
| `GET` | `/followingtweets/:id` | ✅ | Fetch tweets only from followed users |
| `GET` | `/profiletweets/:id` | ✅ | Fetch all tweets authored by a specific user |
| `GET` | `/replies/:id` | ✅ | Fetch direct replies to a tweet |
| `GET` | `/search` | ✅ | Search tweets (Legacy) |
| `PUT` | `/bookmark/:id` | ✅ | Toggle bookmark (Redundant route) |

---

## 🚀 Deployment Stack

### Backend — Render

| Property | Value |
|----------|-------|
| **Platform** | [Render](https://render.com) |
| **Service URL** | `https://twitter-clone-u2a5.onrender.com` |
| **Runtime** | Node.js |
| **Start Command** | `node index.js` |
| **CORS Access** | `https://twitterclone-sam-io.vercel.app` |

### Frontend — Vercel

| Property | Value |
|----------|-------|
| **Platform** | [Vercel](https://vercel.com) |
| **App URL** | `https://twitterclone-sam-io.vercel.app` |
| **Build Command** | `npm run build` |
| **Output Directory** | `build` |
| **Framework Preset** | Create React App |

---

## 🏗️ Architecture Deep Dive

### Media Upload Pipeline
Tweets and Avatars utilize a Multer-to-Cloudinary staging model. Files hit routes configured with `upload.fields`, are stored in local memory/disk, and then pushed to Cloudinary via `cloudinaryUpload.js`. Local copies are synchronously deleted to prevent server storage issues on Render.

### Feed Generation
- **Global Feed (`/alltweets`):** Fetches all tweets from the database, populates the author details, and sorts them by creation date in descending order.
- **Following Feed (`/followingtweets`):** Queries the `User` collection for the authenticated user, maps their `following` array, and fetches tweets where the `userId` matches any of the followed IDs.

### State Management & Persistence (Frontend)
TwitterClone uses `@reduxjs/toolkit` combined with `redux-persist`. The entire Redux store is stringified and saved to `localStorage`. When the app loads, the `PersistGate` blocks rendering until the store is hydrated.
This means when a user refreshes the page, their authenticated state, profile data, and cached tweets load instantly without requiring an initial network round-trip. Custom hooks (`useGetMyTweets`, `useGetProfile`) silently refetch data in the background to ensure freshness.

---

## ⚙️ Environment Variables

### Backend (`.env`)

```bash
PORT=8080                          
MONGO_URI=mongodb+srv://...      
TOKEN_SECRET=<secret>       
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
```

### Frontend (`.env`)

```bash
REACT_APP_API_BASE_URL=https://twitter-clone-u2a5.onrender.com
```

---

## 🔧 Local Development Setup

### Prerequisites

- Node.js >= 18
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

### Backend Setup

```bash
cd backend
npm install

# Create .env file with all required variables
npm run dev
# Server runs on http://localhost:8080
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env file:
# REACT_APP_API_BASE_URL=http://localhost:8080

npm start
# App runs on http://localhost:3000
```

---

## 📄 License

ISC — see [package.json](backend/package.json).

---

## 👤 Author

**Samarth Pagaria**
- GitHub: [@Samarthpagaria](https://github.com/Samarthpagaria)
- Repo: [github.com/Samarthpagaria/Twitter-Clone](https://github.com/Samarthpagaria/Twitter-Clone)
