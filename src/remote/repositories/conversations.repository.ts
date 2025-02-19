import { Conversation } from "@types/conversations.type";
import { useClient } from "./client";

// Params types
export type GetConversationsParams = {
  page?: number;
  limit?: number;
};

export type CreateConversationParams = {
  title: string;
};

export type UpdateConversationParams = {
  title?: string;
};

const client = useClient();

export const getConversations = async (
  params?: GetConversationsParams
): Promise<Conversation[]> => {
  const response = await client.get<Conversation[]>("/conversations", params);
  return response.json();
};

export const getConversationById = async (
  id: string
): Promise<Conversation> => {
  const response = await client.get<Conversation>(`/conversations/${id}`);
  return response.json();
};

export const createConversation = async (
  data: CreateConversationParams
): Promise<Conversation> => {
  const response = await client.post<Conversation>("/conversations", data);
  return response.json();
};

export const updateConversation = async (
  id: string,
  data: UpdateConversationParams
): Promise<Conversation> => {
  const response = await client.put<Conversation>(`/conversations/${id}`, data);
  return response.json();
};

export const deleteConversation = async (id: string): Promise<void> => {
  await client.delete(`/conversations/${id}`);
};
