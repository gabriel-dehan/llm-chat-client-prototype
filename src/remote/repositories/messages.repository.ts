import type { Message } from "@types/conversations.type";

import { getClient } from "./client";

// Params types
export type GetMessagesParams = {
  page?: number;
  limit?: number;
};

export type CreateMessageParams = {
  content: string;
};

export type UpdateMessageParams = {
  content?: string;
};

const client = getClient();

export const getMessages = async (
  conversationId: string,
  params?: GetMessagesParams
): Promise<Message[]> => {
  const response = await client.get<Message[]>(
    `/conversations/${conversationId}/messages`,
    params
  );
  return response.json();
};

export const createMessage = async (
  conversationId: string,
  data: CreateMessageParams
): Promise<Message> => {
  const response = await client.post<Message>(
    `/conversations/${conversationId}/messages`,
    data
  );
  return response.json();
};

export const updateMessage = async (
  messageId: string,
  data: UpdateMessageParams
): Promise<Message> => {
  const response = await client.put<Message>(`/messages/${messageId}`, data);
  return response.json();
};

export const deleteMessage = async (messageId: string): Promise<void> => {
  await client.delete(`/messages/${messageId}`);
};
