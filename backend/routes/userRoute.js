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
} from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();
router.route("/register").post(Register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/bookmark/:id").put(isAuthenticated, bookmark);
router.route("/profile/:id").get(isAuthenticated, getMyProfile);
router.route("/otherUser/:id").get(isAuthenticated, getOtherUser);
router.route("/follow/:id").post(isAuthenticated, follow);
router.route("/unfollow/:id").post(isAuthenticated, unfollow);

export default router;
