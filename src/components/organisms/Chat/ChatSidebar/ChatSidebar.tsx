import { FilePlus } from "@phosphor-icons/react";
import { Link, useNavigate } from "@tanstack/react-router";

import ScrollArea from "@src/components/molecules/ScrollArea/ScrollArea";

import type { Conversation } from "@src/types/conversations.types";

import "./ChatSidebar.css";

type ChatSidebarProps = {
  conversations: Conversation[];
  activeConversationId?: string;
};

const ChatSidebar = ({
  conversations,
  activeConversationId,
}: ChatSidebarProps) => {
  const navigate = useNavigate();

  return (
    <nav className="org-chat-sidebar">
      <div className="org-chat-sidebar__header">
        <button
          className="org-chat-sidebar__new-conversation-button"
          onClick={() => {
            void navigate({ to: "/chat" });
          }}
        >
          <FilePlus size={16} weight="regular" />
          New Conversation
        </button>
      </div>
      <div className="org-chat-sidebar__conversations-container">
        <ScrollArea>
          <ul className="org-chat-sidebar__conversations">
            {conversations?.map((conversation) => (
              <li
                key={`conversation-${conversation.id}`}
                className={`org-chat-sidebar__conversation ${
                  activeConversationId === conversation.id ? "active" : ""
                }`}
              >
                <Link
                  to={`/chat/$conversationId`}
                  params={{
                    conversationId: conversation.id?.toString() || "new",
                  }}
                >
                  {conversation.title} - {conversation.id}
                </Link>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </nav>
  );
};

export default ChatSidebar;
