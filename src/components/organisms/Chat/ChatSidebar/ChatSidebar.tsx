import { Conversation } from "@src/types/conversations.type";
import { useNavigate } from "@tanstack/react-router";
import { useCreateConversationMutation } from "@src/remote/queries/conversations.queries";
type ChatSidebarProps = {
  conversations: Conversation[];
  activeConversationId: string;
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
          navigate({ to: `/chat/${data.id}` });
        },
      }
    );
  };

  return (
    <ul>
      <li>
        <button onClick={() => handleCreateConversation(`New conversation`)}>
          New Conversation
        </button>
      </li>
      {conversations?.map((conversation) => (
        <li
          key={`conversation-${conversation.id}`}
          className={activeConversationId === conversation.id ? "active" : ""}
        >
          {conversation.title} - {conversation.id}
        </li>
      ))}
    </ul>
  );
};

export default ChatSidebar;
