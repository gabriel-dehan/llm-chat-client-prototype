import { ScrollArea } from "@base-ui-components/react/scroll-area";
import { useNavigate } from "@tanstack/react-router";

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
          onClick={() => {
            handleCreateConversation(`New conversation`);
          }}
        >
          New Conversation
        </button>
      </div>
      <ScrollArea.Root className="org-chat-sidebar__scrollarea">
        <ScrollArea.Viewport className="org-chat-sidebar__viewport">
          <ul className="org-chat-sidebar__content">
            <li></li>
            {conversations?.map((conversation) => (
              <li
                key={`conversation-${conversation.id}`}
                className={
                  activeConversationId === conversation.id ? "active" : ""
                }
              >
                {conversation.title} - {conversation.id}
              </li>
            ))}
            {conversations?.map((conversation) => (
              <li
                key={`conversation-${conversation.id}`}
                className={
                  activeConversationId === conversation.id ? "active" : ""
                }
              >
                {conversation.title} - {conversation.id}
              </li>
            ))}
            {conversations?.map((conversation) => (
              <li
                key={`conversation-${conversation.id}`}
                className={
                  activeConversationId === conversation.id ? "active" : ""
                }
              >
                {conversation.title} - {conversation.id}
              </li>
            ))}
          </ul>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="org-chat-sidebar__scrollbar">
          <ScrollArea.Thumb className="org-chat-sidebar__scrollbar-thumb" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </nav>
  );
};

export default ChatSidebar;
