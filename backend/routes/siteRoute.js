import express from "express";
import { getSiteScore, incrementSiteScore } from "../controllers/siteController.js";

const router = express.Router();

router.route("/score").get(getSiteScore);
router.route("/score/increment").post(incrementSiteScore);

export default router;
