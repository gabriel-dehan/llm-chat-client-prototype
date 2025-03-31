import dayjs from "dayjs";

export type MiniMessageProps = {
  content: string;
  conversationId: string;
  createdAt: string;
  id: string;
  role: string;
  updatedAt: string;
};

const MiniMessage = (props: MiniMessageProps) => {
  console.log(props);
  const { content, conversationId, updatedAt } = props;

  return (
    <div className="m-mini-message">
      <div className="m-mini-message__content">{content}</div>
      <div className="m-mini-message__info">
        <div className="m-mini-message__updated-at">
          {dayjs(updatedAt).format("DD/MM/YYYY HH:mm:ss")}
        </div>
        <div className="m-mini-message__conversation-id">{conversationId}</div>
      </div>
    </div>
  );
};

export default MiniMessage;
