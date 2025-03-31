export type Message = {
  id: string;
  content: string;
  role: "user" | "model";
  createdAt: Date;
  updatedAt: Date;
};

export type Conversation = {
  id: string | null;
  title: string;
  messages: Message[];
};
