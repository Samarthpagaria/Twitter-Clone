import express from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getfolowingTweets,
  likeOrDislike,
  getSearchedTweets,
  toggleBookmark,
  getProfileTweets,
  getReplies,
} from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";
import { upload } from "../multer/config.js";

const router = express.Router();
router.route("/create").post(isAuthenticated, upload.fields([
  { name: "video", maxCount: 1 },
  { name: "image", maxCount: 1 }
]), createTweet);
router.route("/delete/:id").delete(isAuthenticated, deleteTweet);
router.route("/like/:id").put(isAuthenticated, likeOrDislike);
router.route("/alltweets/:id").get(isAuthenticated, getAllTweets);
router.route("/followingtweets/:id").get(isAuthenticated, getfolowingTweets);
router.route("/profiletweets/:id").get(isAuthenticated, getProfileTweets);
router.route("/search").get(isAuthenticated, getSearchedTweets);
router.route("/bookmark/:id").put(isAuthenticated, toggleBookmark);
router.route("/replies/:id").get(isAuthenticated, getReplies);

export default router;
