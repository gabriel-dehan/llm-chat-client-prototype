import { useEffect, useRef } from "react";
import { z } from "zod";

import ChatInput from "@src/components/molecules/ChatInput/ChatInput";
import Message from "@src/components/molecules/Message/Message";
import { useGetMessagesQuery } from "@src/remote/queries/messages.queries";
import { scrollToBottom } from "@src/utils/scrollToBottom";

import type { Conversation } from "@src/types/conversations.types";

import "./ChatBox.css";

const messageSchema = z.object({
  id: z.string(),
  content: z.string(),
  role: z.enum(["user", "model"]),
});

const conversationSchema = z.object({
  id: z.string(),
  messages: z.array(messageSchema),
});

type ChatBoxProps = {
  conversation: Conversation | null;
};

const ChatBox = ({ conversation }: ChatBoxProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { data: messages } = useGetMessagesQuery(conversation?.id || null);

  const handleSubmit = async (content: string) => {
    scrollToBottom(messagesContainerRef);
  };

  useEffect(() => {
    scrollToBottom(messagesContainerRef);
  }, [messages]);

  return (
    <div className="org-chatbox">
      <h1 className="org-chatbox__title">{conversation?.title}</h1>
      <div
        ref={messagesContainerRef}
        className="org-chatbox__messages-container"
      >
        <ul className="org-chatbox__messages-list">
          {messages?.map((message) => (
            <Message key={`message-${message.id}`} message={message} />
          ))}
        </ul>
      </div>
      <ChatInput
        conversationId={conversation?.id || undefined}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatBox;
