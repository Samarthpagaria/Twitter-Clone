import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";

//Setting up path for .env file variables
dotenv.config({
  path: ".env",
});

//connecting to MongoDB
databaseConnection();
//creating application
const app = express();

//middleware
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

//api
//http://localhost:8080/api/v1/user/
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);

//running application
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
