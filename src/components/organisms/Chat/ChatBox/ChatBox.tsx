import { useGetMessagesQuery } from "@src/remote/queries/messages.queries";
import { Conversation } from "@src/types/conversations.type";
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

type ChatBoxProps = {
  conversation: Conversation | null;
};

const ChatBox = ({ conversation }: ChatBoxProps) => {
  const messages = conversation?.id
    ? useGetMessagesQuery(conversation.id).data || []
    : [];

  return (
    <div>
      <h1>{conversation?.title}</h1>
      <div>
        <ul>
          {messages.map((message) => (
            <li key={`message-${message.id}`}>{message.content}</li>
          ))}
        </ul>
      </div>
      <div>
        <input type="text" />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
