import mongoose from "mongoose";
import { logger } from "./logger";

const MONGODB_URI =
  process.env.MONGO_URI || "mongodb+srv://samihamahin36_db_user:gjuSpQWMCB6SobBb@seren.jm4aca0.mongodb.net/?retryWrites=true&w=majority&appName=Seren";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info("Connected to MongoDB Atlas");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};