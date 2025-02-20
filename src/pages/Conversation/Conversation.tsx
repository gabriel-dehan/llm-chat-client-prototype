import { useLoaderData } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import Chat from "@src/components/organisms/Chat/Chat";
import { Route } from "@src/routes/chat.$conversationId";

const Conversation = () => {
  const { t } = useTranslation();
  const { conversation } = useLoaderData({ from: Route.fullPath });

  return (
    <div>
      <Chat conversation={conversation} />
    </div>
  );
};

export default Conversation;
