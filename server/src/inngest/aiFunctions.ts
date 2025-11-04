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
      const analysis = await step.run("analyze-message", async () => {
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
          const prompt = `Analyze this therapy message and provide insights. Return ONLY a valid JSON object with no markdown formatting or additional text.
             Message: ${message}
             Context: ${JSON.stringify({ memory, goals })}
             Required JSON Structure:
             {
            "emotionalState": "string",
            "themes": ["string"],
            "riskLevel": number,
            "recommendedApproach": "string",
            "progressIndicators": ["string"]
            }`;
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text().trim();

          logger.info("Received analysis from Gemini:", { text });

          // Clean the response text to ensure it's valid JSON
          const cleanText = text.replace(/```json\n|\n```/g, "").trim();
          const parsedAnalysis = JSON.parse(cleanText);
          logger.info("Successfully parsed analysis:", parsedAnalysis);
          return parsedAnalysis;
        } catch (error) {
          logger.error("Error in message analysis:", { error, message });
          // Return a default analysis instead of throwing
          return {
            emotionalState: "neutral",
            themes: [],
            riskLevel: 0,
            recommendedApproach: "supportive",
            progressIndicators: [],
          };
        }
      });

      // Update memory based on analysis
      const updatedMemory = await step.run("update-memory", async () => {
        if (analysis.emotionalState) {
          memory.userProfile.emotionalState.push(analysis.emotionalState);
        }
        if (analysis.themes) {
          memory.sessionContext.conversationThemes.push(...analysis.themes);
        }
        if (analysis.riskLevel) {
          memory.userProfile.riskLevel = analysis.riskLevel;
        }
        return memory;
      });

      // If high risk is detected, trigger an alert
      if (analysis.riskLevel > 4) {
        await step.run("trigger-alert", async () => {
          logger.warn("High risk level detected in chat message", {
            message,
            riskLevel: analysis.riskLevel,
          });
        });
      }
      // Generate therapeutic response
      const response = await step.run("generate-response", async () => {
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

          const prompt = `${systemPrompt}
          Based on the following context, generate a therapeutic response:
          Message: ${message}
          Analysis: ${JSON.stringify(analysis)}
          Memory: ${JSON.stringify(memory)}
          Goals: ${JSON.stringify(goals)}

           Provide a response that:
          1. Addresses the immediate emotional needs
          2. Uses appropriate therapeutic techniques
          3. Shows empathy and understanding
          4. Maintains professional boundaries
          5. Considers safety and well-being`;

          const result = await model.generateContent(prompt);
          const responseText = result.response.text().trim();

          logger.info("Generated therapeutic response:", { responseText });
          return responseText;
        } catch (error) {
          logger.error("Error generating response:", { error, message });
          // Return a default response instead of throwing
          return "I'm here to support you. Could you tell me more about what's on your mind?";
        }
      });
      // Return the response in the expected format
      return {
        response,
        analysis,
        updatedMemory,
      };
    } catch (error) {}
  }
);
