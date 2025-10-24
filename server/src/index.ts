import express from "express";
import dotenv from "dotenv";
import { serve } from "inngest/express";
import { inngest } from "./inngest/index";
import {functions as IngestFunctions} from "./inngest/functions";
import { connectDB } from "./utils/db";
import { logger } from "./utils/logger";
import authRouter from "./routes/auth";


dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/inngest", serve({ client: inngest, functions:IngestFunctions}));

app.use("/auth", authRouter);

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