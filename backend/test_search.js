import mongoose from "mongoose";
import dotenv from "dotenv";
import Tweet from "./models/tweetSchema.js";
import User from "./models/UserSchema.js";

dotenv.config({ path: "./.env" });

const testSearch = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { family: 4 });
        const keyword = "really g";
        
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const safeKeyword = escapeRegex(keyword);

        const matchingUsers = await User.find({
          $or: [
            { name: { $regex: safeKeyword, $options: "i" } },
            { username: { $regex: safeKeyword, $options: "i" } }
          ]
        }).select('_id');
        
        const matchingUserIds = matchingUsers.map((u) => u._id);

        const [tweets, total] = await Promise.all([
          Tweet.find({
            $or: [
              { description: { $regex: safeKeyword, $options: "i" } },
              { userId: { $in: matchingUserIds } }
            ]
          })
            .populate({
              path: "userId",
              select: "name username -password",
            })
            .sort({ createdAt: -1 })
            .skip(0)
            .limit(10)
            .lean(),

          Tweet.countDocuments({
            $or: [
              { description: { $regex: safeKeyword, $options: "i" } },
              { userId: { $in: matchingUserIds } }
            ]
          }),
        ]);

        console.log("Success!", tweets.length, total);
        console.dir(tweets[0]);
    } catch (err) {
        console.error("Test failed with error:");
        console.error(err);
    } finally {
        process.exit();
    }
}

testSearch();
