import { EventSourceMessage } from "@microsoft/fetch-event-source";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { streamCompletions } from "../repositories/completions.repository";

type StreamCompletionsQueryParams = {
  conversationId: string;
  messageId: string;
  abortController: AbortController;
  onMessage: (message: EventSourceMessage) => void;
};

export const useStreamedCompletionsQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      messageId,
      abortController,
      onMessage,
    }: StreamCompletionsQueryParams) =>
      streamCompletions({
        conversationId,
        messageId,
        abortController,
        onMessage,
      }),
  });
};
