export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: Date;
  updatedAt: Date;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
};
