import { PaperPlaneRight } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import { useCreateMessageMutation } from "@src/remote/queries/messages.queries";

import "./ChatInput.css";

type ChatInputProps = {
  conversationId?: number;
  onSubmit: (content: string) => Promise<void>;
};

type FormValues = {
  content: string;
};

const ChatInput = ({ conversationId, onSubmit }: ChatInputProps) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const { mutate: createMessage } = useCreateMessageMutation();

  const onFormSubmit = handleSubmit(async (data) => {
    await onSubmit(data.content);

    // TODO: Create a new conversation if no conversationId is provided
    if (!conversationId) return;

    createMessage({
      conversationId,
      data: {
        role: "user",
        content: data.content,
      },
    });

    reset();
  });

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await onFormSubmit();
    }
  };

  return (
    <form className="m-chat-input" onSubmit={onFormSubmit}>
      <div className="m-chat-input__container">
        <TextareaAutosize
          {...register("content", { required: true })}
          cacheMeasurements
          className="m-chat-input__content"
          maxRows={6}
          minRows={1}
          placeholder="Ask anything"
          onKeyDown={handleKeyDown}
        />
        <button className="m-chat-input__send-button" type="submit">
          <PaperPlaneRight
            alt="Send"
            color="var(--send-icon-color)"
            size={32}
            weight="duotone"
          />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
