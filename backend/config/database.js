import mongoose from "mongoose";
import dotenv from "dotenv";



const databaseConnection = () => {
  console.log("Connecting to:", process.env.MONGO_URL);
  mongoose
    .connect(process.env.MONGO_URL, { family: 4 })
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB:", error.message);
    });
};

export default databaseConnection;
