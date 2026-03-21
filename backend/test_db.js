import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: 'c:/Users/HP/Desktop/Projects/Web Development projects/Twitter-Clone/backend/.env' });

console.log("Testing connection to:", process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("SUCCESS: Connected to DB");
    process.exit(0);
  })
  .catch(err => {
    console.error("FAILURE: Could not connect to DB");
    console.error("Error Name:", err.name);
    console.error("Error Message:", err.message);
    if (err.reason) console.error("Reason:", err.reason);
    process.exit(1);
  });
