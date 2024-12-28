import { create } from "zustand";

export const useFetchChatStore = create((set) => ({
  chats: [], // Store the fetched chats

  setChats: (newChats) => set({ chats: newChats }),
}));
