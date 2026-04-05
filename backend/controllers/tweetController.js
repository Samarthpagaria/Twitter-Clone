import Tweet from "../models/tweetSchema.js";
import User from "../models/UserSchema.js";
import mongoose from "mongoose";
import uploadOnCloudinary from "../cloudinary/cloudinaryUpload.js";

import { getOtherUser } from "./userController.js";

export const createTweet = async (req, res) => {
  try {
    const { description, id, replyTo } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        message: "Fields are required",
        success: false,
      });
    }

    const videoLocalFilePath = req.files?.video?.[0]?.path;
    const imageLocalFilePath = req.files?.image?.[0]?.path;
    let media = [];

    if (videoLocalFilePath) {
      const uploadedVideo = await uploadOnCloudinary(videoLocalFilePath);
      if (uploadedVideo) {
        media.push({
          url: uploadedVideo.url,
          type: "video"
        });
      } else {
        return res.status(500).json({
          message: "Error uploading video to cloud.",
          success: false,
        });
      }
    }

    if (imageLocalFilePath) {
      const uploadedImage = await uploadOnCloudinary(imageLocalFilePath);
      if (uploadedImage) {
        media.push({
          url: uploadedImage.url,
          type: "image"
        });
      } else {
        return res.status(500).json({
          message: "Error uploading image to cloud.",
          success: false,
        });
      }
    }

    const newTweet = await Tweet.create({
      description,
      userId: id,
      replyTo: replyTo || null,
      media,
    });

    if (replyTo) {
      await Tweet.findByIdAndUpdate(replyTo, {
        $inc: { commentCount: 1 }
      });
    }

    res.status(201).json({
      message: replyTo ? "Reply posted successfully" : "Tweet created successfully",
      tweet: newTweet,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
  
    const tweetToDelete = await Tweet.findById(id);
    if (!tweetToDelete) {
      return res.status(404).json({ message: "Tweet not found", success: false });
    }

    if (tweetToDelete.replyTo) {
      await Tweet.findByIdAndUpdate(tweetToDelete.replyTo, {
        $inc: { commentCount: -1 }
      });
    }

    await Tweet.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Tweet deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);
    if (tweet.likes.includes(loggedInUserId)) {
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { likes: loggedInUserId },
      });
      return res.status(200).json({
        message: "Disliked tweet",
        success: true,
      });
    } else {
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { likes: loggedInUserId },
      });
      return res.status(200).json({
        message: "Liked tweet",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);

    const loggedInUserTweets = await Tweet.find({ userId: id }).populate({
      path: "userId",
      select: "name username",
    });

    const followingUserTweet = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({ userId: otherUsersId }).populate({
          path: "userId",
          select: "name username",
        });
      })
    );

    const excludeIds = [id, ...loggedInUser.following].map(
      (uid) => new mongoose.Types.ObjectId(uid)
    );

    const randomTweets = await Tweet.aggregate([
      { $match: { userId: { $nin: excludeIds } } },
      { $sample: { size: 10 } },
    ]);
    await Tweet.populate(randomTweets, { path: "userId", select: "name username" });

    let allTweets = loggedInUserTweets.concat(...followingUserTweet, randomTweets);

    allTweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
      tweets: allTweets,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getfolowingTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);

    const followingUsersTweets = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({ userId: otherUsersId }).populate({
          path: "userId",
          select: "name username",
        });
      })
    );
    return res.status(200).json({
      tweets: [].concat(...followingUsersTweets),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfileTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const tweets = await Tweet.find({ userId: id })
      .populate({ path: "userId", select: "name username" })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      tweets,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while fetching user tweets.",
      success: false,
    });
  }
};


const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getSearchedTweets = async (req, res) => {
  try {
    const keyword = req.query.keyword?.trim();

    if (!keyword) {
      return res.status(400).json({
        message: "Search keyword is required.",
        success: false,
      });
    }

    if (keyword.length < 2) {
      return res.status(400).json({
        message: "Search keyword must be at least 2 characters.",
        success: false,
      });
    }

    if (keyword.length > 100) {
      return res.status(400).json({
        message: "Search keyword too long.",
        success: false,
      });
    }

    const safeKeyword = escapeRegex(keyword);
    const searchRegex = new RegExp(safeKeyword, "i");

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(20, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const [tweets, total] = await Promise.all([
      Tweet.find({ description: searchRegex })
        .populate({
          path: "userId",
          select: "name username",
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Tweet.countDocuments({ description: searchRegex }),
    ]);

    console.log(`===== BACKEND SEARCH DIAGNOSTICS =====`);
    console.log(`Keyword Scanned: "${keyword}"`);
    console.log(`Regex Used: /${safeKeyword}/i`);
    console.log(`Tweets matched directly in DB: ${total}`);
    console.log(`Tweets actually mapped to API payload: ${tweets.length}`);
    console.log(`======================================`);

    return res.status(200).json({
      tweets,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
      success: true,
    });
  } catch (error) {
    console.error("Tweet search error:", error);
    return res.status(500).json({
      message: error.message || "An error occurred while searching tweets.",
      error: error.toString(),
      success: false,
    });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user; // req.user is the raw userid string from JWT
    const tweetId = req.params.id;

    if (!tweetId) {
      return res.status(400).json({ success: false, message: "Tweet ID is required" });
    }

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ success: false, message: "Tweet not found" });
    }

    const user = await User.findById(userId);

    const isAlreadyBookmarked = user.bookmarks.includes(tweetId);

    if (isAlreadyBookmarked) {
      await User.findByIdAndUpdate(userId, {
        $pull: { bookmarks: tweetId },
      });
      return res.status(200).json({
        success: true,
        message: "Tweet removed from bookmarks",
        bookmarked: false,
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { bookmarks: tweetId },
      });
      return res.status(200).json({
        success: true,
        message: "Tweet added to bookmarks",
        bookmarked: true,
      });
    }
  } catch (error) {
    console.error("Toggle Bookmark Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getReplies = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const replies = await Tweet.find({ replyTo: tweetId })
      .populate({
        path: "userId",
        select: "name username",
      })
      .sort({ createdAt: 1 }); // Oldest first, like a conversation
      
    return res.status(200).json({
      tweets: replies,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching replies:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};