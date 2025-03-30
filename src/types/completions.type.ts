// Type definitions loosely based on Gemini API structure
interface Part {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
  functionCall?: {
    name: string;
    args: Record<string, any>;
  };
  functionResponse?: {
    name: string;
    response: Record<string, any>;
  };
}

interface Content {
  parts: Part[];
  role: "user" | "model";
}

interface CompletionsCandidate {
  content: Content;
  finishReason?: "STOP" | "MAX_TOKENS" | "SAFETY" | "RECITATION" | "OTHER";
  finishMessage?: string;
  safetyRatings?: Array<{
    category: string;
    probability: string;
    blocked: boolean;
  }>;
  tokenCount?: {
    totalTokens: number;
    inputTokenCount: number;
    outputTokenCount: number;
  };
}

export interface CompletionsStreamResponse {
  candidates: CompletionsCandidate[];
}
