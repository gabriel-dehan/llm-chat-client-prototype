import useConversationsStore from "@src/stores/conversations.store";
import { useNavigate } from "@tanstack/react-router";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const messageSchema = z.object({
  id: z.string(),
  content: z.string(),
  role: z.enum(["user", "assistant"]),
});

const conversationSchema = z.object({
  id: z.string(),
  messages: z.array(messageSchema),
});

interface ChatProps {
  conversationId: string | null;
}

const Chat = ({ conversationId }: ChatProps) => {
  const navigate = useNavigate();

  const conversations = useConversationsStore((state) => state.conversations);
  const addMessage = useConversationsStore((state) => state.addMessage);
  const addConversation = useConversationsStore(
    (state) => state.addConversation,
  );
  const generateUniqueConversationId = useConversationsStore(
    (state) => state.generateUniqueConversationId,
  );
  const generateUniqueMessageId = useConversationsStore(
    (state) => state.generateUniqueMessageId,
  );

  const currentConversation =
    conversations.find((conversation) => conversation.id === conversationId) ??
    null;

  const handleCreateConversation = (title: string) => {
    const conversationId = generateUniqueConversationId();
    addConversation({
      id: conversationId,
      title,
      messages: [],
    });

    navigate({ to: `/chat/${conversationId}` });
  };

  const handleAddMessage = (conversationId: string, message: string) => {
    addMessage(conversationId, {
      id: generateUniqueMessageId(conversationId),
      content: message,
      role: "user",
    });
  };

  return (
    <div>
      <div>
        Conversations List
        <ul>
          <li>
            <button
              onClick={() => handleCreateConversation("New Conversation")}
            >
              New Conversation
            </button>
          </li>
          {conversations.map((conversation) => (
            <li key={`conversation-${conversation.id}`}>
              {conversation.title} - {conversation.id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        Current Conversation
        <Conversation conversation={currentConversation} />
      </div>

      <div>
        <input type="text" />
        <button>Send</button>
      </div>
    </div>
  );
};

export default Chat;
