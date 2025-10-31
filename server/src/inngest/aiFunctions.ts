import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { logger } from "../utils/logger";
import { Session } from "@/models/Session";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// Function to handle chat message processing
export const processChatMessage = inngest.createFunction(
  {
    id: "process-chat-message",
  },
  { event: "therapy/session.message" },
  async ({ event, step }) => {
    try {
      const {
        message,
        history,
        memory = {
          userProfile: {
            emotionalState: [],
            riskLevel: 0,
            preferences: {},
          },
          sessionContext: {
            conversationThemes: [],
            currentTechnique: null,
          },
        },
        goals = [],
        systemPrompt,
      } = event.data;

       logger.info("Processing chat message:", {
        message,
        historyLength: history?.length,
      }); //This line prints the user's message and the size of chat history to logs, so you can monitor and debug your app safely.

      // Analyze the message using Gemini
    } catch (error) {}
  }
);
