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

  let lastChunkTime = Date.now();

  return client.streamRequest<string>(
    `/conversations/${conversationId}/messages/${messageId}/completions`,
    {
      method: "POST",
      body: JSON.stringify(body),
      signal: abortController.signal,
    },
    {
      onMessage: (message) => {
        const now = Date.now();
        const timeSinceLastChunk = now - lastChunkTime;
        lastChunkTime = now;

        console.debug(
          `Received SSE chunk after ${timeSinceLastChunk}ms:`,
          message
        );

        // Process each message individually with a slight delay to help visualize streaming
        setTimeout(() => {
          onMessage(message);
        }, 0); // Using setTimeout with 0ms to defer to next event loop cycle
      },
      onError: (error) => {
        console.error("Stream error:", error);
        throw error;
      },
      onOpen: (response) => {
        console.debug("Stream opened", response.status);
        lastChunkTime = Date.now();
      },
      onClose: () => {
        console.debug("Stream closed");
      },
    }
  );
};
