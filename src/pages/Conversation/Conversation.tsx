import Chat from "@src/components/organisms/Chat/Chat";
import { Route as ChatNewRoute } from "@src/routes/chat";
import { Route as ConversationRoute } from "@src/routes/chat.$conversationId";
import { useMaybeLoaderData } from "@src/utils/useMaybeLoaderData";

import type { Conversation as ConversationType } from "@src/types/conversations.types";

const Conversation = () => {
  const { data: conversation } = useMaybeLoaderData<ConversationType>(
    ChatNewRoute.id,
    ConversationRoute.id,
    {
      defaultData: { id: null, title: "New Conversation", messages: [] },
    }
  );

  return (
    <div>
      <Chat conversation={conversation} />
    </div>
  );
};

export default Conversation;
