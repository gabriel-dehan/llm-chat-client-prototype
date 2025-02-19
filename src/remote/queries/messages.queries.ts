import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMessages,
  CreateMessageParams,
  createMessage,
  UpdateMessageParams,
  updateMessage,
} from "../repositories/messages.repository";
import { Message } from "@src/types/conversations.type";
import { v4 as uuidv4 } from "uuid";

export const useGetMessagesQuery = (conversationId: string) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
  });
};

export const useCreateMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      conversationId,
      data,
    }: {
      conversationId: string;
      data: CreateMessageParams;
    }) => createMessage(conversationId, data),
    // Optimistic update
    onMutate: async ({ conversationId, data }) => {
      const optimisticId = `temp-${uuidv4()}`;
      const previousMessages = queryClient.getQueryData<Message[]>([
        "messages",
        conversationId,
      ]);

      const newMessage: Message = {
        ...data,
        id: optimisticId,
        role: "user",
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
    onError: (error, { conversationId }, context) => {
      // TODO: Handle error
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
    },
  });
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
    onMutate: async ({ messageId, data }) => {
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
