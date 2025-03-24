export type Message = {
  id: number;
  content: string;
  role: "user" | "assistant";
  createdAt: Date;
  updatedAt: Date;
};

export type Conversation = {
  id: number | null;
  title: string;
  messages: Message[];
};
