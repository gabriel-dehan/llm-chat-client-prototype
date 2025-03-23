import { Message as MessageType } from "@src/types/conversations.types";

import "./Message.css";

type MessageProps = {
  message: MessageType;
};

const Message = ({ message }: MessageProps) => {
  const { id, content, role } = message;

  return (
    <li key={`message-${id}`} className={`m-message m-message--${role}`}>
      {content}
    </li>
  );
};

export default Message;
