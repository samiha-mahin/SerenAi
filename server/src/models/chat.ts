import mongoose, {Schema,Document} from "mongoose";

//Represents a single chat message.
export interface IChatMessage {
    role : "user" | "assistant" ;
    content : string ;
    timestamp : Date;
    metadata?: {
        technique : string;
        goal : string;
        progress: any;
    };
}

//Represents an entire chat session (like one conversation thread).
export interface IChat extends Document {
  sessionId: string;         // Unique ID for the chat
  messages: IChatMessage[];  // List of messages in this chat
  createdAt: Date;
  updatedAt: Date;
}

