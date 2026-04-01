import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280, // Twitter-like character limit
    },

    // Likes - Should be array of User IDs (not just Array)
    likes: [
      // Renamed from "like" → "likes" (plural is better)
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Who posted the tweet
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Remove this field - Not recommended
    // userDetails: { ... }     ← We'll use .populate() instead

    // Future-ready fields (add these now, they'll be very useful)
    media: [
      {
        url: { type: String, required: true },
        type: {
          type: String,
          enum: ["image", "video"],
          required: true,
        },
        publicId: String, // For Cloudinary (to delete later if needed)
      },
    ],

    // For retweets (we'll implement this soon)
    isRetweet: {
      type: Boolean,
      default: false,
    },
    originalTweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },

    // For comments/replies (future)
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Optional: Create index for better search performance
tweetSchema.index({ description: "text" }); // For full-text search

export default mongoose.model("Tweet", tweetSchema);
