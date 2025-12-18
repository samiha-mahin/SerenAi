export interface TherapyAgentMemory {
  userProfile: {
    emotionalState: string[];
    riskLevel: number;
    preferences: Record<string, any>;
  };
  sessionContext: {
    conversationThemes: string[];
    currentTechnique: string | null;
  };
}

export interface MessageAnalysis {
  emotionalState: string;
  riskLevel: number;
  themes: string[];
  recommendedApproach: string;
  progressIndicators: string[];
}

export interface InngestResponse<T> {
  id: string;
  data: T;
}
//This is a generic wrapper for all Inngest responses.
//T = payload type
//id = event or execution ID (for example: { id: "evt_12345", data: { ... } })

export interface InngestMessageData {
  response: string;
  analysis: MessageAnalysis;
  updatedMemory?: TherapyAgentMemory;
}

export interface InngestSessionData {
  sessionId: string;
  userId: string;
  startTime: Date;
}

export interface InngestEventData {
  message?: string;
  history?: any[];
  memory?: TherapyAgentMemory;
  goals?: string[];
  systemPrompt?: string;
  sessionId?: string;
  userId?: string;
  startTime?: Date;
}

export type InngestMessageResponse = InngestResponse<InngestMessageData>;
export type InngestSessionResponse = InngestResponse<InngestSessionData>;

export interface InngestEvent {
  name: string;
  data: InngestEventData;
}