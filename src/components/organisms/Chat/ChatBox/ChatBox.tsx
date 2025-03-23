import { z } from "zod";

import ChatInput from "@src/components/molecules/ChatInput/ChatInput";
import Message from "@src/components/molecules/Message/Message";
import { useGetMessagesQuery } from "@src/remote/queries/messages.queries";

import type { Conversation } from "@src/types/conversations.types";

import "./ChatBox.css";

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
  const { data: messages } = useGetMessagesQuery(conversation?.id || null);

  const handleSubmit = async (content: string) => {
    console.log("Sending message:", content);
  };

  return (
    <div className="org-chatbox">
      <h1 className="org-chatbox__title">{conversation?.title}</h1>
      <div className="org-chatbox__messages-container">
        <ul className="org-chatbox__messages-list">
          {messages?.map((message) => (
            <Message key={`message-${message.id}`} message={message} />
          ))}
          {messages?.map((message) => (
            <Message key={`message-${message.id}`} message={message} />
          ))}
        </ul>
      </div>
      <ChatInput onSubmit={handleSubmit} />
    </div>
  );
};

export default ChatBox;
