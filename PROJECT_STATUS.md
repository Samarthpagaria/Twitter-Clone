# Twitter Clone Project Overview

This document provides a comprehensive summary of the current state of the Twitter Clone project, including the technology stack, implemented features, and system architecture.

## 🚀 Technology Stack

### Backend
- **Core**: Node.js & Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (stored in HTTP-only cookies) & bcryptjs for password hashing
- **Key Libraries**: `cookie-parser`, `cors`, `dotenv`, `jsonwebtoken`, `mongoose`

### Frontend
- **Framework**: React.js (Vite)
- **State Management**: Redux Toolkit (Slices for Users and Tweets)
- **Styling**: Tailwind CSS
- **Icons**: React Icons (Lucide-like set)
- **Key Components**: Left & Right Sidebars, Feed, Tweet Post/Composition, Profile, and Search.

---

## 🛠️ Backend Functionality (API)

### User Management
- **Registration & Authentication**: Full signup, login, and logout flow.
- **Profile Management**: Retrieve profiles, update name/username/email, and change password (with current password verification).
- **Social Graph**: Follow and unfollow users. Update followers/following lists in real-time.
- **Search**: Advanced user search by name or username with pagination and regex protection.

### Tweet Management
- **CRUD Operations**: Create and delete tweets. 
- **Feed Logic**:
  - **For You Page**: Aggregates tweets from the logged-in user and everyone they follow.
  - **Following Page**: Specifically filters to show only content from followed users.
- **Interactions**: 
  - **Like/Dislike**: Toggle likes on tweets.
  - **Bookmarks**: Save tweets to a private list; dedicated endpoint to fetch bookmarked content.
- **Search**: Search tweets by description text with pagination support.

---

## 🎨 Frontend Architecture

### State Management (Redux)
- **User Slice**: Tracks `user` (logged-in), `otherUsers` (recommendations), and `profile` (currently viewed profile).
- **Tweet Slice**: Manages `tweets` array, `refresh` state (for triggering re-fetches), and `isActive` tab (For You vs. Following).

### Core Components
- **`Feed.js`**: Orchestrates the rendering of tweets based on selected tabs.
- **`Tweet.js`**: Handles display of individual tweets, including relative time formatting and interaction buttons (Like, Comment, Retweet, Bookmark, Delete).
- **`Profile.js`**: Displays user stats (Followers/Following), bio, and user-specific timeline.
- **`Modals`**:
  - `EditProfileModal`: Update user details.
  - `ChangePasswordModal`: Securely update passwords.

---

## 📉 Project Status

| Feature | Status |
| :--- | :--- |
| **User Auth** | ✅ Fully Functional |
| **Tweeting** | ✅ Fully Functional |
| **Like/Dislike** | ✅ Fully Functional |
| **Follow/Unfollow** | ✅ Fully Functional |
| **Bookmarking** | ✅ Fully Functional |
| **Profile Editing** | ✅ Fully Functional |
| **Password Update** | ✅ Fully Functional (with security checks) |
| **User Search** | ✅ Backend Ready |
| **Tweet Search** | ✅ Backend Ready |
| **Comments/Replies**| ⏳ Implementation Pending |
| **Retweets** | ⏳ Logic Needs Refinement |
| **Media Uploads** | ⏳ Basic Structure Only (Text focused currently) |

---

## 📁 Key File Map
- **Backend Controller**: `backend/controllers/userController.js` & `tweetController.js`
- **Frontend Components**: `frontend/twitter-clone/src/components/`
- **Redux State**: `frontend/twitter-clone/src/redux/`
- **Routes**: `backend/routes/`

> [!TIP]
> This document can be used as a project status update for contributors or stakeholders.
