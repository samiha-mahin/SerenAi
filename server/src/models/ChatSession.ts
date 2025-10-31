import { Document, Schema, model, Types } from "mongoose";

export interface IChatMessage {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    metadata?: {
        analysis?: any;
        currentGoal?: string | null;
        progress?: {
            emotionalState?: string;
            riskLevel?: number;
        };
    };
}