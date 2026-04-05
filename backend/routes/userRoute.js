import express from "express";
import {
  Register,
  bookmark,
  follow,
  getMyProfile,
  getOtherUser,
  login,
  logout,
  unfollow,
  updateMyProfile,
  updatePassword,
  searchUsers,
  getBookmarks,
} from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";
import { upload } from "../multer/config.js";

const router = express.Router();
router.route("/register").post(upload.fields([{ name: "avatar", maxCount: 1 }]), Register);
router.route("/update/myprofile/:id").put(isAuthenticated, upload.fields([{ name: "avatar", maxCount: 1 }]), updateMyProfile);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/bookmark/:id").put(isAuthenticated, bookmark);
router.route("/profile/:id").get(isAuthenticated, getMyProfile);
router.route("/otherUser/:id").get(isAuthenticated, getOtherUser);
router.route("/follow/:id").post(isAuthenticated, follow);
router.route("/unfollow/:id").post(isAuthenticated, unfollow);
router.route("/update/password/:id").put(isAuthenticated, updatePassword);
router.route("/search").get(isAuthenticated, searchUsers);
router.route("/bookmarks/:id").get(isAuthenticated, getBookmarks);

export default router;
