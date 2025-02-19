import { createFileRoute } from "@tanstack/react-router";
import { getConversationById } from "@src/remote/repositories/conversations.repository";
import Conversation from "@src/pages/Conversation/Conversation";

type ChatRouteParams = {
  conversationId: string;
};

export const Route = createFileRoute("/chat/$conversationId")({
  component: Conversation,
  loader: async ({ params }: { params: ChatRouteParams }) => {
    const conversation = await getConversationById(params.conversationId);

    return {
      conversation,
    };
  },
});
