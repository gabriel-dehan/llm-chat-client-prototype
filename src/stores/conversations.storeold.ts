import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ConversationStore = {
  conversations: Conversation[];
  addConversation: (conversation: Conversation) => void;
  addMessage: (conversationId: string, message: Message) => void;
  generateUniqueMessageId: (conversationId: string) => string;
  generateUniqueConversationId: () => string;
};

type Conversation = {
  id: string;
  title: string;
  messages: Message[];
};

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

const useConversationsStore = create<ConversationStore>()(
  persist(
    (set, get) => ({
      conversations: [] as Conversation[],
      addConversation: (conversation: Conversation) =>
        set({ conversations: [...get().conversations, conversation] }),
      generateUniqueMessageId: (conversationId: string) => {
        // Get all messages ids for the conversation
        const conversation = get().conversations.find(
          (c) => c.id === conversationId,
        );
        if (!conversation) {
          throw new Error("Conversation not found");
        }

        // Get all messages ids for the conversation, then while the uuid is in the array, generate a new one
        let uuid = uuidv4();
        while (conversation.messages.some((m) => m.id === uuid)) {
          uuid = uuidv4();
        }
        return uuid;
      },
      generateUniqueConversationId: () => {
        let uuid = uuidv4();
        const conversations = get().conversations;
        while (conversations.some((c) => c.id === uuid)) {
          uuid = uuidv4();
        }
        return uuid;
      },
      addMessage: (conversationId: string, message: Message) => {
        set((state) => {
          const conversation = state.conversations.find(
            (c) => c.id === conversationId,
          );

          if (!conversation) {
            throw new Error("Conversation not found");
          }

          return {
            conversations: state.conversations.map((c) =>
              c.id === conversationId
                ? { ...c, messages: [...c.messages, message] }
                : c,
            ),
          };
        },
      ),
    }),
    {
      name: "conversations-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useConversationsStore;
