import mongoose from "mongoose";
import { logger } from "./logger";


export const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGO_URI as string;
    await mongoose.connect(MONGODB_URI);
    logger.info("Connected to MongoDB Atlas");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};