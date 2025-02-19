import {
  useCreateConversationMutation,
  useGetConversationsQuery,
} from "@src/remote/queries/conversations.queries";
import { Conversation } from "@src/types/conversations.type";
import { z } from "zod";
import ChatBox from "./ChatBox/ChatBox";
import ChatSidebar from "./ChatSidebar/ChatSidebar";

interface ChatProps {
  conversation: Conversation | null;
}

const Chat = ({ conversation: currentConversation }: ChatProps) => {
  const { data: conversations } = useGetConversationsQuery();

  return (
    <div>
      <div>
        <ChatSidebar
          conversations={conversations}
          activeConversationId={currentConversation?.id}
        />
      </div>
      <div>
        <ChatBox conversation={currentConversation} />
      </div>
    </div>
  );
};

export default Chat;
