import { EventSourceMessage } from "@microsoft/fetch-event-source";

import { getClient } from "./client";

export type StreamCompletionsParams = {
  conversationId: string;
  messageId: string;
  abortController: AbortController;
  onMessage: (message: EventSourceMessage) => void;
};

const client = getClient();

export const streamCompletions = async ({
  conversationId,
  messageId,
  abortController,
  onMessage,
}: StreamCompletionsParams) => {
  const body = {
    conversationId,
    messageId,
  };

  return client.streamRequest<string>(
    `/conversations/${conversationId}/messages/${messageId}/completions`,
    {
      method: "POST",
      body: JSON.stringify(body),
      signal: abortController.signal,
    },
    {
      onMessage,
      onError: (error) => {
        console.error("Stream error:", error);
        throw error;
      },
    }
  );
};
