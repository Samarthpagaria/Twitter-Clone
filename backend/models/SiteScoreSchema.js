import mongoose from "mongoose";

const siteScoreSchema = new mongoose.Schema({
    score: {
        type: Number,
        default: 0
    }
});

export default mongoose.model("SiteScore", siteScoreSchema);
