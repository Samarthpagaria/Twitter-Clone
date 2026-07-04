import "dotenv/config";
import express from "express";
import mongoose from "mongoose";


import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import siteRoute from "./routes/siteRoute.js";
import cors from "cors";

databaseConnection();
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/health", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.status(200).json({ message: "Good health" });
  } else {
    res.status(500).json({ message: "Bad health" });
  }
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);
app.use("/api/v1/site", siteRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
