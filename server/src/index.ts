import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client";
import {functions as IngestFunctions} from "./inngest/functions";
import { connectDB } from "./utils/db";
import { logger } from "./utils/logger";
import authRouter from "./routes/auth";
import activityRouter from "./routes/activity";
import chatRouter from "./routes/chat";
import moodRouter from "./routes/mood";


dotenv.config();

const app = express();

app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // HTTP request logger

app.use("/api/inngest", serve({ client: inngest, functions:IngestFunctions}));

app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/api/mood", moodRouter);
app.use("/api/activity", activityRouter);

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Then start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(
        `Inngest endpoint available at http://localhost:${PORT}/api/inngest`
      );
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();