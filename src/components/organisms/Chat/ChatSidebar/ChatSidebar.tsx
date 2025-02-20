import { FilePlus } from "@phosphor-icons/react";
import { Link, useNavigate } from "@tanstack/react-router";

import ScrollArea from "@src/components/molecules/ScrollArea/ScrollArea";
import { useCreateConversationMutation } from "@src/remote/queries/conversations.queries";

import type { Conversation } from "@src/types/conversations.type";

import "./ChatSidebar.css";

type ChatSidebarProps = {
  conversations: Conversation[];
  activeConversationId?: string;
};

const ChatSidebar = ({
  conversations,
  activeConversationId,
}: ChatSidebarProps) => {
  const { mutate: createConversation } = useCreateConversationMutation();
  const navigate = useNavigate();

  const handleCreateConversation = (title: string) => {
    createConversation(
      { title },
      {
        onSuccess: (data) => {
          void navigate({ to: `/chat/${data.id}` });
        },
      }
    );
  };

  return (
    <nav className="org-chat-sidebar">
      <div className="org-chat-sidebar__header">
        <button
          className="org-chat-sidebar__new-conversation-button"
          onClick={() => {
            handleCreateConversation(`New conversation`);
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
                  params={{ conversationId: conversation.id }}
                  to={`/chat/$conversationId`}
                >
                  {conversation.title} - {conversation.id}
                </Link>
              </li>
            ))}
            {conversations?.map((conversation) => (
              <li
                key={`conversation-${conversation.id}`}
                className={`org-chat-sidebar__conversation ${
                  activeConversationId === conversation.id ? "active" : ""
                }`}
              >
                <Link
                  params={{ conversationId: conversation.id }}
                  to={`/chat/$conversationId`}
                >
                  {conversation.title} - {conversation.id}
                </Link>
              </li>
            ))}
            {conversations?.map((conversation) => (
              <li
                key={`conversation-${conversation.id}`}
                className={`org-chat-sidebar__conversation ${
                  activeConversationId === conversation.id ? "active" : ""
                }`}
              >
                <Link
                  params={{ conversationId: conversation.id }}
                  to={`/chat/$conversationId`}
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
