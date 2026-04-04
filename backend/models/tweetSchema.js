import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    media: [
      {
        url: { type: String, required: true },
        type: {
          type: String,
          enum: ["image", "video"],
          required: true,
        },
        publicId: String,
      },
    ],
    isRetweet: {
      type: Boolean,
      default: false,
    },
    originalTweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
      default: null,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

tweetSchema.index({ description: "text" });

export default mongoose.model("Tweet", tweetSchema);
