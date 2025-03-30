import { createFileRoute } from "@tanstack/react-router";

import Conversation from "@src/pages/Conversation/Conversation";
import { getConversationById } from "@src/remote/repositories/conversations.repository";

import type { Conversation as ConversationType } from "@src/types/conversations.types";

type ChatRouteParams = {
  conversationId: string;
};

export const Route = createFileRoute("/chat/$conversationId")({
  component: Conversation,
  loader: async ({
    params,
  }: {
    params: ChatRouteParams;
  }): Promise<ConversationType> => {
    const conversation = await getConversationById(params.conversationId);

    return conversation;
  },
});
