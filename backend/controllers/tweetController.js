import Tweet from "../models/tweetSchema.js";
import User from "../models/UserSchema.js";

import { getOtherUser } from "./userController.js";

export const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        message: "Fields are required",
        success: false,
      });
    }
    const user = await User.findById(id).select("-password");
    await Tweet.create({
      description,
      userId: id,
      userDetails: user,
    });

    res.status(201).json({
      message: "Tweet created successfully",
      success: true,
    });
  } catch (error) {}
};

export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Tweet deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);
    if (tweet.like.includes(loggedInUserId)) {
      //disslike tweet
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });
      return res.status(200).json({
        message: "Disliked tweet",
        success: true,
      });
    } else {
      //like tweet
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
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
  // loggedInUser ka tweet + following user tweet
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const loggedInUserTweets = await Tweet.find({ userId: id });
    const followingUserTweet = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({ userId: otherUsersId });
      })
    );
    return res.status(200).json({
      tweets: loggedInUserTweets.concat(...followingUserTweet),
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
        return Tweet.find({ userId: otherUsersId });
      })
    );
    return res.status(200).json({
      tweets: [].concat(...followingUsersTweets),
    });
  } catch (error) {
    console.log(error);
  }
};


// Helper to escape special regex characters (prevents ReDoS attacks)
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
      Tweet.find({ description: { $regex: searchRegex } })
        .populate({
          path: "userId",
          select: "name username -password",
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Tweet.countDocuments({ description: { $regex: searchRegex } }),
    ]);

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
      message: "An error occurred while searching tweets.",
      success: false,
    });
  }
};