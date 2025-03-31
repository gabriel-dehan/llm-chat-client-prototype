import { jsonrepair } from "jsonrepair";
import ReactMarkdown from "react-markdown";

import { Message as MessageType } from "@src/types/conversations.types";

import MiniMessage, { MiniMessageProps } from "./MiniMessage";

import "./Message.css";

type MessageProps = {
  message: MessageType;
};

const messageParser = (content: string) => {
  let parsingError = false;
  const matches = content.matchAll(/```json(.*)```/gs);
  const captures = [...matches].map((match) => match[1]);

  let extractedProps: any[] = [];
  try {
    extractedProps = captures.flatMap((capture) => {
      // JSON streamed from LLM is not always valid JSON, so we need to try repairing it first
      const sanitizedCapture = jsonrepair(capture);

      const parsed = JSON.parse(sanitizedCapture) as {
        result: MiniMessageProps[];
      };
      return parsed.result || [];
    });
  } catch (e) {
    console.error(e);
    parsingError = true;
  }

  const cleanedContent = content.replace(/```json.*```/gs, "");
  return {
    cleanedContent,
    extractedProps,
    parsingError,
  };
};

const Message = ({ message }: MessageProps) => {
  const { id, content, role } = message;

  let cleanedContent = content;
  let extractedProps: MiniMessageProps[] = [];

  if (role === "model") {
    const parsedMessage = messageParser(content);
    cleanedContent = parsedMessage.cleanedContent;
    extractedProps = parsedMessage.extractedProps as MiniMessageProps[];
  }

  return (
    <li key={`message-${id}`} className={`m-message m-message--${role}`}>
      {role === "model" ? (
        <>
          <ReactMarkdown>{cleanedContent}</ReactMarkdown>
          {extractedProps.length > 0 && (
            <div className="m-message__props">
              {extractedProps.map((props, index) => (
                <MiniMessage key={`minimessage-${index}`} {...props} />
              ))}
            </div>
          )}
        </>
      ) : (
        content
      )}
    </li>
  );
};

export default Message;
