import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ConversationStore = {
  selectedConversationId: string | null;
  setSelectedConversationId: (id: string | null) => void;
};

const useConversationsStore = create<ConversationStore>()(
  persist(
    (set) => ({
      selectedConversationId: null,
      setSelectedConversationId: (id) => set({ selectedConversationId: id }),
    }),
    {
      name: "conversations-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useConversationsStore;

// import { v4 as uuidv4 } from "uuid";

// generateUniqueMessageId: (conversationId: string) => {
//   // Get all messages ids for the conversation
//   const conversation = get().conversations.find(
//     (c) => c.id === conversationId
//   );
//   if (!conversation) {
//     throw new Error("Conversation not found");
//   }

//   // Get all messages ids for the conversation, then while the uuid is in the array, generate a new one
//   let uuid = uuidv4();
//   while (conversation.messages.some((m) => m.id === uuid)) {
//     uuid = uuidv4();
//   }
//   return uuid;
// },
// generateUniqueConversationId: () => {
//   let uuid = uuidv4();
//   const conversations = get().conversations;
//   while (conversations.some((c) => c.id === uuid)) {
//     uuid = uuidv4();
//   }
//   return uuid;
// },
// }),
