import {
  useCreateConversationMutation,
  useGetConversationsQuery,
} from "@src/remote/queries/conversations.queries";
import { Conversation } from "@src/types/conversations.type";
import { useNavigate } from "@tanstack/react-router";
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
  conversation: Conversation | null;
}

const Chat = ({ conversation: currentConversation }: ChatProps) => {
  const navigate = useNavigate();
  const { mutate: createConversation } = useCreateConversationMutation();
  const { data: conversations } = useGetConversationsQuery();

  console.log(currentConversation);

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
    <div>
      <div>
        Conversations List
        <ul>
          <li>
            <button
              onClick={() => handleCreateConversation(`New conversation`)}
            >
              New Conversation
            </button>
          </li>
          {conversations?.map((conversation) => (
            <li key={`conversation-${conversation.id}`}>
              {conversation.title} - {conversation.id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        Current Conversation {currentConversation?.title}
        {/* <Conversation conversation={currentConversation} /> */}
      </div>

      <div>
        <input type="text" />
        <button>Send</button>
      </div>
    </div>
  );
};

export default Chat;
