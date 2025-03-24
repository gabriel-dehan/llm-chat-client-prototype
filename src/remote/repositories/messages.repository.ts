import { getClient } from "./client";

import type { Message } from "@src/types/conversations.types";

// Params types
export type GetMessagesParams = {
  page?: number;
  limit?: number;
};

export type CreateMessageParams = {
  content: string;
  role: "user" | "assistant";
};

export type UpdateMessageParams = {
  content?: string;
};

const client = getClient();

export const getMessages = async (
  conversationId: number | null,
  params?: GetMessagesParams
): Promise<Message[]> => {
  if (!conversationId) return [];
  const response = await client.get<Message[]>(
    `/conversations/${conversationId}/messages`,
    params
  );
  return response.json();
};

export const createMessage = async (
  conversationId: number,
  data: CreateMessageParams
): Promise<Message> => {
  const response = await client.post<Message>(
    `/conversations/${conversationId}/messages`,
    data
  );

  return response.json();
};

export const updateMessage = async (
  messageId: number,
  data: UpdateMessageParams
): Promise<Message> => {
  const response = await client.put<Message>(`/messages/${messageId}`, data);
  return response.json();
};

export const deleteMessage = async (messageId: number): Promise<void> => {
  await client.delete(`/messages/${messageId}`);
};
