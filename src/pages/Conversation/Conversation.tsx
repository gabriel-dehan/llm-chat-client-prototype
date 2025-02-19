import { useTranslation } from "react-i18next";
import { useLoaderData } from "@tanstack/react-router";
import { Route } from "@src/routes/chat.$conversationId";

import Chat from "@src/components/organisms/Chat/Chat";

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
