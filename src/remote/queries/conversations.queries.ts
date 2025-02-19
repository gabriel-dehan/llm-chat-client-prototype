import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getConversations,
  GetConversationsParams,
  getConversationById,
  CreateConversationParams,
  createConversation,
  UpdateConversationParams,
  updateConversation,
  deleteConversation,
} from "../repositories/conversations.repository";
import { Conversation } from "@src/types/conversations.type";

export const useGetConversationsQuery = (params?: GetConversationsParams) => {
  return useQuery({
    queryKey: ["conversations", params],
    queryFn: () => getConversations(params),
  });
};

export const useGetConversationByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["conversation", id],
    queryFn: () => getConversationById(id),
  });
};

export const useCreateConversationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateConversationParams) => createConversation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};

export const useUpdateConversationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateConversationParams;
    }) => updateConversation(id, data),
    onSuccess: (updatedConversation, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });

      queryClient.setQueryData<Conversation>(
        ["conversation", id],
        () => updatedConversation
      );
    },
  });
};

export const useDeleteConversationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteConversation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};
