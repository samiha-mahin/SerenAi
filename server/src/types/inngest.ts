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