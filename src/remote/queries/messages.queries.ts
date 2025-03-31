import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import { CompletionsStreamResponse } from "@src/types/completions.type";
import { completionsText } from "@src/utils/completionsText";

import { APIError } from "../errors/api.error";
import {
  createMessage,
  CreateMessageParams,
  getMessages,
  updateMessage,
  UpdateMessageParams,
} from "../repositories/messages.repository";
import { useStreamedCompletionsQuery } from "./completions.queries";

import type { Message } from "@src/types/conversations.types";

export const useGetMessagesQuery = (conversationId: string | null) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
  });
};

export const useCreateMessageMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: streamCompletions } = useStreamedCompletionsQuery();
  const abortController = new AbortController();

  const mutation = useMutation({
    mutationFn: async ({
      conversationId,
      data,
    }: {
      conversationId: string;
      data: CreateMessageParams;
    }) => createMessage(conversationId, data),
    // Optimistic update
    onMutate: ({ conversationId, data }) => {
      const optimisticId = `temp-${uuidv4()}`;
      const previousMessages = queryClient.getQueryData<Message[]>([
        "messages",
        conversationId,
      ]);

      const newMessage: Message = {
        ...data,
        id: optimisticId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      queryClient.setQueryData<Message[]>(
        ["messages", conversationId],
        (messages) => [...(messages || []), newMessage]
      );

      // Return previous messages to be able to rollback
      return { optimisticId, previousMessages };
    },
    onError: (error: APIError, { conversationId }, context) => {
      console.error(error.message, JSON.stringify(error.data, null, 2));

      queryClient.setQueryData<Message[]>(
        ["messages", conversationId],
        context?.previousMessages || []
      );
    },
    onSuccess: (newMessage, { conversationId }, { optimisticId }) => {
      // Replace the optimistic message with the actual message
      queryClient.setQueryData<Message[]>(
        ["messages", conversationId],
        (messages) =>
          messages?.map((message) =>
            message.id === optimisticId ? newMessage : message
          )
      );

      // Now that the message is created, we can stream the completions
      // Create a new empty model message that will be updated with the completions
      let completionMessage: Message = {
        id: `temp-completion-${uuidv4()}`,
        role: "model",
        content: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      queryClient.setQueryData<Message[]>(
        ["messages", conversationId],
        (messages) => [...(messages || []), completionMessage]
      );

      // Send the message to the API to get the LLM response
      streamCompletions({
        conversationId,
        messageId: newMessage.id,
        abortController,
        onMessage: (message) => {
          if (message.event) {
            console.warn(message.event);
          }

          // TODO: Handle tools vs text
          if (message.data) {
            try {
              const response = JSON.parse(
                message.data
              ) as CompletionsStreamResponse;

              const text = completionsText(response);

              completionMessage = {
                ...completionMessage,
                content: completionMessage.content + text,
                updatedAt: new Date(),
              };

              queryClient.setQueryData<Message[]>(
                ["messages", conversationId],
                (messages) =>
                  messages?.map((message) =>
                    message.id === completionMessage.id
                      ? completionMessage
                      : message
                  )
              );
            } catch (error) {
              console.error(error);
              throw error;
            }
          }
        },
      });
    },
  });

  return {
    ...mutation,
    abortController,
  };
};

export const useUpdateMessageMutation = (conversationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      messageId,
      data,
    }: {
      messageId: string;
      data: UpdateMessageParams;
    }) => updateMessage(messageId, data),
    onMutate: ({ messageId, data }) => {
      const messages = queryClient.getQueryData<Message[]>([
        "messages",
        conversationId,
      ]);

      const messageToUpdate = messages?.find(
        (message) => message.id === messageId
      );

      if (!messageToUpdate) {
        throw new Error("Message not found");
      }

      const updatedMessage: Message = {
        ...messageToUpdate,
        ...data,
        updatedAt: new Date(),
      };

      queryClient.setQueryData<Message[]>(
        ["messages", conversationId],
        (messages) =>
          messages?.map((message) =>
            message.id === messageId ? updatedMessage : message
          )
      );

      return { previousMessages: messages };
    },
    onError: (error, _, context) => {
      // TODO: Handle error
      queryClient.setQueryData<Message[]>(
        ["messages", conversationId],
        context?.previousMessages || []
      );
    },
    onSuccess: (updatedMessage, { messageId }) => {
      // Replace the optimistic message with the actual message
      queryClient.setQueryData<Message[]>(
        ["messages", conversationId],
        (messages) =>
          messages?.map((message) =>
            message.id === messageId ? updatedMessage : message
          )
      );
    },
  });
};
