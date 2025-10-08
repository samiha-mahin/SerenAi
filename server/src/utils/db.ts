import mongoose from "mongoose";
import { logger } from "./logger";


export const connectDB = async () => {
  const MONGODB_URI = process.env.MONGO_URI || "" ;
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info("Connected to MongoDB Atlas");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};