import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // Good practice for usernames
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Optional but recommended
    },

    // Better structure for followers & following
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Bookmarks - Much better as array of ObjectIds with ref
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],

    // Optional but useful fields for future
    bio: {
      type: String,
      maxlength: 160,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "", // You can store Cloudinary URL later
    },
    coverPicture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Fixed typo: timeStamps → timestamps
  },
);

export default mongoose.model("User", userSchema);
