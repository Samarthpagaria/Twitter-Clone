import mongoose from "mongoose";
import dotenv from "dotenv";

//Setting up path for .env file variables
dotenv.config({
  path: "../config/.env",
});

const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB");
    });
};

export default databaseConnection;
