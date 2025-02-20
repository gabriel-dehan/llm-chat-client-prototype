import { useGetConversationsQuery } from "@src/remote/queries/conversations.queries";

import ChatBox from "./ChatBox/ChatBox";
import ChatSidebar from "./ChatSidebar/ChatSidebar";

import type { Conversation } from "@src/types/conversations.type";

import "./Chat.css";

interface ChatProps {
  conversation: Conversation | null;
}

const Chat = ({ conversation: currentConversation }: ChatProps) => {
  const { data: conversations } = useGetConversationsQuery();

  return (
    <main className="org-chat">
      <ChatSidebar
        activeConversationId={currentConversation?.id}
        conversations={conversations || []}
      />
      <ChatBox conversation={currentConversation} />
    </main>
  );
};

export default Chat;
