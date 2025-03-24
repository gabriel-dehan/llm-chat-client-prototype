import { createFileRoute } from "@tanstack/react-router";

import Conversation from "@src/pages/Conversation/Conversation";

export const Route = createFileRoute("/chat")({
  component: Conversation,
  loader: () => {
    return {
      conversation: null,
    };
  },
});
